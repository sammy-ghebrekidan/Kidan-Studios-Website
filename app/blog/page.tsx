import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ideas for better Shopify stores — performance, CRO, and what actually moves revenue.',
}

export default function BlogPage() {
  return (
    <main>
      <section className="wrap pagehead">
        <h1 className="h1">blog</h1>
        <div className="sechead" style={{ marginTop: '44px', marginBottom: '34px' }}>
          <div className="txt">
            <p className="lede-sm">ideas for better shopify stores — performance, cro, and what actually moves revenue.</p>
          </div>
          <Link className="btn" href="/contact">start a project</Link>
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 'clamp(30px,3vw,44px)' }}>
        <div className="bloggrid">
          <Link className="pcard" href="/blog/shopify-specialty-coffee">
            <div className="pthumb"><img width="1900" height="1822" decoding="async" loading="lazy" src="/img-cafe-blog-a.jpg" alt="" /></div>
            <div className="pbody">
              <div className="pmeta"><span className="pill">Tips &amp; Tutorials</span><span>7 min read</span><span>Jun 16, 2026</span></div>
              <h2>Shopify &amp; E-commerce for Specialty Coffee: Building a Website That Converts</h2>
              <p>The UK specialty coffee scene is thriving — and the best roasters are building Shopify stores that educate, inspire, and convert curious visitors into loyal subscribers.</p>
              <span className="plink">read article <em aria-hidden="true">→</em></span>
            </div>
          </Link>
          <Link className="pcard" href="/blog/london-coffee-festival-2026">
            <div className="pthumb"><img width="1900" height="1847" decoding="async" loading="lazy" src="/img-cafe-blog-b.jpg" alt="" /></div>
            <div className="pbody">
              <div className="pmeta"><span className="pill">Industry Insights</span><span>8 min read</span><span>Jun 17, 2026</span></div>
              <h2>London Coffee Festival 2026: What It Revealed About E-commerce, Shopify &amp; Digital Growth</h2>
              <p>London Coffee Festival 2026 was more than an industry event — it was a signal of where specialty coffee is heading digitally.</p>
              <span className="plink">read article <em aria-hidden="true">→</em></span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  )
}
