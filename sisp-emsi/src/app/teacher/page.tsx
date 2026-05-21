import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { BookOpen, UserCheck, GraduationCap, ArrowRight, PlusCircle, CheckSquare } from "lucide-react";
import Link from "next/link";

export default async function TeacherDashboardPage() {
  const session = await auth();

  // Sécurité d'accès
  if (!session?.user) {
    redirect("/login");
  }

  // Simulation des modules gérés par ce prof
  const mesModules = [
    { id: 1, nom: "ASP.NET MVC", classe: "2IIR", etudiants: 28, statutAppel: "Fait" },
    { id: 2, nom: "NoSQL & Big Data", classe: "2IIR", etudiants: 28, statutAppel: "À faire à 14:00" },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* En-tête de bienvenue */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {session.user.name || "Professeur"}
        </h1>
        <p className="text-sm text-gray-500">
          Gestion de vos modules, suivi des absences de vos classes et saisie des notes intermédiaires.
        </p>
      </div>

      {/* Cartes Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <BookOpen size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-semibold uppercase">Mes Modules</span>
            <span className="text-2xl font-bold text-gray-800">2 Matières</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <GraduationCap size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-semibold uppercase">Classes assignées</span>
            <span className="text-2xl font-bold text-gray-800">2IIR</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <UserCheck size={24} />
          </div>
          <div>
            <span className="block text-xs text-gray-400 font-semibold uppercase">Taux de Présence</span>
            <span className="text-2xl font-bold text-amber-600">92.4 %</span>
          </div>
        </div>
      </div>

      {/* Section Vos Modules et Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Liste des modules à gauche */}
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-lg">Vos Enseignements & Classes</h2>
          
          <div className="divide-y divide-gray-100">
            {mesModules.map((mod) => (
              <div key={mod.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{mod.nom}</h4>
                  <p className="text-xs text-gray-400">Classe : <span className="font-medium text-gray-600">{mod.classe}</span> • {mod.etudiants} étudiants</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  mod.statutAppel === "Fait" 
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                    : "bg-slate-100 text-gray-600"
                }`}>
                  {mod.statutAppel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Liens d'accès rapide à droite */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <CheckSquare className="text-emerald-500" size={18} />
              Feuille d émargement
            </div>
            <p className="text-xs text-gray-500">Prenez la présence des étudiants pour le cours actuel.</p>
            <Link href="/teacher/absences" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              Faire l appel <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
              <PlusCircle className="text-blue-500" size={18} />
              Gestion des Notes
            </div>
            <p className="text-xs text-gray-500">Saisissez ou modifiez les notes de Contrôle Continu (CC) et d examens.</p>
            <Link href="/teacher/notes" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Saisir les notes <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}