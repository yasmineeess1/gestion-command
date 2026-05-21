"use client";

import { useState } from "react";
import { FileText, Download, Loader2, CheckCircle2 } from "lucide-react";

export default function ReleveForm() {
  const [semestre, setSemestre] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    // Simulation d'une attente réseau / création en base
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSuccess(true);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Nouvelle demande de document</h2>
        
        {success && (
          <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2 border border-green-200">
            <CheckCircle2 size={18} />
            Demande enregistrée ! Votre relevé est en cours de préparation par le secrétariat.
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner le Semestre</label>
          <select 
            value={semestre} 
            onChange={(e) => setSemestre(Number(e.target.value))}
            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>Semestre 1 (S1)</option>
            <option value={2}>Semestre 2 (S2)</option>
            <option value={0}>Année Complète (S1 + S2)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Traitement en cours...
            </>
          ) : (
            <>
              <FileText size={18} />
              Générer la demande officielle
            </>
          )}
        </button>
      </form>
    </div>
  );
}