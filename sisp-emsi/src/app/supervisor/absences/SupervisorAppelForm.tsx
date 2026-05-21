"use client";

import { useState } from "react";
import { Check, X, Users, Save, Loader2, CheckCircle, Clock, MapPin } from "lucide-react";

const CLASSES_MOCK = ["Classe 1A", "Classe 1B", "Classe 2A", "Classe 3C"];
const CRENEAUX_MOCK = [
  "08:30 - 10:15",
  "10:30 - 12:15",
  "14:00 - 15:45",
  "16:00 - 17:45"
];

const ETUDIANTS_MOCK = [
  { id: 1, nom: "Yasmine", email: "yasmine@emsi.ma", photo: "" },
  { id: 2, nom: "Amine Alami", email: "a.alami@emsi.ma", photo: "" },
  { id: 3, nom: "Sara Tazi", email: "s.tazi@emsi.ma", photo: "" },
  { id: 4, nom: "Omar Drissi", email: "o.drissi@emsi.ma", photo: "" },
];

export default function SupervisorAppelForm() {
  const [classe, setClasse] = useState(CLASSES_MOCK[0]);
  const [creneau, setCreneau] = useState(CRENEAUX_MOCK[0]);
  const [absents, setAbsents] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

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

    // Simulation de l'enregistrement de l'absence par le surveillant
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSaving(false);
    setSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* 🛠️ Filtres de Tournée (Classe + Heure) */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin size={12} /> Groupe à Inspecter
          </label>
          <select
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {CLASSES_MOCK.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Clock size={12} /> Créneau Horaire
          </label>
          <select
            value={creneau}
            onChange={(e) => setCreneau(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {CRENEAUX_MOCK.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message Succès */}
      {success && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle size={18} className="text-indigo-600" />
          Rapport de présence validé par le service de surveillance pour la {classe} ({creneau}).
        </div>
      )}

      {/* 📸 Trombinoscope Classe */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <Users size={18} className="text-indigo-500" />
            <span>Fiche de pointage terrain — {classe}</span>
          </div>
          <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
            {absents.length} Absent(s) détecté(s)
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
                <span className={`absolute top-2 right-2 p-1 rounded-full text-white ${isAbsent ? "bg-red-500" : "bg-indigo-500"}`}>
                  {isAbsent ? <X size={12} /> : <Check size={12} />}
                </span>

                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all ${
                  isAbsent ? "bg-red-100 text-red-600 border-red-300" : "bg-slate-100 text-slate-700 border-slate-200 group-hover:border-indigo-400"
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
                  isAbsent ? "bg-red-100 text-red-700 border-red-200" : "bg-indigo-50 text-indigo-700 border-indigo-100"
                }`}>
                  {isAbsent ? "Absent" : "Présent"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Validation Button */}
        <div className="p-4 bg-slate-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleEnregistrer}
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-xl text-sm transition-all flex items-center gap-2 disabled:bg-gray-300 shadow-sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Soumission du rapport...
              </>
            ) : (
              <>
                <Save size={16} />
                Clôturer le pointage de la classe
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}