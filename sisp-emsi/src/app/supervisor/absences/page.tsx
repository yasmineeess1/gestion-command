import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import SupervisorAppelForm from "./SupervisorAppelForm";

export default async function SupervisorAbsencesPage() {
  const session = await auth();

  // Protection de la route
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pointage des Classes</h1>
        <p className="text-sm text-gray-500">
          Sélectionnez un groupe d étudiants ainsi qu un créneau pour enregistrer les présences constatées sur le terrain.
        </p>
      </div>

      {/* Insertion du composant dynamique de surveillance */}
      <SupervisorAppelForm />
    </div>
  );
}