import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Phone, MapPin, Calendar, BookOpen } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  // Protection de la page
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  // Traduction propre des rôles pour l'affichage à l'EMSI
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "STUDENT": return "Étudiant (2IIR)";
      case "TEACHER": return "Enseignant / Corps Professeur";
      case "SURVEILLANT": return "Surveillant Général / Terrain";
      case "ADMIN": return "Administrateur Scolarité";
      case "SUPER_ADMIN": return "Super Administrateur";
      default: return role;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4 md:p-6">
      {/* Titre */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mon Profil SISP</h1>
        <p className="text-sm text-gray-500">Gérez vos informations personnelles et vérifiez les détails de votre compte.</p>
      </div>

      {/* Carte Principale Profil */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Bannière de fond colorée selon le rôle */}
        <div className={`h-28 bg-gradient-to-r ${
          user.role === "STUDENT" ? "from-indigo-500 to-purple-600" :
          user.role === "TEACHER" ? "from-emerald-500 to-teal-600" :
          user.role === "SURVEILLANT" ? "from-amber-500 to-orange-600" :
          "from-slate-700 to-slate-900"
        }`} />

        <div className="px-6 pb-6 relative">
          {/* Avatar / Photo de profil */}
          <div className="absolute -top-12 left-6">
            <div className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-slate-700 overflow-hidden">
              {user.image ? (
                <img src={user.image} alt={user.name || "Profil"} className="w-full h-full object-cover" />
              ) : (
                user.name?.charAt(0) || <User size={32} />
              )}
            </div>
          </div>

          {/* Nom et Statut Principal */}
          <div className="pt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name || "Utilisateur EMSI"}</h2>
              <p className="text-sm font-medium text-gray-400 flex items-center gap-1 mt-0.5">
                <Shield size={14} /> {getRoleLabel(user.role || "STUDENT")}
              </p>
            </div>

            <span className={`self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full border ${
              user.role === "STUDENT" ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
              user.role === "TEACHER" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
              "bg-slate-50 text-slate-700 border-slate-200"
            }`}>
              Compte Vérifié
            </span>
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Grille des détails du profil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Colonne Gauche : Identifiants */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 border border-gray-100 rounded-lg text-gray-400">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Adresse Email</span>
                  <span className="text-sm font-medium text-gray-800">{user.email}</span>
                </div>
              </div>

              {user.role === "STUDENT" && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 border border-gray-100 rounded-lg text-gray-400">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase">Classe Affectée</span>
                    <span className="text-sm font-bold text-indigo-600">2IIR</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 border border-gray-100 rounded-lg text-gray-400">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Membre depuis</span>
                  <span className="text-sm font-medium text-gray-800">Mai 2026</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Coordonnées du Prisma Schema */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 border border-gray-100 rounded-lg text-gray-400">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Téléphone</span>
                  <span className="text-sm font-medium text-gray-800">0612345678</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 border border-gray-100 rounded-lg text-gray-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Adresse Résidence</span>
                  <span className="text-sm font-medium text-gray-800">Casablanca, Maroc</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}