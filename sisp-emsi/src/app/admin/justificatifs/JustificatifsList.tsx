"use client";

import { useState } from "react";
import { Check, X, FileText, AlertCircle, Clock, CheckCircle, Loader2 } from "lucide-react";

// Mock de données simulant les justificatifs soumis par les étudiants
const JUSTIFICATIFS_MOCK = [
  {
    id: 1,
    etudiant: "Yasmine",
    email: "yasmine@emsi.ma",
    type: "Certificat Médical",
    dateAbsence: "18/05/2026",
    motif: "Grippe sévère",
    certifsCeSemestre: 1, // Déjà 1 certificat déposé ce semestre
    statut: "EN_ATTENTE"
  },
  {
    id: 2,
    etudiant: "Amine Alami",
    email: "a.alami@emsi.ma",
    type: "Mot Justificatif",
    dateAbsence: "15/05/2026",
    motif: "Rendez-vous administratif urgent",
    certifsCeSemestre: 0,
    statut: "EN_ATTENTE"
  },
  {
    id: 3,
    etudiant: "Sara Tazi",
    email: "s.tazi@emsi.ma",
    type: "Certificat Médical",
    dateAbsence: "12/05/2026",
    motif: "Consultation dentaire",
    certifsCeSemestre: 3, // ALERTE : Quota max atteint !
    statut: "EN_ATTENTE"
  }
];

export default function JustificatifsList() {
  const [demandes, setDemandes] = useState(JUSTIFICATIFS_MOCK);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"TOUT" | "EN_ATTENTE" | "VALIDE" | "REFUSE">("EN_ATTENTE");

  const handleDecision = async (id: number, nouveauStatut: "VALIDE" | "REFUSE") => {
    setLoadingId(id);
    
    // Simulation de la mise à jour Prisma (changement du statut + mise à jour du compteur d'assiduité)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setDemandes(demandes.map(d => d.id === id ? { ...d, statut: nouveauStatut } : d));
    setLoadingId(null);
  };

  const demandesFiltrees = demandes.filter(d => filter === "TOUT" || d.statut === filter);

  return (
    <div className="space-y-6">
      {/* 🎛️ Filtres de tri rapides */}
      <div className="flex gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm w-max">
        {(["EN_ATTENTE", "VALIDE", "REFUSE", "TOUT"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              filter === status
                ? "bg-slate-900 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {status === "EN_ATTENTE" ? "En attente" : status === "VALIDE" ? "Validés" : status === "REFUSE" ? "Refusés" : "Tout voir"}
          </button>
        ))}
      </div>

      {/* 📋 Tableau des demandes */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-slate-50/50 flex items-center gap-2 font-semibold text-gray-800">
          <FileText size={18} className="text-amber-500" />
          <span>Registre des pièces justificatives reçues</span>
        </div>

        <div className="overflow-x-auto">
          {demandesFiltrees.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400 font-medium">
              Aucun document ne correspond à ce filtre.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 font-medium">Étudiant</th>
                  <th className="p-4 font-medium">Détails de la pièce</th>
                  <th className="p-4 font-medium text-center">Quota Semestre</th>
                  <th className="p-4 font-medium text-center">Statut</th>
                  <th className="p-4 font-medium text-center w-44">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {demandesFiltrees.map((demande) => {
                  const quotaAlerte = demande.type === "Certificat Médical" && demande.certifsCeSemestre >= 3;

                  return (
                    <tr key={demande.id} className="hover:bg-slate-50/40 transition-colors">
                      {/* Identité */}
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">{demande.etudiant}</div>
                        <div className="text-xs text-gray-400">{demande.email}</div>
                      </td>

                      {/* Motif et type */}
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            demande.type === "Certificat Médical" ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                          }`}>
                            {demande.type}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">Absence du {demande.dateAbsence}</span>
                        </div>
                        <div className="text-gray-600 font-medium text-xs">« {demande.motif} »</div>
                      </td>

                      {/* Quota Contrôle */}
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`font-bold text-xs px-2.5 py-1 rounded-full ${
                            quotaAlerte ? "bg-red-100 text-red-700 font-extrabold" : "bg-slate-100 text-slate-700"
                          }`}>
                            {demande.certifsCeSemestre} / 3 certifs
                          </span>
                          {quotaAlerte && demande.statut === "EN_ATTENTE" && (
                            <span className="text-[10px] text-red-500 font-bold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> Limite atteinte !
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Statut Badge */}
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                          demande.statut === "EN_ATTENTE" ? "bg-amber-50 text-amber-700 border-amber-100" :
                          demande.statut === "VALIDE" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                          "bg-red-50 text-red-700 border-red-100"
                        }`}>
                          {demande.statut === "EN_ATTENTE" && <Clock size={12} />}
                          {demande.statut === "VALIDE" && <CheckCircle size={12} />}
                          {demande.statut === "REFUSE" && <X size={12} />}
                          {demande.statut === "EN_ATTENTE" ? "En attente" : demande.statut === "VALIDE" ? "Accepté" : "Refusé"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        {demande.statut === "EN_ATTENTE" ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              disabled={loadingId !== null}
                              onClick={() => handleDecision(demande.id, "VALIDE")}
                              className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white border border-emerald-100 transition-all shadow-sm"
                              title="Valider le document"
                            >
                              {loadingId === demande.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                            </button>
                            <button
                              disabled={loadingId !== null}
                              onClick={() => handleDecision(demande.id, "REFUSE")}
                              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white border border-red-100 transition-all shadow-sm"
                              title="Rejeter le document"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Traité</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}