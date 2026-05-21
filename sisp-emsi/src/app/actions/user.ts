"use server";

import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function inscrireEtudiant(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const classe = formData.get("classe") as string;
  const telephone = formData.get("telephone") as string;

  if (!name || !email || !password) {
    return { error: "Veuillez remplir tous les champs obligatoires." };
  }

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Cet email est déjà utilisé." };

    // Hachage du mot de passe par défaut
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        classe,
        telephone,
        role: "STUDENT", // Forcé à STUDENT
      },
    });

    revalidatePath("/supervisor/students");
    return { success: true };
  } catch (err) {
    return { error: "Une erreur est survenue lors de l'enregistrement." };
  }
}