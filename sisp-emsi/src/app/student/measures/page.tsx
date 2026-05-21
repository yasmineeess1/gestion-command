export default function MeasuresPage() {
  const measures = [
    { date: "27/01/2026", type: "Conseil de discipline", count: 25 },
    { date: "07/01/2026", type: "Exclusion de 5 jours", count: 21 },
  ];

  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-xl font-bold p-6 border-b">
        État des mesures disciplinaires pour absentéisme
      </h1>
      
      <div className="p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-sm">Date de génération</th>
              <th className="p-4 font-semibold text-sm">Avertissement</th>
              <th className="p-4 font-semibold text-sm">Nombre des absences</th>
            </tr>
          </thead>
          <tbody>
            {measures.map((m, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm">{m.date}</td>
                <td className="p-4 text-sm">{m.type}</td>
                <td className="p-4 text-sm">{m.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}