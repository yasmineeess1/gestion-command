import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { Users, FileCheck, ShieldAlert, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Sécurité d'accès admin
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Titre */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Console d Administration</h1>
        <p className="text-sm text-gray-500">Supervisez l assiduité, gérez les comptes utilisateurs et configurez les paramètres du système.</p>
      </div>

      {/* Cartes Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users size={22} />
          </div>
          <div>
            <span className="block text-[11px] text-gray-400 font-bold uppercase">Étudiants</span>
            <span className="text-xl font-bold text-gray-800">1,240</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <FileCheck size={22} />
          </div>
          <div>
            <span className="block text-[11px] text-gray-400 font-bold uppercase">À Valider</span>
            <span className="text-xl font-bold text-amber-600">8 Pièces</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <ShieldAlert size={22} />
          </div>
          <div>
            <span className="block text-[11px] text-gray-400 font-bold uppercase">Exclusions</span>
            <span className="text-xl font-bold text-red-600">2 Alertes</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Layers size={22} />
          </div>
          <div>
            <span className="block text-[11px] text-gray-400 font-bold uppercase">Semestre</span>
            <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Printemps S2</span>
          </div>
        </div>
      </div>

      {/* Raccourcis de gestion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <h2 className="font-bold text-gray-800 text-base">Justificatifs & Certificats</h2>
            <p className="text-xs text-gray-500 mt-1">Traitez les demandes de régularisation d absences soumises par les étudiants.</p>
          </div>
          <Link href="/admin/justificatifs" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors pt-2">
            Ouvrir la file d attente <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <h2 className="font-bold text-gray-800 text-base">Comptes & Inscriptions</h2>
            <p className="text-xs text-gray-500 mt-1">Créez et configurez les accès pour les étudiants, professeurs et surveillants.</p>
          </div>
          <Link href="/admin/utilisateurs" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors pt-2">
            Gérer les utilisateurs <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <h2 className="font-bold text-gray-800 text-base">Logs & Paramètres</h2>
            <p className="text-xs text-gray-500 mt-1">Consultez l historique technique du système et gérez le passage d un semestre à l autre.</p>
          </div>
          <Link href="/admin/configuration" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors pt-2">
            Accéder aux configurations <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}