// used for page config
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Daybridge",
  description: "Banking for peace of mind. Built by AK.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} flex flex-row`}
      >
        <main className="flex flex-row">
          <div className="dashboard-main flex flex-col">
            {/* <AuthButton /> */}
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
