"use client"; // Obligatoire pour utiliser l'état interactif useState

import { useState } from "react";
import { ClipboardCheck, Users, Clock, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import AddStudentModal from "@/src/components/AddStudentModal";

// 1. Simulation de tes données existantes
const tourneesDuJour = [
  { id: 1, classe: "2IIR", creneau: "08:30 - 10:15", status: "Terminé", effectif: 28 },
  { id: 2, classe: "3GIE", creneau: "10:30 - 12:15", status: "En cours", effectif: 24 },
  { id: 3, classe: "1 AP", creneau: "14:00 - 15:45", status: "À faire", effectif: 32 },
];

const etudiantsSimules = [
  { id: 1, name: "hafsa", email: "hafsa@emi.ma", classe: "Non assignée", absences: 0, status: "0 non justifiée" },
  { id: 2, name: "Yasmine", email: "yasmin@emsi.ma", classe: "2IIR", absences: 2, status: "2 non justifiées" },
];

export default function SupervisorDashboardClient() {
  // 2. État pour stocker la classe sélectionnée (ex: null, "2IIR", "3GIE")
  const [selectedClasse, setSelectedClasse] = useState<string | null>(null);

  // Filtrer les étudiants si une classe spécifique est sélectionnée
  const etudiantsFiltres = selectedClasse 
    ? etudiantsSimules.filter(e => e.classe === selectedClasse)
    : etudiantsSimules;

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4">
      
      {/* SECTION EN-TÊTE DYNAMIQUE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedClasse ? `Fiche d'Appel — Classe ${selectedClasse}` : "Gestion des Tournées"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {selectedClasse 
              ? "Cochez les absences ou consultez les fiches de suivi individuelles." 
              : "Sélectionnez une classe pour effectuer le pointage des absences."
            }
          </p>
        </div>
        <div className="flex-shrink-0">
          <AddStudentModal />
        </div>
      </div>

      {/* AFFICHAGE CONDITIONNEL */}
      {!selectedClasse ? (
        /* ==================== VUE 1 : LES FEUILLES D'APPEL ==================== */
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <ClipboardCheck className="text-amber-500" size={20} />
            Feuilles d'appel par classe
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400 font-semibold uppercase bg-slate-50/70">
                  <th className="py-3 px-4">Classe</th>
                  <th className="py-3 px-4">Créneau Horaire</th>
                  <th className="py-3 px-4">Effectif</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {tourneesDuJour.map((tournee) => (
                  <tr key={tournee.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">{tournee.classe}</td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">{tournee.creneau}</td>
                    <td className="py-3.5 px-4 text-gray-500">{tournee.effectif} étudiants</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        tournee.status === "Terminé" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                        tournee.status === "En cours" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-slate-100 text-gray-600"
                      }`}>
                        {tournee.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {/* 🔥 CLIN D'ŒIL : Au clic, on met à jour l'état avec la classe sélectionnée */}
                      <button 
                        onClick={() => setSelectedClasse(tournee.classe)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {tournee.status === "Terminé" ? "Voir la liste" : "Faire l'appel"}
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ==================== VUE 2 : LA LISTE DES ÉTUDIANTS DE LA CLASSE ==================== */
        <div className="space-y-4">
          {/* Bouton pour fermer la liste et revenir en arrière */}
          <button 
            onClick={() => setSelectedClasse(null)}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-semibold transition-colors mb-2"
          >
            <ArrowLeft size={16} /> Retour aux feuilles d'appel
          </button>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 font-semibold uppercase bg-slate-50/70">
                    <th className="py-3 px-4">Nom / Email</th>
                    <th className="py-3 px-4">Classe</th>
                    <th className="py-3 px-4">Absences Totales</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {etudiantsFiltres.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400 font-medium">
                        Aucun étudiant enregistré dans la classe {selectedClasse}.
                      </td>
                    </tr>
                  ) : (
                    etudiantsFiltres.map((etudiant) => (
                      <tr key={etudiant.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="block font-bold text-gray-900">{etudiant.name}</span>
                          <span className="text-xs text-gray-400">{etudiant.email}</span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 font-medium">{etudiant.classe}</td>
                        <td className="py-3.5 px-4 font-bold text-center">{etudiant.absences}</td>
                        <td className="py-3.5 px-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${etudiant.absences > 0 ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-gray-600'}`}>
                            {etudiant.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {/* Lien dynamique existant vers la fiche individuelle */}
                          <a 
                            href={`/supervisor/students/${etudiant.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            👁️ Fiche Suivi
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}