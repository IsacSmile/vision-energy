import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EnquiryModalProvider } from '@/components/modals/EnquiryModalProvider';
import EnquiryModal from '@/components/modals/EnquiryModal';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { getPublishedServices } from '@/lib/data/services';

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
    default: 'Vision Energy International | Lightning Protection, Earthing, Electrical & Equipment Supplier Dubai UAE',
    template: '%s | Vision Energy International UAE',
  },
  description:
    'Leading UAE specialist & authorised supplier of certified lightning protection systems, low-impedance earthing networks, electrical equipment, generator machinery, and heavy equipment support across Dubai, Abu Dhabi, and the UAE. Fully compliant with DEWA, SEWA & Civil Defense.',
  keywords: [
    'Lightning Protection Dubai',
    'Lightning Protection UAE',
    'Earthing Systems Dubai',
    'Earthing and Grounding UAE',
    'Electrical Equipment Supplier Dubai',
    'Electrical Equipment UAE',
    'LED Lights Supplier Dubai UAE',
    'Commercial LED Lighting UAE',
    'Automation Items Dubai UAE',
    'Industrial Sensors & PLC Controls UAE',
    'Controls and Switchgear Accessories Dubai',
    'Electrical Tools Supplier UAE',
    'Laboratory Equipment Supplier Dubai',
    'Laboratory Glassware and Consumables UAE',
    'Safety Equipment & PPE Supplier Dubai',
    'Sports Equipment & Court Accessories UAE',
    'Heavy Equipment Rental Dubai',
    'Heavy Vehicle Rental UAE',
    'Industrial Generator Equipment UAE',
    'Exothermic Welding Dubai',
    'ESE Lightning Protection UAE',
    'DEWA Approved Earthing Materials',
    'Civil Defense Approved Lightning Protection',
    'Soil Resistivity Testing UAE',
    'Cable Management and Cable Trays Dubai',
    'Specialist Engineering Manpower Dubai',
    'Vision Energy International',
  ],
  metadataBase: new URL('https://www.visionenergyme.com'),
  alternates: {
    canonical: 'https://www.visionenergyme.com',
    languages: {
      'en-AE': 'https://www.visionenergyme.com',
      'en': 'https://www.visionenergyme.com',
      'x-default': 'https://www.visionenergyme.com',
    },
  },
  openGraph: {
    title: 'Vision Energy International | Lightning Protection, Earthing & Electrical Equipment Dubai UAE',
    description:
      'Certified engineering solutions in lightning protection, earthing networks, industrial electrical equipment, generators, and heavy equipment support across Dubai and all Emirates.',
    url: 'https://www.visionenergyme.com',
    siteName: 'Vision Energy International',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: 'https://www.visionenergyme.com/images/products-collage-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision Energy International Certified Engineering Supplies Dubai UAE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision Energy International | Lightning Protection, Earthing & Electrical Equipment Dubai UAE',
    description:
      'Certified engineering supplies in lightning protection, earthing networks, industrial electrical equipment, and equipment rental across Dubai and UAE.',
    images: ['https://www.visionenergyme.com/images/products-collage-banner.jpg'],
  },
  other: {
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai, United Arab Emirates',
    'geo.position': '25.2048;55.2708',
    'ICBM': '25.2048, 55.2708',
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
  // Fetch published services for Footer
  const publishedServices = await getPublishedServices();

  // JSON-LD Multi-Type LocalBusiness & Organization Schema for Dubai & UAE
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    name: 'VISION ENERGY INTERNATIONAL',
    alternateName: ['Vision Energy ME', 'Vision Energy International LLC', 'Vision Energy Electrical Trading'],
    url: 'https://www.visionenergyme.com',
    logo: 'https://www.visionenergyme.com/main-logo-vision.png',
    image: 'https://www.visionenergyme.com/images/products-collage-banner.jpg',
    description:
      'Authorised UAE distributor & engineering specialist in lightning protection, low-impedance earthing networks, electrical equipment, generator machinery, and heavy equipment support across Dubai and all Emirates.',
    telephone: '+971 50 123 4567',
    email: 'info@visionenergyme.com',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'RAK Business Centre BC4, Ras Al Khaimah',
      addressLocality: 'Ras Al Khaimah',
      addressRegion: 'United Arab Emirates',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Sharjah' },
      { '@type': 'City', name: 'Ras Al Khaimah' },
      { '@type': 'City', name: 'Ajman' },
      { '@type': 'City', name: 'Fujairah' },
      { '@type': 'City', name: 'Umm Al Quwain' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+971 50 123 4567',
        contactType: 'sales',
        areaServed: 'AE',
        availableLanguage: ['English', 'Arabic'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+971 54 123 4567',
        contactType: 'customer support',
        areaServed: 'AE',
        availableLanguage: ['English', 'Arabic'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vision Energy Core Engineering & Supply Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Lightning Protection Systems',
          description: 'Conventional Faraday cage and Early Streamer Emission (ESE) lightning protection systems compliant with IEC 62305 & NF C 17-102.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Earthing & Grounding Networks',
          description: 'Copper earth rods, exothermic welding, earth enhancement compounds, and soil resistivity testing.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Industrial Electrical Equipment & Cables',
          description: 'Power distribution, switchgear, cable trays, conduits, and circuit protection systems.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Heavy Equipment & Industrial Generator Solutions',
          description: 'Industrial generator equipment, heavy-duty clamps, site equipment support, and machinery solutions across the UAE.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Specialist Engineering Manpower Supply',
          description: 'Certified electrical technicians, earthing specialists, and site installation engineers across Dubai and the UAE.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'LED Lighting & Energy-Efficient Fixtures',
          description: 'High-bay LED lights, floodlights, commercial panels, linear luminaires, and streetlights compliant with UAE energy standards.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Industrial Automation & Controls Switchgear',
          description: 'PLCs, HMIs, variable frequency drives, contactors, circuit breakers, control relays, and switchgear accessories.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Professional Electrical Tools & Testing Instruments',
          description: 'Insulated hand tools, hydraulic crimpers, cable cutters, digital multimeters, and calibrated electrical test equipment.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Laboratory Equipment & Scientific Consumables',
          description: 'Precision analytical balances, laboratory glassware, chemical consumables, and scientific research instrumentation.',
        },
      ],
    },
    foundingDate: '2018',
  };

  // Google Sitelinks Searchbox WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vision Energy International',
    url: 'https://www.visionenergyme.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.visionenergyme.com/products?q={search_term_string}',
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
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yktp18a9bf");
          `}
        </Script>
      </head>
      <body className="bg-white text-[#0F172A] dark:bg-[#050608] dark:text-white flex flex-col min-h-screen antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <EnquiryModalProvider>
            <Header />
            <main className="grow">{children}</main>
            <Footer services={publishedServices} />
            <EnquiryModal />
          </EnquiryModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
