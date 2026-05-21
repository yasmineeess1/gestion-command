import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, FileText, Download, User, ArrowLeft, CheckCircle, Clock, XCircle, Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentFollowUpPage({ params }: Props) {
  // 🔥 Correction Next.js 15 : On attend la résolution des paramètres
  const resolvedParams = await params;
  const studentId = parseInt(resolvedParams.id);

  if (isNaN(studentId)) {
    notFound();
  }

  // Requête Prisma
  const student = await prisma.user.findUnique({
    where: { id: studentId, role: "STUDENT" },
    include: {
      absences: true,
      justificatifs: true,
      sanctions: true,
    },
  });

  if (!student) {
    notFound();
  }

  const nonJustifiees = student.absences.filter((a) => !a.isJustified).length;

  // ⚡ SERVER ACTIONS pour modifier le statut en base de données
  async function handleValidate(justificatifId: number) {
    "use server";
    await prisma.justificatif.update({
      where: { id: justificatifId },
      data: { status: "VALID" },
    });
    revalidatePath(`/supervisor/students/${studentId}`);
  }

  async function handleReject(justificatifId: number) {
    "use server";
    await prisma.justificatif.update({
      where: { id: justificatifId },
      data: { status: "REJETE" },
    });
    revalidatePath(`/supervisor/students/${studentId}`);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      {/* Bouton retour */}
      <Link
        href="/supervisor/students"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-semibold transition-colors"
      >
        <ArrowLeft size={16} /> Retour à la liste globale
      </Link>

      {/* En-tête : Profil de l'Étudiant */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
        
        {/* Affichage de sa PROPRE PHOTO ou d'un fallback */}
        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
          {student.image ? (
            <Image
              src={student.image}
              alt={student.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <User size={40} className="text-indigo-400" />
          )}
        </div>

        {/* Détails civils */}
        <div className="flex-1 text-center md:text-left space-y-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900">{student.name}</h1>
            <span className="px-3 py-0.5 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full w-fit mx-auto md:mx-0">
              {student.classe || "2IIR"}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">{student.email}</p>
          <p className="text-xs text-gray-400">
            Téléphone : {student.telephone || "Non renseigné"}
          </p>
        </div>

        {/* Statut des absences */}
        <div className="bg-slate-50 border border-gray-100 p-4 rounded-xl text-center min-w-[150px]">
          <span className="text-xs text-gray-400 font-bold uppercase block">Non Justifiées</span>
          <span className={`text-3xl font-black block mt-1 ${nonJustifiees >= 2 ? "text-rose-600" : "text-gray-800"}`}>
            {nonJustifiees}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tableau des Absences */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-slate-50/50">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              Historique des Absences
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400 font-semibold uppercase bg-slate-50/20">
                  <th className="p-4">Date</th>
                  <th className="p-4">Créneau / Module</th>
                  <th className="p-4 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {student.absences.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-400 font-medium">
                      Aucune absence enregistrée.
                    </td>
                  </tr>
                ) : (
                  student.absences.map((abs) => (
                    <tr key={abs.id} className="hover:bg-slate-50/30">
                      <td className="p-4 font-medium">
                        {new Date(abs.date).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="p-4">
                        <span className="block font-semibold text-gray-800">
                          {abs.creneau || "Non spécifié"}
                        </span>
                        {abs.module && (
                          <span className="text-xs text-gray-400 block">{abs.module}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {abs.isJustified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <CheckCircle size={12} /> Justifiée
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                            <XCircle size={12} /> Non justifiée
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tous les Mots Écrits et Uploadés sur la plateforme */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-slate-50/50">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              <FileText size={16} className="text-gray-400" />
              Mots & Justificatifs Importés
            </h3>
          </div>

          <div className="p-4 flex-1 space-y-3 overflow-y-auto">
            {student.justificatifs.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6 font-medium">
                Aucun document téléversé par cet étudiant.
              </p>
            ) : (
              student.justificatifs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 border border-gray-100 bg-slate-50/50 rounded-xl space-y-2 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">
                        {doc.type === "CERTIFICAT_MEDICAL" ? "🏥 Certificat Médical" : "📝 Motif Simple"}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        Semestre {doc.semestre}
                      </span>
                    </div>
                    
                    {/* Badge de statut du document */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      doc.status === "VALID" ? "bg-emerald-50 text-emerald-700" :
                      doc.status === "REJETE" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {doc.status}
                    </span>
                  </div>

                  {doc.commentaire && (
                    <p className="text-xs text-gray-500 italic bg-white p-2 rounded-lg border border-gray-100">
                      {doc.commentaire}
                    </p>
                  )}

                  {/* 📥 Bouton de téléchargement */}
                  <a
                    href={`${doc.fileUrl}${doc.fileUrl.includes('?') ? '&' : '?'}download=true`}
                    download={`Justificatif_${student.name.replace(/\s+/g, "_")}_S${doc.semestre}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold text-indigo-700 py-2 rounded-xl transition-all shadow-sm mt-2 active:scale-[0.98]"
                  >
                    <Download size={14} /> Télécharger la pièce d origine
                  </a>

                  {/* ⚙️ Actions de validation rapides (S'affiche uniquement si EN_ATTENTE) */}
                  {doc.status === "EN_ATTENTE" && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <form action={handleValidate.bind(null, doc.id)}>
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 rounded-lg shadow-sm transition-colors"
                        >
                          <Check size={12} /> Valider
                        </button>
                      </form>
                      <form action={handleReject.bind(null, doc.id)}>
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold py-1.5 rounded-lg shadow-sm transition-colors"
                        >
                          <X size={12} /> Rejeter
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}