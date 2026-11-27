import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyContactWidget from '@/components/layout/StickyContactWidget';
import { EnquiryModalProvider } from '@/components/modals/EnquiryModalProvider';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import AnalyticsAndConsent from '@/components/common/AnalyticsAndConsent';
import { getPublishedServices } from '@/lib/data/services';
import { COMPANY_FACTS, ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from '@/lib/seo/company';
import { SOCIAL_LINKS } from '@/config/social';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050608' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Vision Energy | Lightning, Earthing & Technical Supply UAE',
    template: '%s',
  },
  description:
    'Vision Energy International: lightning protection, earthing systems, surge protection, gym & laboratory equipment across Dubai, Abu Dhabi, RAK & Qatar.',
  keywords: [
    'Lightning Protection Dubai',
    'Lightning Protection Abu Dhabi',
    'Lightning Protection Ras Al Khaimah',
    'Lightning Protection UAE',
    'Lightning Protection Qatar',
    'Earthing Systems UAE',
    'Earthing Contractor Dubai',
    'Laboratory Equipment Supplier UAE',
    'Gym Equipment Supplier UAE',
    'DEWA Approved Earthing Materials',
    'Vision Energy International',
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Vision Energy | Lightning, Earthing & Technical Supply UAE',
    description:
      'Certified lightning protection, earthing networks, gym & laboratory equipment across Dubai, Abu Dhabi, Ras Al Khaimah, UAE & Qatar.',
    url: SITE_URL,
    siteName: 'Vision Energy International',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/products-collage-banner.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vision Energy International UAE Engineering & Technical Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision Energy | Lightning, Earthing & Technical Supply UAE',
    description:
      'Lightning protection, earthing systems, gym & laboratory equipment across Dubai, Abu Dhabi, RAK, UAE & Qatar.',
    images: [`${SITE_URL}/images/products-collage-banner.jpg`],
  },
  other: {
    'geo.region': 'AE-RK',
    'geo.placename': 'Al Nakheel, Ras Al Khaimah, United Arab Emirates',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch minimal service navigation data for Footer (exclude large content blobs/base64 assets)
  const publishedServices = (await getPublishedServices()).map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
  }));

  const sameAs = Object.values(SOCIAL_LINKS).filter((u) => Boolean(u && u.trim()));

  // Linked JSON-LD Organization & ProfessionalService Schema (RAK Head Office verified NAP)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORGANIZATION_ID,
    name: COMPANY_FACTS.legalName,
    alternateName: [COMPANY_FACTS.name, 'Vision Energy ME'],
    url: SITE_URL,
    logo: `${SITE_URL}/main-logo-vision.png`,
    image: `${SITE_URL}/images/products-collage-banner.jpg`,
    description:
      'Established 2018 with more than 160 projects completed. Specialist supplier and engineering partner for lightning protection systems, earthing networks, surge protection, commercial gym equipment, and laboratory equipment across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar.',
    telephone: COMPANY_FACTS.phones.landline,
    email: COMPANY_FACTS.email,
    foundingDate: COMPANY_FACTS.established,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_FACTS.headOffice.streetAddress,
      postOfficeBoxNumber: COMPANY_FACTS.headOffice.poBox,
      addressLocality: COMPANY_FACTS.headOffice.locality,
      addressRegion: COMPANY_FACTS.headOffice.region,
      addressCountry: COMPANY_FACTS.headOffice.countryCode,
    },
    areaServed: COMPANY_FACTS.areaServedSchema,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_FACTS.phones.landline,
        contactType: 'office',
        areaServed: ['AE', 'QA'],
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_FACTS.phones.mobile,
        contactType: 'sales',
        areaServed: ['AE', 'QA'],
        availableLanguage: ['English'],
      },
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  // Linked WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: COMPANY_FACTS.name,
    url: SITE_URL,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={`${poppins.variable} light`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vision_theme');if(t==='dark'){document.documentElement.classList.remove('light');document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-white text-[#0F172A] dark:bg-[#050608] dark:text-white flex flex-col min-h-screen antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <EnquiryModalProvider>
            <Header />
            <main className="grow">{children}</main>
            <Footer services={publishedServices} />
            <StickyContactWidget />
            <AnalyticsAndConsent />
          </EnquiryModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
