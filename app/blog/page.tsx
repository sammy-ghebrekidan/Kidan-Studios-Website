import type { Metadata } from 'next'
import Link from 'next/link'
import { client, blogPostsQuery, urlFor } from '@/lib/sanity'
import type { BlogPost } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ideas for better Shopify stores — performance, CRO, and what actually moves revenue.',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(blogPostsQuery)

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
          {posts.map((post) => (
            <Link key={post._id} className="pcard" href={`/blog/${post.slug.current}`}>
              <div className="pthumb">
                <img 
                  width="1900" 
                  height="1800" 
                  decoding="async" 
                  loading="lazy" 
                  src={urlFor(post.image).width(1900).height(1800).url()} 
                  alt={post.image.alt || ''} 
                />
              </div>
              <div className="pbody">
                <div className="pmeta">
                  <span className="pill">{post.category}</span>
                  <span>{post.readTime}</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.standfirst}</p>
                <span className="plink">read article <em aria-hidden="true">→</em></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
