import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { client, blogPostBySlugQuery, blogPostsQuery, urlFor } from '@/lib/sanity'
import type { BlogPost } from '@/lib/sanity'
import { PortableText } from '@/components'

type Props = { params: Promise<{ slug: string }> }

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export async function generateStaticParams() {
  const posts = await client.fetch<BlogPost[]>(blogPostsQuery)
  return posts.map((post) => ({ slug: post.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug })
  if (!post) return {}
  return { title: post.title, description: post.standfirst }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug })
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
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      <figure className="wrap artfig">
        <img 
          width="1900" 
          height="1800" 
          decoding="async" 
          loading="lazy" 
          src={urlFor(post.image).width(1900).height(1800).url()} 
          alt={post.image.alt || ''} 
        />
        <figcaption>{post.image.alt || ''}</figcaption>
      </figure>

      <div className="wrap artwrap">
        <aside className="toc" aria-label="On this page">
          <p className="toctitle">on this page</p>
          <ol></ol>
        </aside>
        <div className="article">
          {post.body && <PortableText value={post.body} />}
        </div>
      </div>

      {post.relatedPost && (
        <section className="wrap sec pt0">
          <div className="sechead">
            <div className="txt"><h2 className="h2">keep reading</h2></div>
            <Link className="btn ghost" href="/blog">all articles</Link>
          </div>
          <Link className="pcard" href={`/blog/${post.relatedPost.slug.current}`}>
            <div className="pthumb">
              <img 
                width="1900" 
                height="1800" 
                decoding="async" 
                loading="lazy" 
                src={urlFor(post.relatedPost.image).width(1900).height(1800).url()} 
                alt="" 
              />
            </div>
            <div className="pbody">
              <div className="pmeta">
                <span className="pill">{post.relatedPost.category}</span>
              </div>
              <h3>{post.relatedPost.title}</h3>
              <span className="plink">read article <em aria-hidden="true">→</em></span>
            </div>
          </Link>
        </section>
      )}
    </main>
  )
}
