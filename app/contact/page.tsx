import type { Metadata } from 'next'
import { SimpleContactForm } from '@/components/ContactForm/SimpleContactForm'
import Prompt from '@/components/Prompt/Prompt'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Kidan Studios — London-based Shopify developer. Email hello@kidanstudios.co.uk or start a project online.',
}

export default function ContactPage() {
  return (
    <main>
      <section className="wrap sec pagehead-lg">
        <div className="contact-layout">
          <div className="contact-info">
            <h1 className="h1">say hello</h1>
            <p className="lede-sm" style={{ marginTop: 'clamp(16px,2vw,28px)', maxWidth: '36ch' }}>
              general enquiries and introductions welcome.
            </p>
            <a href="mailto:hello@kidanstudios.co.uk" className="femail" style={{ marginTop: 'clamp(24px,3vw,40px)', display: 'block' }}>
              hello@kidanstudios.co.uk
            </a>
          </div>
          <SimpleContactForm />
        </div>
      </section>

      <Prompt
        heading="got a project?"
        subtext="a few questions, two minutes — fixed quote back within 24 hours."
      />
    </main>
  )
}
