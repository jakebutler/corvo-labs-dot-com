import { Space_Grotesk } from 'next/font/google'

// Using Space Grotesk as a similar geometric sans-serif to Cabinet Grotesk
// To use actual Cabinet Grotesk, download font files from https://www.fontshare.com/fonts/cabinet-grotesk
// and place them in src/app/fonts/, then switch back to localFont configuration
export const cabinetGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
})


