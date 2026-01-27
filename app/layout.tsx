import React from "react"
import type { Metadata } from 'next'
import { Geist_Mono, Inter, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SoundProvider } from '@/contexts/sound-context'
import './globals.css'

const _geistMono = Geist_Mono({ subsets: ["latin"] });
const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-inter',
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-dm-sans',
});
const _condensed = { variable: '--font-condensed' }; // Declared the variable here

export const metadata: Metadata = {
  title: 'Foundry - shadcn Component Registry',
  description: 'Outstanding components for your React projects. No extra packages — just one file for each component. Use directly with your fav ShadCN CLI.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}>
        <SoundProvider>
          {children}
        </SoundProvider>
        <Analytics />
      </body>
    </html>
  )
}
