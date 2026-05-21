import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, classe, telephone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Champs obligatoires manquants (Nom, Email, Mot de passe)." },
        { status: 400 }
      );
    }

    // Vérifier si l'étudiant existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Cette adresse email est déjà enregistrée." },
        { status: 400 }
      );
    }

    // Création de l'étudiant
    const newStudent = await prisma.user.create({
      data: {
        name,
        email,
        password, // Optionnel : tu pourras ajouter bcrypt plus tard pour hacher le mot de passe
        role: "STUDENT",
        classe,
        telephone: telephone || null,
      },
    });

    return NextResponse.json(
      { message: "Étudiant inscrit avec succès !", student: newStudent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur Inscription:", error);
    return NextResponse.json(
      { message: "Une erreur interne est survenue." },
      { status: 500 }
    );
  }
}