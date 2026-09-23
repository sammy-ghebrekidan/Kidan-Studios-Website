/**
 * Kidan Studios — Sanity Content Migration Script
 *
 * Uploads all images and content from the existing TypeScript data files
 * to your Sanity project. Safe to run multiple times — checks for existing
 * documents before creating new ones.
 *
 * Usage:
 *   node scripts/migrate-to-sanity.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, '..', 'public')

const PROJECT_ID = 'ghzo35gh'
const DATASET = 'production'

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ─── Helpers ────────────────────────────────────────────────────────────────

async function uploadImage(filename) {
  const filePath = path.join(PUBLIC_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  Image not found: ${filename}`)
    return null
  }
  const buffer = fs.readFileSync(filePath)
  console.log(`  📤 Uploading ${filename}...`)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  })
  console.log(`  ✅ Uploaded ${filename} → ${asset._id}`)
  return asset
}

function imageRef(asset, alt = '') {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  }
}

function textToPortableText(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `block_${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `span_${i}`, text, marks: [] }],
  }))
}

async function docExists(type, slug) {
  const result = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]._id`,
    { type, slug }
  )
  return result || null
}

// ─── Projects ───────────────────────────────────────────────────────────────

async function migrateProjects() {
  console.log('\n🗂️  Migrating projects...')

  // ── Kidan Coffee ──────────────────────────────────────────────────────────
  console.log('\n  📦 Kidan Coffee')
  const existingCoffee = await docExists('project', 'kidan-coffee')
  if (existingCoffee) {
    console.log('  ⏭️  Already exists — skipping')
  } else {
    const [
      coffeeHero,
      coffeeEntrance,
      coffeeTeam,
      coffeePastries,
      coffeeRoom,
      coffeeCounter,
    ] = await Promise.all([
      uploadImage('img-cafe-wide.jpg'),
      uploadImage('img-cafe-entrance.jpg'),
      uploadImage('img-cafe-team.jpg'),
      uploadImage('img-cafe-pastries.jpg'),
      uploadImage('img-cafe-room.jpg'),
      uploadImage('img-cafe-counter.jpg'),
    ])

    const coffeeDoc = {
      _type: 'project',
      _id: 'project-kidan-coffee',
      title: 'Kidan Coffee',
      slug: { _type: 'slug', current: 'kidan-coffee' },
      description: 'A shopify storefront for a speciality coffee roaster — custom dawn theme, origin-led product pages and a frontend built to convert.',
      heroImage: imageRef(coffeeHero, 'Kidan Coffee storefront'),
      year: '2026',
      role: 'Design & Development',
      status: 'Self-initiated build',
      brief: textToPortableText([
        'Speciality coffee buyers behave differently from most e-commerce customers. They research. They read tasting notes. They want to know the farm, the process, the altitude — and they will happily spend ten minutes on a product page before deciding.',
        'Most roaster storefronts fight that behaviour with a standard e-commerce template: a photo, a price, a buy button. The brief here was to build the opposite — a store that rewards a customer who wants to read.',
      ]),
      approach: textToPortableText([
        "Built on Dawn's architecture rather than a page builder, so the theme stays fast and stays maintainable. Every piece of storytelling is a section the client can reorder without touching code.",
        'The product page was the priority. Origin, process and roast date sit above the fold alongside the variant selector, so the information that builds confidence arrives before the ask.',
      ]),
      builtList: [
        {
          _key: 'col1',
          items: ['custom dawn theme', 'origin & process content sections', 'roast date and freshness display', 'brew guide accordion', 'subscribe-first variant selector'],
        },
        {
          _key: 'col2',
          items: ['collection filtering by roast profile', 'cart drawer with free-shipping threshold', 'structured data for products', 'image optimisation pipeline', 'gtm and event tracking'],
        },
      ],
      shots: [
        { _key: 'shot1', image: imageRef(coffeeEntrance), alt: 'origin storytelling sits alongside the variant selector, not below the fold', caption: 'origin storytelling sits alongside the variant selector, not below the fold' },
        { _key: 'shot2', image: imageRef(coffeeTeam), alt: 'collection filtering by roast profile rather than generic tags', caption: 'collection filtering by roast profile rather than generic tags' },
        { _key: 'shot3', image: imageRef(coffeePastries), alt: 'brew guides reduce the "will I get this right?" objection before checkout', caption: 'brew guides reduce the "will I get this right?" objection before checkout' },
        { _key: 'shot4', image: imageRef(coffeeRoom), alt: 'cart drawer surfaces the free-shipping threshold to lift average order value', caption: 'cart drawer surfaces the free-shipping threshold to lift average order value' },
        { _key: 'shot5', image: imageRef(coffeeCounter), alt: 'subscribe option presented as the default, not the alternative', caption: 'subscribe option presented as the default, not the alternative' },
      ],
    }

    await client.createOrReplace(coffeeDoc)
    console.log('  ✅ Kidan Coffee created')
  }

  // ── Eco Cycles ────────────────────────────────────────────────────────────
  console.log('\n  📦 Eco Cycles')
  const existingCycles = await docExists('project', 'eco-cycles')
  if (existingCycles) {
    console.log('  ⏭️  Already exists — skipping')
  } else {
    const [
      ecoHero,
      ecoRider,
      ecoBike,
      ecoCta,
      ecoNav,
      ecoWide,
    ] = await Promise.all([
      uploadImage('img-eco-hero.jpg'),
      uploadImage('img-eco-rider.jpg'),
      uploadImage('img-eco-bike.jpg'),
      uploadImage('img-eco-cta.jpg'),
      uploadImage('img-eco-nav.jpg'),
      uploadImage('img-eco-wide.jpg'),
    ])

    const cyclesDoc = {
      _type: 'project',
      _id: 'project-eco-cycles',
      title: 'Eco Cycles',
      slug: { _type: 'slug', current: 'eco-cycles' },
      description: 'A storefront for a uk urban cycling brand — custom sections, featured collections and customer reviews, built fast and stable.',
      heroImage: imageRef(ecoHero, 'Eco Cycles storefront'),
      year: '2024',
      role: 'Shopify Development',
      status: 'Self-initiated build',
      brief: textToPortableText([
        "Bikes are a considered purchase with a long decision window. Customers compare specs, read reviews, come back three times, then buy. A storefront that only shows a hero image and a grid of products loses them on the second visit.",
        "The brief was a store that holds up to repeat browsing — clear specifications, visible social proof, and collections that make sense to someone who doesn't yet know which bike they want.",
      ]),
      approach: textToPortableText([
        'Collections do the qualifying. Rather than one flat product grid, the storefront routes people by use case — commuter, weekend, cargo — so a visitor narrows down before they ever open a product page.',
        'Reviews sit on the collection and product templates rather than being buried in a tab, because for a purchase at this price point social proof is the conversion lever.',
      ]),
      builtList: [
        {
          _key: 'col1',
          items: ['custom homepage sections', 'featured collection blocks', 'customer review integration', 'specification comparison table', 'sticky add-to-cart on mobile'],
        },
        {
          _key: 'col2',
          items: ['use-case collection routing', 'image lazy-loading and sizing', 'accessibility pass on forms and nav', 'core web vitals optimisation', 'analytics and event tracking'],
        },
      ],
      shots: [
        { _key: 'shot1', image: imageRef(ecoRider), alt: 'collections route by use case', caption: 'collections route by use case, so browsing narrows before the product page' },
        { _key: 'shot2', image: imageRef(ecoBike), alt: 'reviews surface on collection cards', caption: 'reviews surface on collection cards, not buried behind a tab' },
        { _key: 'shot3', image: imageRef(ecoCta), alt: 'specification tables', caption: 'specification tables make cross-model comparison possible without leaving the page' },
        { _key: 'shot4', image: imageRef(ecoNav), alt: 'sticky add-to-cart', caption: 'sticky add-to-cart keeps the action reachable through a long spec scroll' },
      ],
      // Related project preview images (coffee previews on cycles page)
      otherProject: {
        project: { _type: 'reference', _ref: 'project-kidan-coffee' },
        images: [
          imageRef(ecoWide, 'Eco Cycles Shopify storefront'),
        ],
      },
    }

    await client.createOrReplace(cyclesDoc)
    console.log('  ✅ Eco Cycles created')
  }

  // ── Patch cross-references now both docs exist ────────────────────────────
  console.log('\n  🔗 Patching cross-references...')

  // Upload coffee counter for eco cycles related project section
  const [cafeCounter, cafeRoom, cafeTeam, cafeEntrance] = await Promise.all([
    uploadImage('img-cafe-counter.jpg'),
    uploadImage('img-cafe-room.jpg'),
    uploadImage('img-cafe-team.jpg'),
    uploadImage('img-cafe-entrance.jpg'),
  ])

  const ecoWideAsset = await uploadImage('img-eco-wide.jpg')
  const ecoBikeAsset = await uploadImage('img-eco-bike.jpg')
  const ecoCtaAsset  = await uploadImage('img-eco-cta.jpg')
  const ecoRiderAsset = await uploadImage('img-eco-rider.jpg')

  await client
    .patch('project-kidan-coffee')
    .set({
      otherProject: {
        project: { _type: 'reference', _ref: 'project-eco-cycles' },
        images: [
          imageRef(cafeCounter, 'Kidan Coffee Shopify storefront'),
          imageRef(cafeRoom, ''),
          imageRef(cafeTeam, ''),
          imageRef(cafeEntrance, ''),
        ],
      },
    })
    .commit()

  await client
    .patch('project-eco-cycles')
    .set({
      otherProject: {
        project: { _type: 'reference', _ref: 'project-kidan-coffee' },
        images: [
          imageRef(ecoWideAsset, 'Eco Cycles Shopify storefront'),
          imageRef(ecoBikeAsset, ''),
          imageRef(ecoCtaAsset, ''),
          imageRef(ecoRiderAsset, ''),
        ],
      },
    })
    .commit()

  console.log('  ✅ Cross-references patched')
}

// ─── Blog Posts ─────────────────────────────────────────────────────────────

async function migrateBlogPosts() {
  console.log('\n📝 Migrating blog posts...')

  // Upload images first
  const [blogImageA, blogImageB] = await Promise.all([
    uploadImage('img-cafe-blog-a.jpg'),
    uploadImage('img-cafe-blog-b.jpg'),
  ])

  // ── Create both posts WITHOUT cross-references first ──────────────────────
  console.log('\n  📄 Specialty Coffee post')
  const existingPost1 = await docExists('blogPost', 'shopify-specialty-coffee')
  if (existingPost1) {
    console.log('  ⏭️  Already exists — skipping creation')
  } else {
    await client.createOrReplace({
      _type: 'blogPost',
      _id: 'post-shopify-specialty-coffee',
      title: 'Shopify & E-commerce for Specialty Coffee: Building a Website That Converts',
      slug: { _type: 'slug', current: 'shopify-specialty-coffee' },
      standfirst: 'The UK specialty coffee scene is thriving — and the best roasters are building Shopify stores that educate, inspire, and convert curious visitors into loyal subscribers.',
      category: 'Tips & Tutorials',
      publishedAt: '2026-06-16',
      readTime: '7 min read',
      image: imageRef(blogImageA, 'Speciality coffee bar'),
      body: [
        { _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'The UK specialty coffee scene is one of the most exciting in the world. From micro-roasters in East London to direct-trade pioneers in Edinburgh and Bristol, the quality, craft, and passion in this industry is genuinely remarkable. And increasingly, that same quality is showing up online.', marks: [] }] },
        { _type: 'block', _key: 'b2', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'The specialty coffee customer is an opportunity, not a challenge', marks: [] }] },
        { _type: 'block', _key: 'b3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: "The specialty coffee buyer is one of the most engaged customers in e-commerce. They research. They read tasting notes. They want to know the farm, the process, the altitude. That level of intent is a CRO advantage most categories don't get.", marks: [] }] },
        { _type: 'block', _key: 'b4', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's4', text: '1. Product pages built to convert', marks: [] }] },
        { _type: 'block', _key: 'b5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: 'The roasters with the strongest conversion rates include rich origin storytelling, process notes that educate as well as describe, roast dates that signal freshness, and brew guides that reduce purchasing friction. Every element of the page works toward the same goal: giving a curious customer the confidence to buy.', marks: [] }] },
        { _type: 'block', _key: 'b6', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's6', text: '2. Subscriptions as an e-commerce growth engine', marks: [] }] },
        { _type: 'block', _key: 'b7', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's7', text: 'The best subscription setups lead with genuine value: fresh coffee roasted to order, delivered on your schedule, with the flexibility to pause, skip, or adjust. The subscribe option is the default, not the alternative.', marks: [] }] },
        { _type: 'block', _key: 'b8', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's8', text: '3. Homepage design that earns the next click', marks: [] }] },
        { _type: 'block', _key: 'b9', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's9', text: "The most effective homepages lead with a specific, grounded headline, a single clear primary CTA, and social proof placed early enough to matter. These aren't aesthetic choices — they're conversion decisions.", marks: [] }] },
        { _type: 'block', _key: 'b10', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's10', text: '4. Mobile-first Shopify development', marks: [] }] },
        { _type: 'block', _key: 'b11', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's11', text: 'With 60–75% of UK coffee store traffic coming from mobile, the mobile experience is the primary e-commerce experience. Faster mobile load times, larger tap targets and streamlined checkout flows all move the conversion rate in the right direction.', marks: [] }] },
        { _type: 'block', _key: 'b12', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's12', text: '5. Brand identity as a conversion tool', marks: [] }] },
        { _type: 'block', _key: 'b13', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's13', text: "In CRO, trust is the most underrated conversion factor. It's built through the quality of the writing, the authenticity of the brand story, the depth of the sourcing narrative. Every page of a Shopify store is either building or eroding that trust.", marks: [] }] },
      ],
    })
    console.log('  ✅ Specialty Coffee post created')
  }

  console.log('\n  📄 London Coffee Festival post')
  const existingPost2 = await docExists('blogPost', 'london-coffee-festival-2026')
  if (existingPost2) {
    console.log('  ⏭️  Already exists — skipping creation')
  } else {
    await client.createOrReplace({
      _type: 'blogPost',
      _id: 'post-london-coffee-festival-2026',
      title: 'London Coffee Festival 2026: What It Revealed About E-commerce, Shopify & Digital Growth in Specialty Coffee',
      slug: { _type: 'slug', current: 'london-coffee-festival-2026' },
      standfirst: 'London Coffee Festival 2026 was more than an industry event — it was a signal of where specialty coffee is heading digitally.',
      category: 'Industry Insights',
      publishedAt: '2026-06-17',
      readTime: '8 min read',
      image: imageRef(blogImageB, 'Busy cafe floor'),
      body: [
        { _type: 'block', _key: 'b1', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'Why London Coffee Festival matters for e-commerce strategy', marks: [] }] },
        { _type: 'block', _key: 'b2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'While coffee innovation remains central, a clear shift is emerging: the biggest growth opportunities are now happening online, not in-store. For specialty coffee and DTC brands, the festival highlights how Shopify, e-commerce strategy, and digital optimisation are becoming core business drivers.', marks: [] }] },
        { _type: 'block', _key: 'b3', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's3', text: 'The digital shift in specialty coffee', marks: [] }] },
        { _type: 'block', _key: 'b4', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's4', text: 'The industry is highly advanced in product, but still evolving in digital execution. The next phase of growth is being defined by Shopify store performance, conversion rate optimisation, subscription systems, mobile-first UX, and digital analytics.', marks: [] }] },
        { _type: 'block', _key: 'b5', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's5', text: 'Subscription models are everywhere, but not fully optimised', marks: [] }] },
        { _type: 'block', _key: 'b6', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's6', text: 'Stronger subscription experiences tend to include clear positioning at product level, simple onboarding flows, flexible customer controls, and strong post-purchase engagement. Weaker implementations rely on subscriptions as a secondary option rather than a core part of the buying journey.', marks: [] }] },
        { _type: 'block', _key: 'b7', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's7', text: 'Mobile-first behaviour is shaping store performance', marks: [] }] },
        { _type: 'block', _key: 'b8', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's8', text: 'Discovery via Instagram and TikTok, browsing on mobile, quick decision-making journeys. Mobile UX is no longer a design consideration — it is a conversion requirement.', marks: [] }] },
        { _type: 'block', _key: 'b9', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's9', text: 'CRO is becoming a competitive advantage', marks: [] }] },
        { _type: 'block', _key: 'b10', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's10', text: 'As acquisition costs rise, CRO is becoming one of the most important growth levers in Shopify e-commerce. Because customers are highly engaged but selective, small improvements in structure and clarity can significantly impact conversion rates.', marks: [] }] },
        { _type: 'block', _key: 'b11', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's11', text: 'E-commerce maturity is raising the bar for Shopify development', marks: [] }] },
        { _type: 'block', _key: 'b12', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's12', text: 'Modern Shopify stores now require fast storefront performance under real traffic, structured product architecture, modular theme systems using sections and Liquid, clean app integration, and Core Web Vitals optimisation. Shopify is no longer just a platform for building websites — it is infrastructure for commerce performance.', marks: [] }] },
      ],
    })
    console.log('  ✅ London Coffee Festival post created')
  }

  // ── Now patch cross-references (both docs exist) ───────────────────────────
  console.log('\n  🔗 Patching blog post cross-references...')
  await client.patch('post-shopify-specialty-coffee').set({ relatedPost: { _type: 'reference', _ref: 'post-london-coffee-festival-2026' } }).commit()
  await client.patch('post-london-coffee-festival-2026').set({ relatedPost: { _type: 'reference', _ref: 'post-shopify-specialty-coffee' } }).commit()
  console.log('  ✅ Cross-references patched')
}

// ─── Home Page Content ───────────────────────────────────────────────────────

async function migrateHomeContent() {
  console.log('\n🏠 Migrating home page content...')

  const existing = await client.fetch(`*[_type == "homeContent"][0]._id`)
  if (existing) {
    console.log('  ⏭️  Already exists — skipping')
    return
  }

  const homeDoc = {
    _type: 'homeContent',
    _id: 'singleton-home-content',
    title: 'Home Page',
    hero: {
      eyebrow: 'shopify studio · london',
      title: 'Kidan\nStudios',
      lede: 'London-based Shopify development studio specialising in custom Shopify themes and performance optimisation.',
      status: 'available for new projects — august 2026',
      cta: { label: 'start a project', href: '/contact' },
      ctaSecondary: { label: 'see the work', href: '/work' },
    },
    trustBar: [
      { _key: 'tb1', icon: 'i-globe', label: 'based in', value: 'london, uk' },
      { _key: 'tb2', icon: 'i-store', label: 'works with', value: 'shopify & shopify plus' },
      { _key: 'tb3', icon: 'i-bolt', label: 'replies within', value: '24 hours' },
      { _key: 'tb4', icon: 'i-box', label: 'typical build', value: '3–6 weeks' },
    ],
    workSection: {
      title: 'selected work',
      subtitle: 'shopify builds for brands that sell something they care about.',
      cta: { label: 'all projects', href: '/work' },
    },
    servicesSection: {
      title: 'services',
      subtitle: 'three things, done properly — and priced before you commit.',
      cta: { label: 'see pricing', href: '/services' },
    },
    blogSection: {
      title: 'blog',
      subtitle: 'ideas for better shopify stores',
      cta: { label: 'all articles', href: '/blog' },
    },
    closingCta: {
      heading: 'thinking about a rebuild, a migration, or just a store that loads faster?',
      subtext: "tell me what's not working. you'll get an honest read on whether it's worth fixing — no pitch deck, no retainer talk.",
    },
  }

  await client.createOrReplace(homeDoc)
  console.log('  ✅ Home page content created')
}

// ─── Site Settings ───────────────────────────────────────────────────────────

async function migrateSiteSettings() {
  console.log('\n⚙️  Migrating site settings...')

  const existing = await client.fetch(`*[_type == "siteSettings"][0]._id`)
  if (existing) {
    console.log('  ⏭️  Already exists — skipping')
    return
  }

  const settingsDoc = {
    _type: 'siteSettings',
    _id: 'singleton-site-settings',
    title: 'Kidan Studios',
    description: 'London-based Shopify development studio specialising in custom Shopify themes and performance optimisation.',
    siteUrl: 'https://kidanstudios.co.uk',
    ticker: [
      'shopify development',
      'custom themes',
      'performance optimisation',
      'conversion rate optimisation',
      'shopify plus',
      'london',
    ],
    navigation: [
      { _key: 'nav1', label: 'work', href: '/work' },
      { _key: 'nav2', label: 'services', href: '/services' },
      { _key: 'nav3', label: 'about', href: '/about' },
      { _key: 'nav4', label: 'blog', href: '/blog' },
      { _key: 'nav5', label: 'contact', href: '/contact' },
    ],
    socialLinks: {},
  }

  await client.createOrReplace(settingsDoc)
  console.log('  ✅ Site settings created')
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Kidan Studios → Sanity Migration')
  console.log(`   Project: ${PROJECT_ID}`)
  console.log(`   Dataset: ${DATASET}`)
  console.log('─'.repeat(50))

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ SANITY_API_TOKEN is not set.')
    console.error('   Get a token from: https://www.sanity.io/manage')
    console.error('   Project → API → Tokens → Add API token (Editor role)')
    console.error('\n   Then run:')
    console.error('   SANITY_API_TOKEN=your-token node scripts/migrate-to-sanity.mjs\n')
    process.exit(1)
  }

  try {
    await migrateProjects()
    await migrateBlogPosts()
    await migrateHomeContent()
    await migrateSiteSettings()

    console.log('\n' + '─'.repeat(50))
    console.log('✅ Migration complete!')
    console.log('\n   Open Sanity Studio to review: http://localhost:3333')
    console.log('   All documents are in Draft — publish them to make them live.\n')
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message)
    console.error(err)
    process.exit(1)
  }
}

main()
