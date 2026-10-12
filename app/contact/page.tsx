import type { Metadata } from 'next'
import Link from 'next/link'
import { SimpleContactForm } from '@/components/ContactForm/SimpleContactForm'
import Prompt from '@/components/Prompt/Prompt'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Kidan Studios — London-based Shopify developer. Email hello@kidanstudios.co.uk or start a project online.',
}

export default function ContactPage() {
  return (
    <main>
      <section className="wrap sec" style={{ paddingTop: 'clamp(60px,8vw,120px)', paddingBottom: 'clamp(64px,8vw,120px)' }}>
        <div className="contact-layout">

          {/* Left — info */}
          <div className="contact-left">
            <h1 className="h1" style={{ marginBottom: 'clamp(24px,3vw,40px)' }}>say hello</h1>
            <p className="lede-sm" style={{ marginBottom: 'clamp(32px,4vw,52px)', maxWidth: '34ch' }}>
              general enquiries and introductions welcome.
            </p>
            <a href="mailto:hello@kidanstudios.co.uk" className="femail" style={{ display: 'block', marginBottom: 'clamp(40px,5vw,72px)' }}>
              hello@kidanstudios.co.uk
            </a>
            <Prompt
              heading="got a project?"
              subtext="a few questions, two minutes — fixed quote back within 24 hours."
            />
          </div>

          {/* Right — form */}
          <div className="contact-right">
            <SimpleContactForm />
          </div>

        </div>
      </section>
    </main>
  )
}
