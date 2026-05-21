import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import AppelForm from "./AppelForm";

export default async function TeacherAbsencesPage() {
  const session = await auth();

  // Sécurité d'accès : Seul un utilisateur connecté peut charger la page
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Suivi des Présences</h1>
        <p className="text-sm text-gray-500">
          Sélectionnez vos critères de cours pour charger le trombinoscope et valider l appel.
        </p>
      </div>

      {/* Insertion du formulaire dynamique */}
      <AppelForm />
    </div>
  );
}