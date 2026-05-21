import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import JustificatifsList from "./JustificatifsList";

export default async function AdminJustificatifsPage() {
  const session = await auth();

  // Sécurité d'accès admin
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Validation des Justificatifs</h1>
        <p className="text-sm text-gray-500">
          Consultez les pièces justificatives envoyées par les étudiants pour régulariser leurs absences.
        </p>
      </div>

      {/* Insertion de la liste interactive */}
      <JustificatifsList />
    </div>
  );
}