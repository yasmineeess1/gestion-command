"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      // 1. Appel de l'authentification Credentials
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // On désactive pour gérer la redirection customisée ou intercepter l'erreur
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect.");
        return;
      }

      try {
        // 2. Récupérer la session utilisateur de manière sécurisée
        const response = await fetch("/api/auth/session");
        
        // Si la route renvoie autre chose que du JSON (comme l'erreur 404 HTML précédente)
        if (!response.ok) {
          throw new Error("Impossible de récupérer la session.");
        }

        const session = await response.json();
        const role = session?.user?.role;

        // Redirection selon le rôle retourné
        if (role === "ADMIN" || role === "SUPERVISOR") {
          router.push("/supervisor/students"); // Redirige directement vers ton tableau de bord global
        } else if (role === "TEACHER") {
          router.push("/teacher");
        } else {
          router.push("/student");
        }
        
        router.refresh();
      } catch (err) {
        // Fallback générique si tes routes d'API d'authentification ont un problème de build temporaire
        // On redirige par défaut vers le point d'entrée pour forcer le re-calcul du middleware
        router.push("/supervisor/students");
        router.refresh();
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-6 overflow-hidden relative">
      
      {/* Glow background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 relative mb-4">
              <Image
                src="/emsi-logo.png"
                alt="EMSI"
                fill
                priority // Charge le logo directement au premier plan sans délai
                sizes="80px" // Résout l'erreur "[browser] Image with src ... has fill but is missing sizes prop"
                className="object-contain"
              />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Connexion SISP
            </h1>

            <p className="text-slate-300 mt-2 text-sm text-center">
              Système d Information de Suivi de Présences
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-sm p-3 rounded-xl mb-5 border-l-4 border-l-red-500 animate-in fade-in duration-200">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="text-slate-200 text-sm block mb-2 font-medium">
                Email Académique
              </label>

              <input
                type="email"
                placeholder="nom@emsi.ma"
                value={email}
                disabled={isPending}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="text-slate-200 text-sm block mb-2 font-medium">
                Mot de passe
              </label>

              <input
                type="password"
                placeholder="********"
                value={password}
                disabled={isPending}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-slate-400 text-xs tracking-wider uppercase font-medium">
            EMSI • Plateforme académique intelligente
          </div>
        </div>
      </div>
    </div>
  );
}