import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EnquiryModalProvider } from '@/components/modals/EnquiryModalProvider';
import EnquiryModal from '@/components/modals/EnquiryModal';
import { db } from '@/lib/db';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'VISION ENERGY INTERNATIONAL | UAE Electrical, Mechanical & Solar Trading',
    template: '%s | VISION ENERGY INTERNATIONAL',
  },
  description:
    'UAE trading company and authorised distributor specialising in external lightning protection, earthing systems, mechanical fittings, and renewable energy solutions. Serving Abu Dhabi, Dubai, and Ras Al Khaimah.',
  keywords: [
    'Lightning Protection UAE',
    'Earthing Systems Ras Al Khaimah',
    'ESE Lightning Protection Dubai',
    'Exothermic Welding UAE',
    'Electrical Trading Company UAE',
    'Vision Energy International',
  ],
  metadataBase: new URL('https://www.visionenergyme.com'),
  openGraph: {
    title: 'VISION ENERGY INTERNATIONAL - Engineering Product Solutions',
    description:
      'UAE electrical, mechanical and solar product trading company. Priority focus on Lightning Protection and Earthing Networks.',
    url: 'https://www.visionenergyme.com',
    siteName: 'VISION ENERGY INTERNATIONAL',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch published services for Footer
  const publishedServices = await db.service.findMany({
    where: { published: true },
    select: { slug: true, title: true },
    orderBy: { title: 'asc' },
  });

  // JSON-LD Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VISION ENERGY INTERNATIONAL',
    url: 'https://www.visionenergyme.com',
    logo: 'https://www.visionenergyme.com/site-main-logo.png',
    telephone: ['+971 7 204 2763', '+971 54 700 4616'],
    email: 'info@visionenergyme.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'RAK Business Centre BC4, RAK Business Park, P.O Box 17111, Al Nakheel',
      addressLocality: 'Ras Al Khaimah',
      addressRegion: 'RAK',
      addressCountry: 'AE',
    },
    areaServed: ['Abu Dhabi', 'Dubai', 'Ras Al Khaimah', 'United Arab Emirates'],
    foundingDate: '2018',
  };

  return (
    <html lang="en" className={`${poppins.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-[#050608] text-white flex flex-col min-h-screen antialiased">
        <EnquiryModalProvider>
          <Header />
          <main className="grow">{children}</main>
          <Footer services={publishedServices} />
          <EnquiryModal />
        </EnquiryModalProvider>
      </body>
    </html>
  );
}
