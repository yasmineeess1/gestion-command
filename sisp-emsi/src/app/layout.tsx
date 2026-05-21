import "./globals.css";

export const metadata = {
  title: "SISP EMSI",
  description: "Système d'Information de Suivi de Présences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}