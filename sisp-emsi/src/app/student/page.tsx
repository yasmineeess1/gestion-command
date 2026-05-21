import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import {
  BookOpen,
  TriangleAlert,
  FileText,
  CalendarX,
} from "lucide-react";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Non autorisé</div>;
  }

  const studentId = Number(session.user.id);

 const absences = await prisma.absence.count({
  where: { studentId }
});

const sanctions = await prisma.sanction.count({
  where: { studentId }
});

const notes = await prisma.note.count({
  where: { studentId }
});

const justificatifs = await prisma.justificatif.count({
  where: { studentId }
});
   

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Bonjour {session.user.name} 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Bienvenue sur votre espace étudiant SISP-EMSI
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Absences */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                Absences
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {absences}
              </h2>
            </div>

            <CalendarX className="text-red-400" size={40} />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                Notes
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {notes}
              </h2>
            </div>

            <BookOpen className="text-cyan-400" size={40} />
          </div>
        </div>

        {/* Justificatifs */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                Justificatifs
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {justificatifs}
              </h2>
            </div>

            <FileText className="text-indigo-400" size={40} />
          </div>
        </div>

        {/* Sanctions */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                Sanctions
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {sanctions}
              </h2>
            </div>

            <TriangleAlert className="text-yellow-400" size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}