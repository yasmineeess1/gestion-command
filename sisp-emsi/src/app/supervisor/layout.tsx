import "../globals.css";
import Sidebar from "@/src/components/Sidebar";

export default function SupervisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 text-gray-800 antialiased">
      
      {/* Sidebar configurée pour le surveillant */}
      <Sidebar role="SURVEILLANT" />

      {/* ZONE DE CONTENU PRINCIPALE */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>Contrôle Terrain</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Espace Surveillance & Assiduité</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-full border border-indigo-200">
              Mode Inspecteur Actif
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>

        <footer className="py-4 px-6 border-t border-gray-200/60 bg-white text-center text-xs text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} SISP-EMSI — Service de Surveillance. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}