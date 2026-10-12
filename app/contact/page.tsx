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
      <section className="wrap pagehead-lg">
        <div className="contact-head">
          <div>
            <h1 className="h1">say hello</h1>
            <p className="lede-sm" style={{ marginTop: 'clamp(20px,2.4vw,32px)', maxWidth: '38ch' }}>
              general enquiries and introductions welcome.
            </p>
          </div>
          <a href="mailto:hello@kidanstudios.co.uk" className="femail">
            hello@kidanstudios.co.uk
          </a>
        </div>
      </section>

      <section className="wrap sec pt0" style={{ paddingBottom: 'clamp(46px,5vw,80px)' }}>
        <SimpleContactForm />
      </section>

      <Prompt
        heading="got a project?"
        subtext="a few questions, two minutes — fixed quote back within 24 hours."
      />
    </main>
  )
}
