import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '@/lib/data/posts'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return {}
  return { title: post.title, description: post.standfirst }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  return (
    <main>
      <div className="progress" aria-hidden="true"><span></span></div>

      <section className="wrap" style={{ paddingBlock: 'clamp(56px,7vw,88px) 0' }}>
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">home</Link><span aria-hidden="true">/</span>
          <Link href="/blog">blog</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{post.category.toLowerCase()}</span>
        </nav>
      </section>

      <header className="wrap arthead">
        <span className="pill">{post.category}</span>
        <h1>{post.title}</h1>
        <p className="stand">{post.standfirst}</p>
        <div className="byline">
          <span className="avatar" aria-hidden="true">KS</span>
          <div><strong>Kidan Studios</strong><span>shopify development, london</span></div>
          <div className="bmeta">
            <time dateTime={post.date}>{post.dateFormatted}</time><span aria-hidden="true">·</span><span>{post.readTime}</span>
          </div>
        </div>
      </header>

      <figure className="wrap artfig">
        <img width={post.image.width} height={post.image.height} decoding="async" loading="lazy" src={post.image.src} alt={post.image.alt} />
        <figcaption>{post.image.alt}</figcaption>
      </figure>

      <div className="wrap artwrap">
        <aside className="toc" aria-label="On this page">
          <p className="toctitle">on this page</p>
          <ol></ol>
        </aside>
        <div className="article" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
      </div>

      {post.relatedSlug && (
        <section className="wrap sec pt0">
          <div className="sechead">
            <div className="txt"><h2 className="h2">keep reading</h2></div>
            <Link className="btn ghost" href="/blog">all articles</Link>
          </div>
          <Link className="pcard" href={`/blog/${post.relatedSlug}`}>
            <div className="pthumb"><img width={posts[post.relatedSlug].image.width} height={posts[post.relatedSlug].image.height} decoding="async" loading="lazy" src={posts[post.relatedSlug].image.src} alt="" /></div>
            <div className="pbody">
              <div className="pmeta"><span className="pill">{posts[post.relatedSlug].category}</span><span>{posts[post.relatedSlug].readTime}</span></div>
              <h3>{posts[post.relatedSlug].title}</h3>
              <span className="plink">read article <em aria-hidden="true">→</em></span>
            </div>
          </Link>
        </section>
      )}
    </main>
  )
}
