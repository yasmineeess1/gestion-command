"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/src/lib/uploadthing";
import { createJustificatif } from "./actions";
import { DocType } from "@prisma/client";
import { FileCheck, AlertCircle, Loader2 } from "lucide-react";

export default function SubmitForm() {
  const [type, setType] = useState<DocType>("MOTIF_SIMPLE");
  const [semestre, setSemestre] = useState<number>(1);
  const [commentaire, setCommentaire] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) {
      setError("Veuillez d'abord uploader un justificatif (PDF ou Image).");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await createJustificatif({
        type,
        semestre,
        commentaire,
        fileUrl,
      });
      
      // Reset du formulaire après succès
      setFileUrl("");
      setFileName("");
      setCommentaire("");
    } catch (err) {
  // On type l'erreur localement comme une instance d'Error
  const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue lors de la soumission.";
  setError(errorMessage);
} finally {
  };
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Déposer un nouveau justificatif</h2>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de document</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value as DocType)}
            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="MOTIF_SIMPLE">Motif Simple (Billet de retard / absence)</option>
            <option value="CERTIFICAT_MEDICAL">Certificat Médical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semestre</label>
          <select 
            value={semestre} 
            onChange={(e) => setSemestre(Number(e.target.value))}
            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>Semestre 1</option>
            <option value={2}>Semestre 2</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire (optionnel)</label>
        <textarea
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          placeholder="Ajoutez des précisions si nécessaire..."
          className="w-full p-2 border border-gray-200 rounded-lg text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Zone d'Upload avec UploadThing */}
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50">
        {!fileUrl ? (
          <UploadButton<OurFileRouter, "justificatifUploader">
            endpoint="justificatifUploader"
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                setFileUrl(res[0].url);
                setFileName(res[0].name);
              }
            }}
            onUploadError={(error: Error) => {
              setError(`Erreur d'upload : ${error.message}`);
            }}
          />
        ) : (
          <div className="flex items-center gap-2 text-green-600 font-medium text-sm bg-green-50 px-4 py-2 rounded-lg">
            <FileCheck size={18} />
            <span>{fileName || "Fichier chargé avec succès !"}</span>
            <button 
              type="button" 
              onClick={() => { setFileUrl(""); setFileName(""); }}
              className="text-xs text-red-500 underline ml-2 hover:text-red-700"
            >
              Changer
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !fileUrl}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Envoi en cours...
          </>
        ) : (
          "Soumettre le justificatif académique"
        )}
      </button>
    </form>
  );
}