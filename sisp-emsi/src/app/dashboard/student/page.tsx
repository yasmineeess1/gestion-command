import { prisma } from "@/src/lib/prisma";

export default async function StudentDashboard() {
  // Récupération des statistiques réelles depuis ta base Prisma 6
  const stats = await prisma.user.findUnique({
    where: { id: 1 }, // On utilise l'ID de test 1
    include: {
      absences: true,
      justificatifs: true,
    },
  });

  const totalAbsences = stats?.absences.length || 0;
  const nonJustified = stats?.absences.filter(a => !a.isJustified).length || 0;
  const pendingDocs = stats?.justificatifs.filter(j => j.status === "EN_ATTENTE").length || 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord Étudiant</h1>
      
      {/* Grille de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
          <p className="text-sm text-gray-500 uppercase font-bold">Total Absences (S2)</p>
          <p className="text-3xl font-black text-blue-900">{totalAbsences}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Non Justifiées</p>
          <p className="text-3xl font-black text-red-600">{nonJustified}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Docs en attente</p>
          <p className="text-3xl font-black text-yellow-600">{pendingDocs}</p>
        </div>
      </div>

      {/* Message de bienvenue ou alertes */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800">
        Bienvenue, <strong>{stats?.name}</strong>. Pensez à régulariser vos absences avant la fin du semestre.
      </div>
    </div>
  );
}