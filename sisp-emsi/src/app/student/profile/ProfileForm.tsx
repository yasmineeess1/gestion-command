"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/src/lib/uploadthing";
import { updateProfile } from "@/src/app/student/profile/actions";
import { User, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    telephone: string | null;
    adresse: string | null;
    image: string | null;
    classe: string | null;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name);
  const [telephone, setTelephone] = useState(user.telephone || "");
  const [adresse, setAdresse] = useState(user.adresse || "");
  const [image, setImage] = useState(user.image || "");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await updateProfile({ name, telephone, adresse, image });
      setMessage({ type: "success", text: "Profil mis à jour avec succès !" });
    } catch (err) {
      setMessage({ type: "error", text: "Une erreur est survenue lors de la mise à jour." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
      {message.text && (
        <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}

      {/* Section Photo de profil */}
      <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-50 pb-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
          {image ? (
            <Image src={image} alt="Avatar" fill className="object-cover" />
          ) : (
            <User size={36} />
          )}
        </div>
        <div className="flex flex-col items-center sm:items-start gap-1">
          <label className="text-sm font-medium text-gray-700">Photo de profil</label>
          <UploadButton<OurFileRouter, "avatarUploader">
            endpoint="avatarUploader"
            onClientUploadComplete={(res) => {
              if (res && res[0]) setImage(res[0].url);
            }}
            onUploadError={(error: Error) => {
              setMessage({ type: "error", text: `Erreur d'image : ${error.message}` });
            }}
          />
        </div>
      </div>

      {/* Informations Académiques (Lecture seule) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
        <div>
          <span className="block text-xs text-gray-400 font-medium">Email Académique</span>
          <span className="text-gray-700 font-medium">{user.email}</span>
        </div>
        <div>
          <span className="block text-xs text-gray-400 font-medium">Classe / Groupe</span>
          <span className="text-gray-700 font-medium">{user.classe || "Non assignée"}</span>
        </div>
      </div>

      {/* Formulaire modifiable */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="+212 600-000000"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse résidentielle</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Votre adresse à Casablanca..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Enregistrer les modifications"}
      </button>
    </form>
  );
}