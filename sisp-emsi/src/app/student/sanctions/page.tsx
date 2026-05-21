import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { ShieldAlert, AlertTriangle, Calendar, Info } from "lucide-react";

const getNiveauStyle = (niveau: string) => {
  const upperNiveau = niveau.toUpperCase();
  if (upperNiveau.includes("AVERTISSEMENT")) {
    return {
      bg: "bg-amber-50 border-amber-200 text-amber-800",
      icon: <AlertTriangle className="text-amber-500" size={18} />
    };
  }
  return {
    bg: "bg-red-50 border-red-200 text-red-800",
    icon: <ShieldAlert className="text-red-500" size={18} />
  };
};

export default async function StudentSanctionsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const sanctions = await prisma.sanction.findMany({
    where: { studentId: parseInt(session.user.id, 10) },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Suivi Disciplinaire</h1>
        <p className="text-sm text-gray-500">Consultez votre historique disciplinaire académique lié aux absences ou au règlement intérieur.</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-3 text-sm text-gray-600">
        <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
        <p>
          Conformément au règlement de l <strong>EMSI</strong>, l accumulation d absences non justifiées (plus de 5 modules non justifiés) peut générer des sanctions automatiques allant de l avertissement jusqu à la convocation.
        </p>
      </div>

      <div className="space-y-4">
        {sanctions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
            <ShieldAlert size={36} className="text-green-400" />
            <span className="font-medium text-gray-700">Dossier disciplinaire vierge</span>
            Félicitations, vous n avez aucune sanction enregistrée.
          </div>
        ) : (
          sanctions.map((sanction) => {
            const style = getNiveauStyle(sanction.niveau);
            return (
              <div 
                key={sanction.id} 
                className={`p-5 rounded-xl border shadow-sm ${style.bg} flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide">
                    {style.icon}
                    <span>{sanction.niveau}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-base text-gray-900">{sanction.raison}</h3>
                    {sanction.description && (
                      <p className="text-sm text-gray-600 mt-1">{sanction.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium shrink-0 bg-white/60 px-3 py-1.5 rounded-lg border border-black/5 self-start sm:self-auto">
                  <Calendar size={14} />
                  <span>{new Date(sanction.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}