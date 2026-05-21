import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { AlertTriangle, CheckCircle, Clock, Calendar } from "lucide-react";

export default async function StudentAbsencesPage() {
  const session = await auth();

  // 1. Sécurité : Vérifier si l'étudiant est connecté
  if (!session?.user?.id) {
    redirect("/login");
  }

  const studentId = parseInt(session.user.id, 10);

  // 2. Récupérer toutes les absences de l'étudiant connecté
  const absences = await prisma.absence.findMany({
    where: { studentId },
    orderBy: { date: "desc" },
    include: {
      justificatif: true, // Pour savoir si un justificatif y est lié
    },
  });

  // 3. Calculs rapides des statistiques d'absences
  const totalAbsences = absences.length;
  const absencesNonJustifiees = absences.filter(abs => !abs.isJustified).length;
  const absencesJustifiees = absences.filter(abs => abs.isJustified).length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Suivi des Absences</h1>
        <p className="text-sm text-gray-500">Consultez l état de vos présences et le statut de vos justificatifs.</p>
      </div>

      {/* Compteurs statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <AlertTriangle size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-medium uppercase">Non Justifiées</span>
            <span className="text-2xl font-bold text-red-600">{absencesNonJustifiees}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <CheckCircle size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-medium uppercase">Justifiées</span>
            <span className="text-2xl font-bold text-green-600">{absencesJustifiees}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-gray-50 text-gray-600 rounded-lg">
            <Calendar size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-medium uppercase">Total Absences</span>
            <span className="text-2xl font-bold text-gray-800">{totalAbsences}</span>
          </div>
        </div>
      </div>

      {/* Liste des absences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-semibold text-gray-800">Historique des absences signalées</h2>
        </div>

        {absences.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
            <CheckCircle size={36} className="text-green-500" />
            Aucune absence enregistrée. Félicitations pour votre assiduité !
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {absences.map((abs) => (
              <div key={abs.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-gray-900">{abs.module}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      Semestre {abs.semestre}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Date du cours : {new Date(abs.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <div>
                  {abs.isJustified ? (
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-200">
                      <CheckCircle size={12} /> Absone Justifiée
                    </span>
                  ) : abs.justificatifId ? (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-200">
                      <Clock size={12} /> Justificatif en cours d étude
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium border border-red-200">
                      <AlertTriangle size={12} /> Non justifiée
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}