import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import SubmitForm from "./SubmitForm";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

// Helper pour formater les badges de statut
const getStatusBadge = (status: string) => {
  switch (status) {
    case "EN_ATTENTE":
      return <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-200"><Clock size={12}/> En attente</span>;
    case "VALID":
      return <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-200"><CheckCircle size={12}/> Validé</span>;
    case "REJETE":
      return <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium border border-red-200"><XCircle size={12}/> Rejeté</span>;
    default:
      return null;
  }
};

export default async function JustificatifsPage() {
  const session = await auth();
  const studentId = session?.user?.id ? parseInt(session.user.id, 10) : 0;

  // Récupération de l'historique des justificatifs de l'étudiant connecté
  const justificatifs = await prisma.justificatif.findMany({
    where: { studentId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Justificatifs</h1>
        <p className="text-sm text-gray-500">Déposez vos documents médicaux ou billets d absence et suivez leur validation administrative.</p>
      </div>

      {/* Formulaire de dépôt */}
      <SubmitForm />

      {/* Historique des demandes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-semibold text-gray-800">Historique de vos dépôts</h2>
        </div>

        {justificatifs.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
            <FileText size={36} className="text-gray-300" />
            Aucun justificatif déposé pour le moment.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {justificatifs.map((doc) => (
              <div key={doc.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-gray-900">
                      {doc.type === "CERTIFICAT_MEDICAL" ? "📋 Certificat Médical" : "📝 Motif Simple"}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      Semestre {doc.semestre}
                    </span>
                  </div>
                  {doc.commentaire && (
                    <p className="text-xs text-gray-500 italic">« {doc.commentaire} »</p>
                  )}
                  <p className="text-[11px] text-gray-400">
                    Déposé le {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  {getStatusBadge(doc.status)}
                  <a 
                    href={doc.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
                  >
                    Voir le fichier
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}