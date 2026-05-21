import "../globals.css";
import Sidebar from "@/src/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 text-gray-800 antialiased">
      
      {/* Sidebar configurée pour l'admin */}
      <Sidebar role="ADMIN" />

      {/* ZONE DE CONTENU PRINCIPALE */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>Direction SISP</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Panneau d Administration Global</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-full border border-amber-200">
              Droits Admin Actifs
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>

        <footer className="py-4 px-6 border-t border-gray-200/60 bg-white text-center text-xs text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} SISP-EMSI — Administration Centrale. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}