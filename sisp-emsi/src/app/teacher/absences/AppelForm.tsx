"use client";

import { useState } from "react";
import { Check, X, UserX, Users, Save, Loader2, CheckCircle } from "lucide-react";

// Mock-data d'exemple en attendant la liaison complète avec tes vraies tables Prisma
const CLASSES_MOCK = ["Classe 1A", "Classe 1B", "Classe 2A"];
const MODULES_MOCK = ["NoSQL", "ASP.NET MVC", "Oracle DBA"];

const ETUDIANTS_MOCK = [
  { id: 1, nom: "Yasmine", email: "yasmine@emsi.ma", photo: "" },
  { id: 2, nom: "Amine Alami", email: "a.alami@emsi.ma", photo: "" },
  { id: 3, nom: "Sara Tazi", email: "s.tazi@emsi.ma", photo: "" },
  { id: 4, nom: "Omar Drissi", email: "o.drissi@emsi.ma", photo: "" },
];

export default function AppelForm() {
  const [classe, setClasse] = useState(CLASSES_MOCK[0]);
  const [module, setModule] = useState(MODULES_MOCK[0]);
  const [absents, setAbsents] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Toggle pour basculer un étudiant entre Présent et Absent
  const togglePresence = (id: number) => {
    setSuccess(false);
    if (absents.includes(id)) {
      setAbsents(absents.filter((absentId) => absentId !== id));
    } else {
      setAbsents([...absents, id]);
    }
  };

  const handleEnregistrer = async () => {
    setIsSaving(true);
    setSuccess(false);

    // Simulation de l'insertion dans la table Absence de Prisma
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSaving(false);
    setSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* 🛠️ Sélecteurs de Classe et Module */}
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
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Module</label>
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

      {/* Message de succès */}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle size={18} className="text-emerald-600" />
          Fiche d appel enregistrée avec succès ! ({absents.length} absence(s) signalée(s))
        </div>
      )}

      {/* 📸 Trombinoscope / Liste de la classe */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <Users size={18} className="text-emerald-500" />
            <span>Liste des étudiants — {classe}</span>
          </div>
          <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
            {absents.length} absent(s)
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ETUDIANTS_MOCK.map((student) => {
            const isAbsent = absents.includes(student.id);

            return (
              <div
                key={student.id}
                onClick={() => togglePresence(student.id)}
                className={`cursor-pointer border p-4 rounded-xl flex flex-col items-center text-center gap-3 transition-all select-none relative overflow-hidden group ${
                  isAbsent
                    ? "border-red-200 bg-red-50/40 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                {/* Badge d'état */}
                <span className={`absolute top-2 right-2 p-1 rounded-full text-white ${isAbsent ? "bg-red-500" : "bg-emerald-500"}`}>
                  {isAbsent ? <X size={12} /> : <Check size={12} />}
                </span>

                {/* Photo de l'étudiant */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all ${
                  isAbsent ? "bg-red-100 text-red-600 border-red-300" : "bg-slate-100 text-slate-700 border-slate-200 group-hover:border-emerald-400"
                }`}>
                  {student.photo ? (
                    <img src={student.photo} alt={student.nom} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    student.nom.charAt(0)
                  )}
                </div>

                <div>
                  <h3 className={`font-semibold text-sm ${isAbsent ? "text-red-700" : "text-gray-900"}`}>{student.nom}</h3>
                  <p className="text-xs text-gray-400">{student.email}</p>
                </div>

                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border mt-1 ${
                  isAbsent ? "bg-red-100 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                }`}>
                  {isAbsent ? "Absent" : "Présent"}
                </span>
              </div>
            );
          })}
        </div>

        {/* 💾 Bouton d'enregistrement général */}
        <div className="p-4 bg-slate-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleEnregistrer}
            disabled={isSaving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-5 rounded-xl text-sm transition-all flex items-center gap-2 disabled:bg-gray-300 shadow-sm shadow-emerald-600/10"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={16} />
                Valider et enregistrer l appel
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}