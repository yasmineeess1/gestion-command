import "../globals.css"; // Alias global propre
import Sidebar from "@/src/components/Sidebar"; // Assure-toi que le chemin vers ton composant Sidebar est le bon !

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 text-slate-800 antialiased">
      
      {/* On appelle le composant unique avec le rôle STUDENT */}
      <Sidebar role="STUDENT" />

      {/* ZONE DE CONTENU PRINCIPALE */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* En-tête de la page */}
        <header className="h-16 border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>Espace Établissement</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Portail Étudiant</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2.5 py-1 rounded-full border border-gray-200">
              Session Active
            </span>
          </div>
        </header>

        {/* Injection dynamique de tes pages */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-gray-200/60 bg-white text-center text-xs text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} SISP-EMSI — Système d Information de Suivi de Présences. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}