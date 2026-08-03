import type { Metadata } from 'next'
import Link from 'next/link'
import { Marquee, WorkRow } from '@/components'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Shopify builds for brands that sell something they care about.',
}

const coffeeImages = [
  { src: '/img-cafe-counter.jpg', alt: 'Kidan Coffee Shopify storefront', width: 1845, height: 1887 },
  { src: '/img-cafe-room.jpg', alt: '', width: 1900, height: 1520 },
  { src: '/img-cafe-team.jpg', alt: '', width: 1476, height: 1437 },
  { src: '/img-cafe-entrance.jpg', alt: '', width: 1536, height: 2049 },
]

const cyclesImages = [
  { src: '/img-eco-wide.jpg', alt: 'Eco Cycles Shopify storefront', width: 2200, height: 1100 },
  { src: '/img-eco-bike.jpg', alt: '', width: 1510, height: 1359 },
  { src: '/img-eco-cta.jpg', alt: '', width: 1510, height: 574 },
  { src: '/img-eco-rider.jpg', alt: '', width: 1268, height: 1359 },
]

export default function WorkPage() {
  return (
    <main>
      <section className="wrap pagehead-lg">
        <h1 className="h1">selected<br />work</h1>
        <div className="sechead" style={{ marginTop: '44px', marginBottom: '0' }}>
          <div className="txt">
            <p className="lede-sm">two shopify builds — one live brand, one concept store. both built on clean liquid, both built to convert.</p>
          </div>
          <Link className="btn" href="/contact">start a project</Link>
        </div>
      </section>
      <section className="wrap sec pt0">
        <div className="workrows" style={{ marginTop: 'clamp(34px,4vw,54px)' }}>
          <WorkRow project="coffee" index="01" title="kidan coffee" description="a shopify storefront for a speciality coffee roaster — custom dawn theme, origin-led product pages and a frontend built to convert." tags={['shopify', 'custom theme', 'liquid', 'cro', 'seo']} images={coffeeImages} linkGo="proj-coffee" headingLevel="h2" />
          <WorkRow project="cycles" index="02" title="eco cycles" description="a storefront for a uk urban cycling brand — custom sections, featured collections and customer reviews, built fast and stable." tags={['shopify', 'custom sections', 'collections', 'reviews', 'performance']} images={cyclesImages} linkGo="proj-cycles" headingLevel="h2" />
        </div>
      </section>
      <Marquee />
    </main>
  )
}
