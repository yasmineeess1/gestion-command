
import { prisma } from "@/src/lib/prisma";
import { Search, AlertTriangle, ShieldAlert, Eye, UserPlus, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function SupervisorStudentsPage() {
  // Récupération de tous les étudiants, leurs absences et leurs sanctions depuis PostgreSQL
  const etudiants = await prisma.user.findMany({
    where: { role: "STUDENT" },
    include: {
      absences: true,
      sanctions: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert className="text-amber-500" size={26} />
            Gestion & Suivi des Étudiants
          </h1>
          <p className="text-sm text-gray-500">
            Contrôlez l assiduité en temps réel, analysez les quotas d absences et gérez le registre disciplinaire.
          </p>
        </div>
        
        {/* Raccourci vers la création (si ton admin/surveillant gère les ajouts) */}
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors self-start sm:self-center">
          <UserPlus size={16} />
          Inscrire un Étudiant
        </button>
      </div>

      {/* Cartes de synthèse d'assiduité */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-rose-500 text-white rounded-xl shadow-sm">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="text-xs text-rose-500 font-bold uppercase block tracking-wider">Cas Critiques</span>
            <span className="text-xl font-extrabold text-rose-900">
              {etudiants.filter(e => e.absences.filter(a => !a.isJustified).length >= 3).length} Étudiant(s) en alerte
            </span>
          </div>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-sm">
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="text-xs text-emerald-500 font-bold uppercase block tracking-wider">Effectif Global</span>
            <span className="text-xl font-extrabold text-emerald-900">{etudiants.length} Élèves enregistrés</span>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 max-w-md shadow-sm focus-within:border-indigo-500 transition-colors">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Rechercher un étudiant, une classe (ex: 2IIR)..." 
          className="bg-transparent text-sm text-gray-700 outline-none w-full"
        />
      </div>

      {/* Tableau d'administration des profils */}
      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50/70 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Nom / Email</th>
                <th className="py-3.5 px-6">Classe</th>
                <th className="py-3.5 px-6 text-center">Absences Totales</th>
                <th className="py-3.5 px-6 text-center">Non Justifiées</th>
                <th className="py-3.5 px-6 text-center">Sanctions</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {etudiants.map((student) => {
                const totalAbsences = student.absences.length;
                const nonJustifiees = student.absences.filter(a => !a.isJustified).length;
                const totalSanctions = student.sanctions.length;
                
                // Règle EMSI imagée : Alerte déclenchée si >= 2 absences non justifiées
                const estCritique = nonJustifiees >= 2;

                return (
                  <tr key={student.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Colonne Identité */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm border border-indigo-200/40">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-bold text-gray-900">{student.name}</span>
                        <span className="block text-xs text-gray-400 font-medium">{student.email}</span>
                      </div>
                    </td>

                    {/* Colonne Classe */}
                    <td className="py-4 px-6 font-semibold text-gray-600">
                      {student.classe || "Non assignée"}
                    </td>

                    {/* Compteur Global */}
                    <td className="py-4 px-6 text-center font-bold text-gray-800">
                      {totalAbsences}
                    </td>

                    {/* Alerte non justifiées */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                        estCritique 
                          ? "bg-rose-50 text-rose-700 border border-rose-100" 
                          : totalAbsences > 0 
                          ? "bg-amber-50 text-amber-700 border border-amber-100" 
                          : "bg-slate-100 text-gray-400"
                      }`}>
                        {nonJustifiees} non justifiée{nonJustifiees > 1 ? 's' : ''}
                      </span>
                    </td>

                    {/* Compteur Sanctions */}
                    <td className="py-4 px-6 text-center">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        totalSanctions > 0 ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-400"
                      }`}>
                        {totalSanctions} active{totalSanctions > 1 ? 's' : ''}
                      </span>
                    </td>

                    {/* Actions de consultation */}
                    <td className="py-4 px-6 text-right">
                      <Link 
                        href={`/supervisor/students/${student.id}`}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200/80 text-gray-700 font-bold px-3 py-2 rounded-xl transition-colors"
                      >
                        <Eye size={14} /> Fiche Suivi
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}