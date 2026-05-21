"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  CalendarX,
  FileText,
  ShieldAlert,
  GraduationCap,
  User,
  LogOut,
  FileSpreadsheet,
  Users 
} from "lucide-react";

// 👥 Ajout explicite du rôle SURVEILLANT distinct de TEACHER
type Role = "STUDENT" | "TEACHER" | "SURVEILLANT" | "ADMIN" | "SUPER_ADMIN";

interface SidebarProps {
  role: Role;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  // 👨‍🎓 Liens pour l'espace Étudiant
  const studentLinks = [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "Mon Profil", href: "/student/profile", icon: User },
    { label: "Absences", href: "/student/absences", icon: CalendarX },
    { label: "Justificatifs", href: "/student/justificatifs", icon: FileText },
    { label: "Notes", href: "/student/notes", icon: GraduationCap },
    { label: "Suivi Disciplinaire", href: "/student/sanctions", icon: ShieldAlert },
    { label: "Demande de Relevé", href: "/student/releve", icon: FileSpreadsheet },
  ];

  // 👨‍🏫 Liens pour l'espace Enseignant uniquement (Cours + Notes)
  const teacherLinks = [
    { label: "Dashboard", href: "/teacher", icon: LayoutDashboard },
    { label: "Faire l'Appel", href: "/teacher/absences", icon: CalendarX },
    { label: "Saisie des Notes", href: "/teacher/notes", icon: GraduationCap },
    { label: "Mon Profil", href: "/teacher/profile", icon: User },
  ];

  // 🕵️‍♂️ NOUVEAU : Liens dédiés pour le Surveillant (Appel global des classes, pas de gestion de notes)
  const supervisorLinks = [
    { label: "Dashboard", href: "/supervisor", icon: LayoutDashboard },
    { label: "Faire l'Appel (Classes)", href: "/supervisor/absences", icon: CalendarX },
    { label: "Suivi des Étudiants", href: "/supervisor/utilisateurs", icon: Users },
    { label: "Mon Profil", href: "/supervisor/profile", icon: User },
  ];

  // 💼 Liens pour l'espace Administration
  const adminLinks = [
    { label: "Dashboard Admin", href: "/admin", icon: LayoutDashboard },
    { label: "Valider les Justificatifs", href: "/admin/justificatifs", icon: FileText },
    { label: "Inscriptions & Comptes", href: "/admin/utilisateurs", icon: Users },
    { label: "Configuration Semestres", href: "/admin/configuration", icon: FileSpreadsheet },
  ];

  // Sélection dynamique des liens selon le rôle exact
  const links = 
    role === "STUDENT" ? studentLinks : 
    role === "TEACHER" ? teacherLinks : 
    role === "SURVEILLANT" ? supervisorLinks :
    role === "ADMIN" || role === "SUPER_ADMIN" ? adminLinks : [];

  // Petit helper pour afficher dynamiquement le nom du portail dans le Header
  const getPortalName = () => {
    if (role === "TEACHER") return "Portail Enseignant";
    if (role === "SURVEILLANT") return "Portail Surveillant";
    if (role === "ADMIN" || role === "SUPER_ADMIN") return "Administration";
    return "Gestion académique";
  };

  // Helper pour adapter le libellé du groupe de menu
  const getMenuLabel = () => {
    if (role === "TEACHER") return "Menu Enseignant";
    if (role === "SURVEILLANT") return "Menu Surveillant";
    if (role === "ADMIN" || role === "SUPER_ADMIN") return "Menu Admin";
    return "Menu Étudiant";
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 text-white flex flex-col shrink-0">
      {/* Header avec Logo EMSI */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
          E
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide">SISP EMSI</h1>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
            {getPortalName()}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5">
        <span className="block px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {getMenuLabel()}
        </span>
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-600/10"
                    : "hover:bg-slate-900 text-slate-400 hover:text-white"
                }
              `}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-slate-500 group-hover:text-emerald-400"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white text-sm font-medium transition-all duration-200"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}