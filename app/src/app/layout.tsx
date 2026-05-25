import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jorge Lorenzo — World Champion Coach",
  description: "World Champion Coach. Two World Championships and Olympic Games experience. Pre-Season Tours and elite coaching for college basketball programs.",
  keywords: "basketball coach, world champion, college basketball training, pre-season tours, European basketball",
  authors: [{ name: "Jorge Lorenzo" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    siteName: "Jorge Lorenzo Coach",
    locale: "en_US",
    title: "Jorge Lorenzo — World Champion Coach",
    description: "World Champion 2019 and European Champion 2022 with Spain's National Team. Elite pre-season tours and coaching for college basketball.",
    images: [{ url: "/fotos/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Lorenzo — World Champion Coach",
    description: "World Champion 2019 and European Champion 2022. Pre-season tours and elite coaching.",
    images: ["/fotos/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏀</text></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jorge Lorenzo",
              jobTitle: "Basketball Coach",
              description: "World Champion 2019 and European Champion 2022 with Spain's National Team. Elite coaching and pre-season tours for college basketball programs.",
              url: "https://www.jorgelorenzo.coach/",
              sameAs: ["https://www.instagram.com/jorgelorenzo.coach/", "https://x.com/JLbasket"],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
