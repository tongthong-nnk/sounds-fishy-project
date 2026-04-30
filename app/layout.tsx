import type { Metadata } from "next";
import { Mali, Noto_Sans_Thai } from "next/font/google";
import { VolumeControl } from "@/components/theme/VolumeControl";
import "./globals.css";

const displayFont = Mali({
  variable: "--font-fishy-display",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Noto_Sans_Thai({
  variable: "--font-fishy-body",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sounds Fishy",
  description: "A private multiplayer bluffing party game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <VolumeControl />
      </body>
    </html>
  );
}
