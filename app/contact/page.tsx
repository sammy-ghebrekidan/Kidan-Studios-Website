import type { Metadata } from 'next'
import { ContactForm } from '@/components'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Kidan Studios. A few quick questions, about two minutes.',
}

export default function ContactPage() {
  return (
    <main>
      <section className="wrap pagehead-lg">
        <h1 className="h1">start a<br />project</h1>
        <p className="lede-sm" style={{ marginTop: '40px' }}>
          a few quick questions, about two minutes — big rebuild or a five-minute fix, same form. you&apos;ll hear back within 24 hours.
        </p>
      </section>
      <section className="wrap sec pt0" style={{ paddingBottom: 'clamp(46px,5vw,80px)' }}>
        <ContactForm />
      </section>
    </main>
  )
}
