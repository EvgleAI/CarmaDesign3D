import type { Metadata, Viewport } from 'next';
import { roboto, robotoCondensed } from '@/lib/fonts';
import { SITE } from '@/lib/site';
import { organizationJsonLd } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { ConsentBanner } from '@/components/layout/ConsentBanner';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CartDrawer } from '@/components/shop/CartDrawer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.owner }],
  generator: 'Next.js',
  keywords: [
    '3D-Druck',
    'Möbelskulptur',
    'Raumgestaltung',
    'Manufaktur',
    'Affalterbach',
    'Stuttgart',
  ],
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${roboto.variable} ${robotoCondensed.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <SkipLink />
        <Header />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <Footer />

        <CartDrawer />
        <ConsentBanner />
        <GoogleAnalytics />

        <script
          type="application/ld+json"
          // JSON-LD muss als String injiziert werden.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
