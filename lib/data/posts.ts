import type { BlogPost } from '@/lib/types'

export type { BlogPost }

export const posts: Record<string, BlogPost> = {
  'shopify-specialty-coffee': {
    slug: 'shopify-specialty-coffee',
    title: 'Shopify & E-commerce for Specialty Coffee: Building a Website That Converts',
    standfirst: 'The UK specialty coffee scene is thriving — and the best roasters are building Shopify stores that educate, inspire, and convert curious visitors into loyal subscribers.',
    category: 'Tips & Tutorials',
    date: '2026-06-16',
    dateFormatted: 'Jun 16, 2026',
    readTime: '7 min read',
    image: { src: '/img-cafe-blog-a.jpg', alt: 'Speciality coffee bar', width: 1900, height: 1822 },
    relatedSlug: 'london-coffee-festival-2026',
    bodyHtml: `
      <p>The UK specialty coffee scene is one of the most exciting in the world. From micro-roasters in East London to direct-trade pioneers in Edinburgh and Bristol, the quality, craft, and passion in this industry is genuinely remarkable. And increasingly, that same quality is showing up online.</p>
      <h2 id="the-specialty-coffee-customer-is-an-opportunity-not-a-challenge">The specialty coffee customer is an opportunity, not a challenge</h2>
      <p>The specialty coffee buyer is one of the most engaged customers in e-commerce. They research. They read tasting notes. They want to know the farm, the process, the altitude. That level of intent is a CRO advantage most categories don't get.</p>
      <h2 id="1-product-pages-built-to-convert">1. Product pages built to convert</h2>
      <p>The roasters with the strongest conversion rates include rich origin storytelling, process notes that educate as well as describe, roast dates that signal freshness, and brew guides that reduce purchasing friction. Every element of the page works toward the same goal: giving a curious customer the confidence to buy.</p>
      <h2 id="2-subscriptions-as-an-e-commerce-growth-engine">2. Subscriptions as an e-commerce growth engine</h2>
      <p>The best subscription setups lead with genuine value: fresh coffee roasted to order, delivered on your schedule, with the flexibility to pause, skip, or adjust. The subscribe option is the default, not the alternative.</p>
      <h2 id="3-homepage-design-that-earns-the-next-click">3. Homepage design that earns the next click</h2>
      <p>The most effective homepages lead with a specific, grounded headline, a single clear primary CTA, and social proof placed early enough to matter. These aren't aesthetic choices — they're conversion decisions.</p>
      <h2 id="4-mobile-first-shopify-development">4. Mobile-first Shopify development</h2>
      <p>With 60–75% of UK coffee store traffic coming from mobile, the mobile experience is the primary e-commerce experience. Faster mobile load times, larger tap targets and streamlined checkout flows all move the conversion rate in the right direction.</p>
      <h2 id="5-brand-identity-as-a-conversion-tool">5. Brand identity as a conversion tool</h2>
      <p>In CRO, trust is the most underrated conversion factor. It's built through the quality of the writing, the authenticity of the brand story, the depth of the sourcing narrative. Every page of a Shopify store is either building or eroding that trust.</p>
      <p><em>Kidan Studios builds Shopify stores for UK specialty coffee brands and independent retailers. If you're ready to build an online store that does your coffee justice, get in touch.</em></p>
      <div class="artcta"><p>building a shopify store for a coffee brand?</p><p class="sub">i build stores for speciality roasters and independent retail — fixed quotes, no retainer talk.</p><a class="btn" href="/contact">start a project</a></div>
    `,
  },
  'london-coffee-festival-2026': {
    slug: 'london-coffee-festival-2026',
    title: 'London Coffee Festival 2026: What It Revealed About E-commerce, Shopify & Digital Growth in Specialty Coffee',
    standfirst: 'London Coffee Festival 2026 was more than an industry event — it was a signal of where specialty coffee is heading digitally.',
    category: 'Industry Insights',
    date: '2026-06-17',
    dateFormatted: 'Jun 17, 2026',
    readTime: '8 min read',
    image: { src: '/img-cafe-blog-b.jpg', alt: 'Busy cafe floor', width: 1900, height: 1847 },
    relatedSlug: 'shopify-specialty-coffee',
    bodyHtml: `
      <h2 id="why-london-coffee-festival-matters-for-e-commerce-strategy">Why London Coffee Festival matters for e-commerce strategy</h2>
      <p>While coffee innovation remains central, a clear shift is emerging: the biggest growth opportunities are now happening online, not in-store. For specialty coffee and DTC brands, the festival highlights how Shopify, e-commerce strategy, and digital optimisation are becoming core business drivers.</p>
      <h2 id="the-digital-shift-in-specialty-coffee">The digital shift in specialty coffee</h2>
      <p>The industry is highly advanced in product, but still evolving in digital execution. The next phase of growth is being defined by Shopify store performance, conversion rate optimisation, subscription systems, mobile-first UX, and digital analytics.</p>
      <h2 id="subscription-models-are-everywhere-but-not-fully-optimised">Subscription models are everywhere, but not fully optimised</h2>
      <p>Stronger subscription experiences tend to include clear positioning at product level, simple onboarding flows, flexible customer controls, and strong post-purchase engagement. Weaker implementations rely on subscriptions as a secondary option rather than a core part of the buying journey.</p>
      <h2 id="mobile-first-behaviour-is-shaping-store-performance">Mobile-first behaviour is shaping store performance</h2>
      <p>Discovery via Instagram and TikTok, browsing on mobile, quick decision-making journeys. Mobile UX is no longer a design consideration — it is a conversion requirement.</p>
      <h2 id="cro-is-becoming-a-competitive-advantage">CRO is becoming a competitive advantage</h2>
      <p>As acquisition costs rise, CRO is becoming one of the most important growth levers in Shopify e-commerce. Because customers are highly engaged but selective, small improvements in structure and clarity can significantly impact conversion rates.</p>
      <h2 id="e-commerce-maturity-is-raising-the-bar-for-shopify-development">E-commerce maturity is raising the bar for Shopify development</h2>
      <p>Modern Shopify stores now require fast storefront performance under real traffic, structured product architecture, modular theme systems using sections and Liquid, clean app integration, and Core Web Vitals optimisation. Shopify is no longer just a platform for building websites — it is infrastructure for commerce performance.</p>
      <p><em>Kidan Studios builds Shopify stores for specialty coffee brands and DTC businesses. If you're ready to turn your digital presence into a growth engine, get in touch.</em></p>
      <div class="artcta"><p>building a shopify store for a coffee brand?</p><p class="sub">i build stores for speciality roasters and independent retail — fixed quotes, no retainer talk.</p><a class="btn" href="/contact">start a project</a></div>
    `,
  },
}
