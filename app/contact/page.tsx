import type { Metadata } from 'next'
import { ContactForm } from '@/components'
import { client } from '@/lib/sanity'
import { contactContentQuery } from '@/lib/sanity/queries'
import type { ContactContent } from '@/lib/sanity/types'

export async function generateMetadata(): Promise<Metadata> {
  const data: ContactContent | null = await client.fetch(contactContentQuery)
  return {
    title: data?.metaTitle ?? 'Contact',
    description: data?.metaDescription ?? 'Start a project with Kidan Studios. A few quick questions, about two minutes.',
  }
}

export default async function ContactPage() {
  const data: ContactContent | null = await client.fetch(contactContentQuery)

  const heading = data?.heading ?? 'start a project'
  const lede = data?.lede ?? "a few quick questions, about two minutes — big rebuild or a five-minute fix, same form. you'll hear back within 24 hours."

  return (
    <main>
      <section className="wrap pagehead-lg">
        <h1 className="h1">{heading}</h1>
        <p className="lede-sm" style={{ marginTop: '40px' }}>
          {lede}
        </p>
      </section>
      <section className="wrap sec pt0" style={{ paddingBottom: 'clamp(46px,5vw,80px)' }}>
        <ContactForm />
      </section>
    </main>
  )
}
