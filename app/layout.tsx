import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Footer } from "@/components/layout/Footer";

// Fuente monoespaciada de respaldo
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LostConnect - Red Social de Objetos Perdidos | La Salle Nezahualcóyotl",
  description: "Conecta con tu comunidad para encontrar objetos perdidos y devolver objetos encontrados. Proyecto estudiantil de La Salle Nezahualcóyotl.",
  keywords: ["objetos perdidos", "red social", "comunidad", "La Salle", "Nezahualcóyotl"],
  authors: [{ name: "Estudiantes de La Salle Nezahualcóyotl" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SessionProvider>
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
