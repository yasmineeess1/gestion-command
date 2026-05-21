import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { GraduationCap, Award, BookOpen, AlertCircle } from "lucide-react";

export default async function StudentNotesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // 1. Récupérer toutes les notes de l'étudiant connecté via Prisma
  const notes = await prisma.note.findMany({
    where: { studentId: parseInt(session.user.id, 10) },
    orderBy: { createdAt: "desc" },
  });

  // 2. Calculs statistiques pour le tableau de bord des notes
  const totalNotes = notes.length;
  
  // Calcul de la moyenne générale (si des notes existent)
  const moyenneGenerale = totalNotes > 0
    ? notes.reduce((acc, note) => acc + note.valeur, 0) / totalNotes
    : 0;

  // Compter les modules au-dessus de la moyenne de validation académique (ex: 10/20)
  const modulesValides = notes.filter(note => note.valeur >= 10).length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mes Notes & Évaluations</h1>
        <p className="text-sm text-gray-500">Consultez vos résultats académiques par module pour le semestre en cours.</p>
      </div>

      {/* Cartes de statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Moyenne Générale */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <GraduationCap size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider">Moyenne Générale</span>
            <span className={`text-2xl font-bold ${moyenneGenerale >= 10 ? "text-green-600" : "text-red-500"}`}>
              {totalNotes > 0 ? `${moyenneGenerale.toFixed(2)} / 20` : "-- / 20"}
            </span>
          </div>
        </div>

        {/* Modules Validés */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Award size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider">Modules Validés</span>
            <span className="text-2xl font-bold text-gray-800">
              {modulesValides} <span className="text-sm font-normal text-gray-400">/ {totalNotes}</span>
            </span>
          </div>
        </div>

        {/* Total Évaluations */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider">Évaluations Saisies</span>
            <span className="text-2xl font-bold text-gray-800">{totalNotes}</span>
          </div>
        </div>
      </div>

      {/* Tableau d'affichage des notes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-semibold text-gray-800">Détails des notes académiques</h2>
        </div>

        {notes.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
            <AlertCircle size={36} className="text-gray-300" />
            Aucune note n a encore été saisie par vos enseignants.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
                  <th className="p-4">Module</th>
                  <th className="p-4">Type d Évaluation</th>
                  <th className="p-4">Date de saisie</th>
                  <th className="p-4 text-right">Note obtenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {notes.map((note) => (
                  <tr key={note.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{note.module}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                        {note.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-xs">
                      {new Date(note.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="p-4 text-right">
                      <span className={`font-bold text-base ${note.valeur >= 10 ? "text-green-600" : "text-red-500"}`}>
                        {note.valeur.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ 20</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}