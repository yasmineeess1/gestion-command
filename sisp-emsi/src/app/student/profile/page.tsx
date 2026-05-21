import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import ProfileForm from "./ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  const student = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id, 10) },
    select: {
      name: true,
      email: true,
      telephone: true,
      adresse: true,
      image: true,
      classe: true,
    }
  });

  if (!student) {
    return <div className="p-6 text-red-500">Étudiant introuvable.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-sm text-gray-500">Gérez vos informations personnelles et vos coordonnées de contact EMSI.</p>
      </div>

      <ProfileForm user={student} />
    </div>
  );
}