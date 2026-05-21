import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Phone, MapPin, Calendar, ClipboardList, CheckCircle, AlertOctagon } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Récupération des infos fraîches de l'utilisateur depuis PostgreSQL
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      absences: true, // Pour l'étudiant
    }
  });

  if (!dbUser) return <p>Utilisateur introuvable.</p>;

  // Logique de compteurs personnalisés selon le rôle
  let statsComponent = null;

  if (dbUser.role === "STUDENT") {
    const totalAbsences = dbUser.absences.length;
    const nonJustifiees = dbUser.absences.filter(a => !a.isJustified).length;

    statsComponent = (
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
          <span className="text-xs text-gray-400 font-bold uppercase">Total Absences</span>
          <span className="block text-2xl font-extrabold text-indigo-600">{totalAbsences}</span>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
          <span className="text-xs text-rose-400 font-bold uppercase">Non Justifiées</span>
          <span className="block text-2xl font-extrabold text-rose-600">{nonJustifiees}</span>
        </div>
      </div>
    );
  } else if (dbUser.role === "SURVEILLANT") {
    // Simulation d'activité pour Mr. Tazi
    statsComponent = (
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
          <span className="text-xs text-amber-500 font-bold uppercase">Tournées ce mois</span>
          <span className="block text-2xl font-extrabold text-amber-700">42</span>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <span className="text-xs text-emerald-500 font-bold uppercase">Rapports Validés</span>
          <span className="block text-2xl font-extrabold text-emerald-700">100%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Carte du profil principale */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className={`h-24 bg-gradient-to-r ${
          dbUser.role === "STUDENT" ? "from-indigo-500 to-purple-600" : "from-amber-500 to-orange-600"
        }`} />
        
        <div className="p-6 relative">
          <div className="absolute -top-10 left-6 w-20 h-20 rounded-xl bg-slate-200 border-4 border-white flex items-center justify-center font-bold text-2xl text-gray-700 shadow-sm">
            {dbUser.name.charAt(0)}
          </div>

          <div className="pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{dbUser.name}</h2>
              <p className="text-xs font-semibold text-gray-400 flex items-center gap-1 mt-1">
                <Shield size={14} /> {dbUser.role} {dbUser.classe ? `— ${dbUser.classe}` : ""}
              </p>
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Grille de Coordonnées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400" />
              <span>{dbUser.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-400" />
              <span>{dbUser.telephone || "Non renseigné"}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-400" />
              <span>{dbUser.adresse || "Casablanca, EMSI"}</span>
            </div>
          </div>

          {/* Injection des statistiques dynamiques */}
          {statsComponent}
        </div>
      </div>
    </div>
  );
}