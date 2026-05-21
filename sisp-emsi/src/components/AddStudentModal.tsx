"use client";

import { useState } from "react";
import { inscrireEtudiant } from "@/src/app/actions/user";
import { UserPlus, X, Loader2, User, Mail, Lock, Phone, GraduationCap } from "lucide-react";

export default function AddStudentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await inscrireEtudiant(formData);

    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 🟣 Bouton Violet Principal d'Incription */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-[#5046e5] hover:bg-[#4338ca] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-[0.98]"
      >
        <UserPlus size={16} /> Inscrire un Étudiant
      </button>

      {/* 🪟 Fenêtre Modale */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Arrière-plan flouté sombre (fermeture désactivée si chargement en cours) */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => !loading && setIsOpen(false)} 
          />

          {/* Boîte de dialogue du formulaire */}
          <div className="relative bg-white rounded-2xl w-full max-w-md border border-slate-100 shadow-xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
            
            {/* En-tête */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Nouvelle Inscription Étudiant</h3>
                <p className="text-[11px] text-slate-500">Ajouter un nouvel élève au système SISP</p>
              </div>
              <button 
                type="button"
                disabled={loading}
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/50 transition-colors disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              
              {/* Message d'erreur */}
              {error && (
                <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-100 font-semibold">
                  ⚠️ {error}
                </p>
              )}

              {/* Champ : Nom Complet */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 uppercase">Nom Complet *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    disabled={loading}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-60" 
                    placeholder="Ex: Hafsa Tazi" 
                  />
                </div>
              </div>

              {/* Champ : Email Académique */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 uppercase">Email Académique *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    disabled={loading}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-60" 
                    placeholder="nom@emsi.ma" 
                  />
                </div>
              </div>

              {/* Champ : Mot de Passe */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 uppercase">Mot de Passe *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="password" 
                    name="password" 
                    required 
                    disabled={loading}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-60" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              {/* Grille : Classe & Téléphone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase">Classe</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      name="classe" 
                      disabled={loading}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-60" 
                      placeholder="Ex: 2IIR" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      name="telephone" 
                      disabled={loading}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-60" 
                      placeholder="0600000000" 
                    />
                  </div>
                </div>
              </div>

              {/* Bouton de Soumission Interactif */}
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full inline-flex items-center justify-center gap-2 bg-[#5046e5] hover:bg-[#4338ca] text-white font-bold text-sm py-2.5 rounded-xl shadow-sm transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  "Confirmer l'inscription"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}