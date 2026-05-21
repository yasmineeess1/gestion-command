import { auth } from "@/src/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Détection des différentes routes
  const isStudentRoute = req.nextUrl.pathname.startsWith("/student");
  const isTeacherRoute = req.nextUrl.pathname.startsWith("/teacher");
  const isSupervisorRoute = req.nextUrl.pathname.startsWith("/supervisor"); // Ajouté 🕵️‍♂️
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // 1. UTILISATEUR NON CONNECTÉ
  // Si quelqu'un tente d'entrer dans un espace privé sans session, redirection vers /login
  if (
    (isStudentRoute || isTeacherRoute || isSupervisorRoute || isAdminRoute) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 2. LOGIQUE DE REDIRECTION ET SÉCURITÉ PAR RÔLE (Si connecté)
  if (isLoggedIn) {
    
    // CAS STUDENT : N'a accès QU'À /student
    if (role === "STUDENT" && (isTeacherRoute || isSupervisorRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL("/student", req.nextUrl));
    }

    // CAS TEACHER : N'a accès QU'À /teacher
    if (role === "TEACHER" && (isStudentRoute || isSupervisorRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL("/teacher", req.nextUrl));
    }

    // CAS SURVEILLANT (Mr. Tazi) : N'a accès QU'À /supervisor 🕵️‍♂️
    if (role === "SURVEILLANT" && (isStudentRoute || isTeacherRoute || isAdminRoute)) {
      return NextResponse.redirect(new URL("/supervisor", req.nextUrl));
    }

    // CAS ADMIN : S'il tente d'aller sur une route qui n'est pas la sienne
    if (role === "ADMIN" && (isStudentRoute || isTeacherRoute || isSupervisorRoute)) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
  }

  return NextResponse.next();
});

// CRUCIAL : Tu dois ajouter le matcher pour inclure la route supervisor !
export const config = {
  matcher: [
    "/student/:path*",
    "/teacher/:path*",
    "/supervisor/:path*", // Ajouté 🚀
    "/admin/:path*",
  ],
};