import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";

export const metadata: Metadata = {
  title: "Communication Admin",
  description: "Communication & Alert Engine Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <div className="demo-banner">
          🚀 Version Démo – Données fictives uniquement
        </div>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
