"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle, AlertCircle, FileEdit } from "lucide-react";

const CLASSES_MOCK = ["Classe 1A", "Classe 1B", "Classe 2A"];
const MODULES_MOCK = ["NoSQL", "ASP.NET MVC", "Oracle DBA"];

const ETUDIANTS_MOCK = [
  { id: 1, nom: "Yasmine", email: "yasmine@emsi.ma", noteCC: 16, noteExam: 15 },
  { id: 2, nom: "Amine Alami", email: "a.alami@emsi.ma", noteCC: 12, noteExam: 10 },
  { id: 3, nom: "Sara Tazi", email: "s.tazi@emsi.ma", noteCC: 14, noteExam: 8 },
  { id: 4, nom: "Omar Drissi", email: "o.drissi@emsi.ma", noteCC: 9, noteExam: 11 },
];

export default function NotesForm() {
  const [classe, setClasse] = useState(CLASSES_MOCK[0]);
  const [module, setModule] = useState(MODULES_MOCK[0]);
  const [notes, setNotes] = useState(ETUDIANTS_MOCK);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fonction pour mettre à jour la note localement dans le tableau d'état
  const handleNoteChange = (id: number, field: "noteCC" | "noteExam", value: string) => {
    setSuccess(false);
    
    // Convertir la chaîne en nombre (ou laisser vide si l'utilisateur efface)
    let numValue = parseFloat(value);
    if (isNaN(numValue)) numValue = 0;
    
    // Bloquer les notes en dehors de l'intervalle [0, 20]
    if (numValue < 0) numValue = 0;
    if (numValue > 20) numValue = 20;

    setNotes(
      notes.map((student) =>
        student.id === id ? { ...student, [field]: numValue } : student
      )
    );
  };

  const handleSaveNotes = async () => {
    setIsSaving(true);
    setSuccess(false);

    // Simulation de la transaction d'écriture Prisma dans ta base PostgreSQL
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSaving(false);
    setSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* 🛠️ Filtres de sélection de cours */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Classe / Groupe</label>
          <select
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          >
            {CLASSES_MOCK.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Module Académique</label>
          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          >
            {MODULES_MOCK.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message de confirmation de sauvegarde */}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 animate-fade-in">
          <CheckCircle size={18} className="text-emerald-600" />
          Les notes du module <strong className="font-semibold">{module}</strong> ont été enregistrées et publiées pour les étudiants.
        </div>
      )}

      {/* 📊 Tableau de saisie des notes */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-slate-50/50 flex items-center gap-2 font-semibold text-gray-800">
          <FileEdit size={18} className="text-emerald-500" />
          <span>Grille d évaluation — {module} ({classe})</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 font-medium">Étudiant</th>
                <th className="p-4 font-medium text-center w-40">Contrôle Continu (CC)</th>
                <th className="p-4 font-medium text-center w-40">Examen Final</th>
                <th className="p-4 font-medium text-center w-40">Moyenne Module</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {notes.map((student) => {
                // Calcul de la moyenne sur le vif (Moyenne standard : 40% CC + 60% Exam)
                const moyenne = (student.noteCC * 0.4) + (student.noteExam * 0.6);

                return (
                  <tr key={student.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{student.nom}</div>
                      <div className="text-xs text-gray-400">{student.email}</div>
                    </td>
                    
                    {/* Input Note CC */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.25"
                          value={student.noteCC}
                          onChange={(e) => handleNoteChange(student.id, "noteCC", e.target.value)}
                          className="w-20 p-2 text-center bg-slate-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                        />
                        <span className="text-xs text-gray-400 font-medium">/20</span>
                      </div>
                    </td>

                    {/* Input Note Examen */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.25"
                          value={student.noteExam}
                          onChange={(e) => handleNoteChange(student.id, "noteExam", e.target.value)}
                          className="w-20 p-2 text-center bg-slate-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                        />
                        <span className="text-xs text-gray-400 font-medium">/20</span>
                      </div>
                    </td>

                    {/* Badge de la Moyenne Calculée */}
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1.5 rounded-lg font-bold text-xs border ${
                        moyenne >= 10
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-red-50 text-red-700 border-red-100"
                      }`}>
                        {moyenne.toFixed(2)} / 20
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bouton de soumission */}
        <div className="p-4 bg-slate-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSaveNotes}
            disabled={isSaving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-5 rounded-xl text-sm transition-all flex items-center gap-2 disabled:bg-gray-300 shadow-sm shadow-emerald-600/10"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Publication des notes...
              </>
            ) : (
              <>
                <Save size={16} />
                Enregistrer et publier les notes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}