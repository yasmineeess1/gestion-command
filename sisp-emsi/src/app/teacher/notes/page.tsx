import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import NotesForm from "./NotesForm";

export default async function TeacherNotesPage() {
  const session = await auth();

  // Sécurité d'accès
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Saisie des Notes</h1>
        <p className="text-sm text-gray-500">
          Remplissez les notes de contrôle continu et d examen. Les moyennes se calculent automatiquement en temps réel.
        </p>
      </div>

      {/* Formulaire de saisie dynamique */}
      <NotesForm />
    </div>
  );
}