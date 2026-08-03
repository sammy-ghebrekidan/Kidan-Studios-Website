import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Kidan Studios is a Shopify studio based in London. I build stores that are fast, clean and actually work.',
}

export default function AboutPage() {
  return (
    <main>
      <section className="wrap pagehead-lg">
        <p className="eyebrow hero-eyebrow">shopify studio · london</p>
        <h1 className="h1">about</h1>
        <p className="lede" style={{ marginTop: '44px', fontSize: 'clamp(19px,2vw,26px)', color: 'var(--fg)' }}>
          kidan studios is a shopify studio based in london. i build stores that are fast, clean and actually work.
        </p>
      </section>
      <section className="wrap" style={{ paddingBottom: 'clamp(14px,1.6vw,22px)' }}>
        <div className="band">
          <img width="1900" height="1520" decoding="async" loading="lazy" src="/img-cafe-room.jpg" alt="Independent cafe counter" />
          <span className="cap">london, uk</span>
        </div>
      </section>
      <section className="wrap sec">
        <div className="svc">
          <h4>services</h4>
          <div style={{ maxWidth: '70ch' }}>
            <p className="body" style={{ marginBottom: '18px' }}>i work with brands directly to build and improve their shopify stores — from custom themes to performance fixes to full builds from scratch.</p>
            <p className="body" style={{ marginBottom: '18px' }}>every build gets the same care — clean liquid code, fast load times, stores that are easy to maintain and don&apos;t break when you update them.</p>
            <p className="body">and when a project needs more than shopify&apos;s editor, i go fullstack — javascript, react and node — so nothing is off the table.</p>
          </div>
        </div>
        <div className="svc svc-last">
          <h4>process</h4>
          <div style={{ maxWidth: '70ch' }}>
            <p className="body" style={{ marginBottom: '18px' }}>straightforward by design — no fluff, no handoffs, just good work delivered on time.</p>
            <p className="body" style={{ marginBottom: '18px' }}>every project starts with understanding what you actually need — not just what you asked for. then it&apos;s built cleanly, tested properly, and handed over so you can run it yourself.</p>
            <p className="body">the stack: shopify&apos;s liquid system, dawn theme architecture and custom sections — with javascript or react where a project calls for it.</p>
          </div>
        </div>
      </section>
      <section className="wrap sec" style={{ paddingBottom: 'clamp(56px,6vw,88px)' }}>
        <h2 className="h2" style={{ marginBottom: '16px' }}>got a project?</h2>
        <p className="lede-sm" style={{ marginBottom: '34px' }}>send a message and you&apos;ll hear back within 24 hours.</p>
        <Link className="btn" href="/contact">start a project →</Link>
      </section>
    </main>
  )
}
