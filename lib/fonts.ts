/**
 * Self-hosted Schriften via `next/font/google`.
 * Brief: keine externen Google-Fonts-Requests — `next/font` lädt zur Build-Zeit
 * und bedient lokal. CSS-Variablen werden auf `<html>` gesetzt.
 */
import { Roboto, Roboto_Condensed } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-display',
  display: 'swap',
});
