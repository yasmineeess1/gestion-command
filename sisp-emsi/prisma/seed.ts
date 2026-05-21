import { PrismaClient, Role, DocType, DocStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("⏳ Nettoyage de la base de données...");
  // Supprime les anciennes données pour repartir à zéro à chaque exécution du seed
  await prisma.sanction.deleteMany();
  await prisma.note.deleteMany();
  await prisma.absence.deleteMany();
  await prisma.justificatif.deleteMany();
  await prisma.user.deleteMany();

  // Génération du mot de passe haché sécurisé (utilisé pour tous les comptes de test)
  const hashedPassword = await bcrypt.hash("123456", 10);

  console.log("🌱 Insertion des utilisateurs de test...");

  // 1. 👨‍🎓 Compte Étudiant (Yasmine)
  const student = await prisma.user.create({
    data: {
      name: "Yasmine",
      email: "yasmin@emsi.ma",
      password: hashedPassword, // Utilisation du mot de passe haché
      role: Role.STUDENT,
      classe: "2IIR",
      telephone: "0612345678",
      adresse: "Casablanca",
    },
  });

  // 2. 👨‍🏫 Compte Enseignant
  const teacher = await prisma.user.create({
    data: {
      name: "Prof. Benjelloun",
      email: "benjelloun.prof@emsi.ma",
      password: hashedPassword,
      role: Role.TEACHER,
      telephone: "0677889900",
    },
  });

  // 3. 🕵️‍♂️ Compte Surveillant
  const supervisor = await prisma.user.create({
    data: {
      name: "Mr. Tazi (Surveillant)",
      email: "tazi.surv@emsi.ma",
      password: hashedPassword,
      role: Role. SURVEILLANT,
      telephone: "0655443322",
    },
  });

  // 4. 💼 Compte Administrateur
  const admin = await prisma.user.create({
    data: {
      name: "Mme. Alami (Administration)",
      email: "alami.admin@emsi.ma",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("✅ Utilisateurs créés.");
  console.log("📊 Génération de l'historique de test...");

  // --- Données de test pour l'Enseignant (Matières / Notes) ---
  await prisma.note.createMany({
    data: [
      { studentId: student.id, module: "ASP.NET MVC", type: "CC", valeur: 15.5 },
      { studentId: student.id, module: "NoSQL", type: "CC", valeur: 14.0 },
    ],
  });

  // Absence générée par l'Enseignant (liée à un module spécifique)
  const absenceProf = await prisma.absence.create({
    data: {
      studentId: student.id,
      module: "ASP.NET MVC",
      semestre: 1,
      isJustified: false,
    },
  });

  // --- Données de test pour le Surveillant (Tournée terrain) ---
  // Absence générée par le Surveillant (liée à un créneau horaire global)
  await prisma.absence.create({
    data: {
      studentId: student.id,
      creneau: "08:30 - 10:15",
      semestre: 1,
      isJustified: false,
    },
  });

  // --- Données de test pour l'Administration (Validation & Quotas) ---
  // Un justificatif déjà validé ce semestre
  await prisma.justificatif.create({
    data: {
      studentId: student.id,
      type: DocType.CERTIFICAT_MEDICAL,
      status: DocStatus.VALID,
      fileUrl: "https://uploadthing.com/f/certif-archive.pdf",
      commentaire: "Reçu et validé par le secrétariat.",
      semestre: 1,
    },
  });

  // Un nouveau justificatif en attente (lié à l'absence créée par le prof ci-dessus)
  await prisma.justificatif.create({
    data: {
      studentId: student.id,
      type: DocType.CERTIFICAT_MEDICAL,
      status: DocStatus.EN_ATTENTE,
      fileUrl: "https://uploadthing.com/f/nouveau-certif.pdf",
      commentaire: "Certificat pour absence maladie.",
      semestre: 1,
      absences: {
        connect: { id: absenceProf.id },
      },
    },
  });

  console.log("🎉 Seed terminé avec succès ! Tous les profils métiers sont prêts.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });