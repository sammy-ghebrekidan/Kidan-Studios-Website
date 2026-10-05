import type { Metadata } from 'next'
import { Funnel_Sans, Inter_Tight } from 'next/font/google'
import './globals.css'
import { Header, Footer, SvgSprite, GsapProvider } from '@/components'

const funnelSans = Funnel_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-funnel-sans',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kidanstudios.co.uk'),
  title: {
    default: 'Kidan Studios — Shopify Development Studio, London',
    template: '%s | Kidan Studios',
  },
  description:
    'London-based Shopify development studio building custom themes, faster storefronts and higher-converting product pages for e-commerce brands.',
  keywords: ['Shopify developer London', 'Shopify theme developer', 'custom Shopify themes', 'Shopify performance optimisation', 'e-commerce developer UK', 'Shopify CRO', 'Liquid developer'],
  authors: [{ name: 'Kidan Studios', url: 'https://kidanstudios.co.uk' }],
  creator: 'Kidan Studios',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: 'Kidan Studios',
    title: 'Kidan Studios — Shopify Development Studio, London',
    description: 'Custom Shopify themes, performance optimisation and CRO for e-commerce brands.',
    images: [{ url: '/img-cafe-wide.jpg', width: 1900, height: 1165, alt: 'Kidan Studios — Shopify Development Studio' }],
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image', creator: '@kidanstudios' },
  alternates: { canonical: 'https://kidanstudios.co.uk' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${funnelSans.variable} ${interTight.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Kidan Studios',
              description:
                'Shopify development studio specialising in custom themes, performance optimisation and CRO.',
              url: 'https://kidanstudios.co.uk/',
              email: 'hello@kidanstudios.co.uk',
              address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
              areaServed: 'GB',
              priceRange: '££',
              knowsAbout: ['Shopify', 'Liquid', 'Shopify Dawn theme', 'Conversion rate optimisation', 'Core Web Vitals'],
            }),
          }}
        />
      </head>
      <body>
        <div id="stage">
          <a className="skip" href="#main">skip to content</a>
          <Header />
          <div id="main" tabIndex={-1}></div>
          <SvgSprite />
          {children}
          <Footer />
        </div>
        <GsapProvider />
      </body>
    </html>
  )
}
