"use server";

import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: {
  name: string;
  telephone?: string;
  adresse?: string;
  image?: string;
}) {
  const session = await auth();

  // Sécurité : on vérifie que l'étudiant est bien connecté
  if (!session?.user?.id) {
    throw new Error("Session expirée ou utilisateur non connecté.");
  }

  const studentId = parseInt(session.user.id, 10);

  // Mise à jour dans PostgreSQL via Prisma
  await prisma.user.update({
    where: { id: studentId },
    data: {
      name: formData.name,
      telephone: formData.telephone,
      adresse: formData.adresse,
      image: formData.image, // L'URL de la photo renvoyée par UploadThing
    },
  });

  // On force Next.js à recharger les données pour rafraîchir l'interface et la sidebar
  revalidatePath("/student/profile");
}