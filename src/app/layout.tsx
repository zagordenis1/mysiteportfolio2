import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zagordenis1.github.io/mysiteportfolio2/"),
  title: {
    default: "Денис Загоровський — Student Software Engineer",
    template: "%s | Денис Загоровський"
  },
  description:
    "Сучасне портфоліо студента-програміста Дениса Загоровського: навички, освіта, проєкти та контакти.",
  keywords: [
    "Денис Загоровський",
    "portfolio",
    "software engineering",
    "React",
    "Next.js",
    "Житомирська політехніка"
  ],
  authors: [{ name: "Денис Загоровський" }],
  creator: "Денис Загоровський",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    alternateLocale: "en_US",
    url: "https://zagordenis1.github.io/mysiteportfolio2/",
    title: "Денис Загоровський — Student Software Engineer",
    description:
      "Портфоліо студента спеціальності Інженерія програмного забезпечення з фокусом на modern frontend та backend foundations.",
    siteName: "Denys Zahorovskyi Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Денис Загоровський — Student Software Engineer",
    description:
      "Сучасне портфоліо з проєктами, навичками та контактами."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-canvas font-sans text-ink antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
