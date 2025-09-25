import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Move viewport to separate export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  // GitHub Pages URL format: https://username.github.io/repository-name
  // For now, using localhost - will auto-update to GitHub Pages URL when deployed
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' 
      ? 'https://lostastr0.github.io' // Your GitHub Pages URL
      : 'http://localhost:3000'
  ),
  
  title: "lostastr0 - Computer Science Student Portfolio",
  description: "Portfolio of lostastr0 - Aspiring Computer Science student passionate about software development, cybersecurity, and technology innovation. Explore my projects, journey, and skills.",
  keywords: [
    "Computer Science", 
    "Software Development", 
    "Cybersecurity", 
    "Web Development", 
    "Student Portfolio", 
    "lostastr0",
    "React",
    "Next.js",
    "Python",
    "Tech Student",
    "Programming",
    "Software Engineering"
  ],
  authors: [{ name: "lostastr0" }],
  creator: "lostastr0",
  publisher: "lostastr0",
  
  // Favicon and app icons
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
    other: [
      { url: '/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ]
  },

  // Open Graph metadata for social sharing
  openGraph: {
    title: "lostastr0 - Computer Science Student Portfolio",
    description: "Aspiring Computer Science student passionate about software development, cybersecurity, and technology innovation",
    type: "website",
    locale: "en_US",
    url: process.env.NODE_ENV === 'production' 
      ? 'https://lostastr0.github.io' 
      : 'http://localhost:3000',
    siteName: "lostastr0 Portfolio",
    images: [
      {
        url: "/logo/lostastr0-logo-512.png",
        width: 512,
        height: 512,
        alt: "lostastr0 logo",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "lostastr0 - Computer Science Student Portfolio",
    description: "Aspiring Computer Science student passionate about software development and technology",
    images: ["/logo/lostastr0-logo-512.png"],
    creator: "@lostastr0",
  },

  // Robots and SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional metadata
  category: 'portfolio',
  classification: 'Computer Science Student Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional meta tags for better SEO */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
