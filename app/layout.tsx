import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regenerative Motherhood - The Path to Generative Infant Sleep",
  description: "Because supporting your baby's sleep can and should feel mutually nourishing.",
  openGraph: {
    title: "Regenerative Motherhood - The Path to Generative Infant Sleep",
    description: "Because supporting your baby's sleep can and should feel mutually nourishing.",
    images: ['/Link Preview.png'],
    type: 'website',
    url: 'https://regenerativemotherhood.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regenerative Motherhood',
    description: "Because supporting your baby's sleep can and should feel mutually nourishing.",
    images: ['/Link Preview.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
