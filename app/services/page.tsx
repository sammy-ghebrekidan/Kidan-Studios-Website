import type { Metadata } from 'next'
import Link from 'next/link'
import { Prompt } from '@/components'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'Clear scope, fixed quotes, no hourly billing. Custom Shopify themes from £3,500.',
}

export default function ServicesPage() {
  return (
    <main>
      <section className="wrap pagehead-lg">
        <p className="eyebrow" style={{ marginBottom: '26px' }}>services &amp; pricing</p>
        <h1 className="h1">what it<br />costs</h1>
        <div className="sechead" style={{ marginTop: '44px', marginBottom: '0' }}>
          <div className="txt">
            <p className="lede-sm">clear scope, fixed quotes, no hourly billing. pick the starting point that matches where your store is now.</p>
          </div>
          <Link className="btn" href="/contact">get a quote</Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(28px,3vw,44px)' }}>
        <dl className="trust">
          <div><dt>quotes are</dt><dd>fixed, not hourly</dd></div>
          <div><dt>you get</dt><dd>full code ownership</dd></div>
          <div><dt>handover includes</dt><dd>docs &amp; a walkthrough</dd></div>
          <div><dt>after launch</dt><dd>30 days of fixes free</dd></div>
        </dl>
      </section>

      <section className="wrap sec" style={{ paddingTop: 'clamp(36px,4vw,60px)' }} aria-labelledby="pricing-title">
        <h2 className="sr" id="pricing-title">Pricing</h2>
        <div className="tiers">
          <article className="tier">
            <span className="badge">audit</span>
            <h3>store audit</h3>
            <p className="desc">a full read on what&apos;s slowing your store down and what&apos;s costing you conversions.</p>
            <p className="price">from £750<small>5 working days</small></p>
            <ul><li>core web vitals &amp; speed report</li><li>cro review of pdp, cart and checkout</li><li>technical seo &amp; theme code review</li><li>prioritised fix list with effort estimates</li><li>60-minute walkthrough call</li></ul>
            <Link className="btn ghost" href="/contact">book an audit</Link>
          </article>
          <article className="tier feat">
            <span className="badge">most projects start here</span>
            <h3>theme build</h3>
            <p className="desc">a custom storefront built on dawn architecture — designed, built and launched.</p>
            <p className="price">from £3,500<small>3–6 weeks</small></p>
            <ul><li>custom theme or dawn customisation</li><li>bespoke sections in liquid</li><li>mobile-first, built for conversion</li><li>app integrations &amp; subscriptions</li><li>analytics, gtm and event tracking</li><li>30 days of post-launch fixes</li></ul>
            <Link className="btn" href="/contact">start a project</Link>
          </article>
          <article className="tier">
            <span className="badge">retainer</span>
            <h3>ongoing partner</h3>
            <p className="desc">a developer on hand for the roadmap, the experiments and the things that break.</p>
            <p className="price">from £900<small>per month, cancel anytime</small></p>
            <ul><li>agreed hours each month</li><li>new sections and features</li><li>cro tests and iteration</li><li>performance monitoring</li><li>priority response on issues</li></ul>
            <Link className="btn ghost" href="/contact">enquire</Link>
          </article>
        </div>
      </section>

      <section className="wrap sec pt0">
        <div className="sechead">
          <div className="txt"><h2 className="h2">how it works</h2><p className="lede-sm">four steps, no handoffs, no account managers.</p></div>
        </div>
        <div className="svcgrid">
          <article className="svccard"><div className="top"><span className="num">01</span><span className="dot" aria-hidden="true"></span></div><h3>call</h3><p className="blurb">30 minutes on your store, your numbers and what&apos;s actually in the way.</p></article>
          <article className="svccard"><div className="top"><span className="num">02</span><span className="dot" aria-hidden="true"></span></div><h3>quote</h3><p className="blurb">a fixed price and a scope document within two working days.</p></article>
          <article className="svccard"><div className="top"><span className="num">03</span><span className="dot" aria-hidden="true"></span></div><h3>build</h3><p className="blurb">weekly updates on a staging theme you can click through yourself.</p></article>
        </div>
      </section>

      <section className="wrap sec pt0" aria-labelledby="faq-title">
        <div className="sechead"><div className="txt"><h2 className="h2" id="faq-title">questions</h2><p className="lede-sm">the things brands ask before getting in touch.</p></div></div>
        <div className="faq">
          <details open><summary>do you work with shopify plus?</summary><p>Yes. Plus builds usually involve more app integration and checkout extensibility work, so they&apos;re quoted individually — but the process and the fixed-price approach are the same.</p></details>
          <details><summary>can you work with my existing theme?</summary><p>Usually. If the theme is well-built, customising it is faster and cheaper than starting over. If it&apos;s been through several developers and the code is fighting itself, I&apos;ll tell you that honestly — a rebuild sometimes costs less than untangling it.</p></details>
          <details><summary>who owns the code?</summary><p>You do. Everything is built in your Shopify admin on a theme you own, with no proprietary frameworks or licences tied to me. You can hand it to another developer at any point.</p></details>
          <details><summary>how do payments work?</summary><p>50% to book the slot, 50% on launch. Retainers are billed monthly in advance and can be cancelled with 30 days&apos; notice.</p></details>
          <details><summary>what do you need from me to start?</summary><p>Store access, your brand assets, and someone who can make decisions. The less time a project spends waiting on approvals, the cheaper it gets for you.</p></details>
        </div>
      </section>

      <Prompt heading="not sure which one you need?" subtext="describe the store and the problem. i'll tell you which route makes sense — including if that's none of them." />
    </main>
  )
}
