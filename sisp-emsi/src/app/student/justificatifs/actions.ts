"use server";

import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/auth";
import { revalidatePath } from "next/cache";
import { DocType } from "@prisma/client";

export async function createJustificatif(formData: {
  type: DocType;
  fileUrl: string;
  commentaire?: string;
  semestre: number;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Vous devez être connecté pour effectuer cette action.");
  }

  // Conversion de l'ID de la session en Int (vu que ton schéma utilise un Int auto-incrémenté)
  const studentId = parseInt(session.user.id, 10);

  await prisma.justificatif.create({
    data: {
      type: formData.type,
      fileUrl: formData.fileUrl,
      commentaire: formData.commentaire,
      semestre: formData.semestre,
      studentId: studentId,
      status: "EN_ATTENTE",
    },
  });

  // Force la page à se recharger côté serveur pour afficher le nouveau document
  revalidatePath("/student/justificatifs");
}