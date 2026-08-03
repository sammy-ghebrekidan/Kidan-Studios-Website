'use client'

import { useState, useCallback, useEffect, type FormEvent } from 'react'
import Link from 'next/link'
import { sanitize, isValidEmail, isValidName, isValidText } from '@/lib/utils/validation'

// --- Step definitions ---

interface RadioOption {
  value: string
  label: string
}

interface CheckboxGroup {
  title: string
  options: RadioOption[]
}

interface Step {
  id: string
  question: string
  hint: string
  type: 'radio' | 'text' | 'textarea' | 'contact' | 'checkbox'
  name: string
  options?: RadioOption[]
  checkboxGroups?: CheckboxGroup[]
  gridLayout?: boolean
  placeholder?: string
  error: string
  showIf?: (answers: Record<string, string>) => boolean
}

const STEPS: Step[] = [
  {
    id: 'need',
    question: 'what do you need?',
    hint: 'pick the closest one — we can work out the detail on a call.',
    type: 'radio',
    name: 'need',
    error: 'pick one to carry on.',
    options: [
      { value: 'new', label: 'a new store build' },
      { value: 'redesign', label: 'a redesign of my current store' },
      { value: 'speed', label: 'speed & conversion work' },
      { value: 'migration', label: 'moving to shopify from another platform' },
      { value: 'fix', label: 'a bug fix or small tweak' },
      { value: 'support', label: 'ongoing development support' },
      { value: 'unsure', label: "i'm not sure — help me work it out" },
      { value: 'other', label: 'something not on this list' },
    ],
  },
  {
    id: 'fixes',
    question: 'what needs fixing?',
    hint: "tick everything that applies — small jobs often travel in packs, and it's cheaper to do them in one go.",
    type: 'checkbox',
    name: 'fixes',
    error: 'tick at least one, or add your own.',
    showIf: (a) => a.need === 'fix',
    checkboxGroups: [
      { title: 'look & layout', options: [
        { value: 'look_colours', label: 'theme colours or fonts' },
        { value: 'look_home', label: 'homepage sections' },
        { value: 'look_mobile', label: 'something broken on mobile' },
        { value: 'look_section', label: 'a new section or block' },
      ]},
      { title: 'products & collections', options: [
        { value: 'product_pdp', label: 'product page layout' },
        { value: 'product_variants', label: 'variants or swatches' },
        { value: 'product_filters', label: 'collection filters or sorting' },
        { value: 'product_badges', label: 'sale or stock badges' },
      ]},
      { title: 'cart & checkout', options: [
        { value: 'cart_drawer', label: 'cart drawer behaviour' },
        { value: 'cart_discount', label: 'discount codes not showing' },
        { value: 'cart_shipping', label: 'shipping or delivery messaging' },
        { value: 'cart_upsell', label: 'an upsell or cross-sell block' },
      ]},
      { title: 'speed & code', options: [
        { value: 'tech_slow', label: 'pages loading slowly' },
        { value: 'tech_scripts', label: 'leftover app code to strip out' },
        { value: 'tech_images', label: 'images not optimised' },
        { value: 'tech_js', label: 'a javascript error' },
      ]},
      { title: 'apps & tracking', options: [
        { value: 'apps_app', label: 'an app not displaying right' },
        { value: 'apps_reviews', label: 'review widget' },
        { value: 'apps_subs', label: 'subscriptions' },
        { value: 'apps_gtm', label: 'gtm, pixels or event tracking' },
      ]},
      { title: 'content & seo', options: [
        { value: 'content_meta', label: 'metafields or metaobjects' },
        { value: 'content_blog', label: 'blog or article layout' },
        { value: 'content_schema', label: 'structured data' },
        { value: 'content_redirects', label: 'redirects or broken links' },
      ]},
    ],
  },
  {
    id: 'store',
    question: "what's your store?",
    hint: "a url if you have one. skip it if you're starting from scratch.",
    type: 'text',
    name: 'store',
    placeholder: 'yourbrand.com',
    error: '',
  },
  {
    id: 'problem',
    question: "what's not working?",
    hint: 'the honest version is more useful than the tidy one.',
    type: 'textarea',
    name: 'problem',
    placeholder: "tell me what's bugging you about the current setup",
    error: 'a sentence or two is plenty.',
  },
  {
    id: 'budget',
    question: "what's the budget?",
    hint: "a range is fine. it decides what's realistic, not whether i reply.",
    type: 'radio',
    name: 'budget',
    gridLayout: true,
    error: 'pick a range to carry on.',
    showIf: (a) => ['new', 'redesign', 'speed', 'migration', 'support', 'unsure', 'other'].includes(a.need),
    options: [
      { value: 'u1k', label: 'under £1,000' },
      { value: '1-3k', label: '£1,000 – £3,500' },
      { value: '3-8k', label: '£3,500 – £8,000' },
      { value: '8k', label: '£8,000+' },
      { value: 'tbd', label: 'not decided yet' },
    ],
  },
  {
    id: 'urgency',
    question: 'how urgent is it?',
    hint: "small jobs are quoted as a fixed price or in half-day blocks. urgent ones jump the queue for a bit more.",
    type: 'radio',
    name: 'urgency',
    error: 'pick one to carry on.',
    showIf: (a) => a.need === 'fix',
    options: [
      { value: 'broken', label: "it's broken and costing me sales" },
      { value: 'soon', label: 'annoying, but not on fire' },
      { value: 'whenever', label: 'whenever you have a gap' },
    ],
  },
  {
    id: 'when',
    question: 'when do you want it live?',
    hint: "so i can tell you straight away whether i can take it on.",
    type: 'radio',
    name: 'when',
    gridLayout: true,
    error: 'pick one to carry on.',
    showIf: (a) => ['new', 'redesign', 'speed', 'migration', 'support', 'unsure', 'other'].includes(a.need),
    options: [
      { value: 'asap', label: 'as soon as possible' },
      { value: '1-2m', label: 'within 1–2 months' },
      { value: '3-6m', label: 'within 3–6 months' },
      { value: 'exploring', label: 'just exploring' },
    ],
  },
  {
    id: 'you',
    question: 'and you are?',
    hint: "last one. you'll get a reply from me, not an autoresponder sequence.",
    type: 'contact',
    name: 'you',
    error: 'i need a name and a working email address.',
  },
]

// --- Component ---

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [checkedFixes, setCheckedFixes] = useState<string[]>([])
  const [customFixes, setCustomFixes] = useState<string[]>([])
  const [customInput, setCustomInput] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [done, setDone] = useState(false)
  const [pendingAdvance, setPendingAdvance] = useState(false)

  const activeSteps = STEPS.filter((step) => !step.showIf || step.showIf(answers))
  const step = activeSteps[currentStep]
  const total = activeSteps.length
  const isLast = currentStep === total - 1

  const updateAnswer = useCallback((name: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [name]: value }))
    setInvalid(false)
  }, [])

  const validate = (): boolean => {
    if (step.type === 'radio') return !!answers[step.name]
    if (step.type === 'checkbox') return checkedFixes.length > 0 || customFixes.length > 0
    if (step.type === 'text') return true // optional
    if (step.type === 'textarea') return isValidText(answers[step.name] ?? '', 3, 2000)
    if (step.type === 'contact') {
      const name = sanitize(answers.name ?? '')
      const email = sanitize(answers.email ?? '')
      return isValidName(name) && isValidEmail(email)
    }
    return true
  }

  const advance = () => {
    if (!validate()) { setInvalid(true); return }
    if (isLast) { setDone(true); return }
    setCurrentStep((i) => i + 1)
    setInvalid(false)
  }

  useEffect(() => {
    if (!pendingAdvance) return
    const timer = setTimeout(() => {
      setPendingAdvance(false)
      advance()
    }, 240)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAdvance, answers])

  const goBack = () => {
    if (currentStep > 0) { setCurrentStep((i) => i - 1); setInvalid(false) }
  }

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); advance() }

  const handleRadioChange = (name: string, value: string) => {
    updateAnswer(name, value)
    setPendingAdvance(true)
  }

  if (done) {
    return (
      <div className="qdone">
        <span className="tick" aria-hidden="true">
          <svg className="ic solid" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star4" /></svg>
        </span>
        <h2>that&apos;s everything — thanks</h2>
        <p>your answers are with me. i read every one of these myself.</p>
        <ul className="qnext">
          <li><b>today</b><span>i read it and check whether it&apos;s something i can genuinely help with.</span></li>
          <li><b>24 hours</b><span>a reply either way — including an honest no if it isn&apos;t a fit.</span></li>
          <li><b>this week</b><span>if it is, a 30-minute call and a fixed quote within two working days.</span></li>
        </ul>
        <Link className="btn ghost" href="/work">have a look at the work meanwhile</Link>
      </div>
    )
  }

  return (
    <form className="quiz" id="quiz" onSubmit={handleSubmit} noValidate>
      <div className="qhead">
        <p className="qcount"><span>{total}</span> questions <em aria-hidden="true">·</em> about 2 minutes</p>
        <p className="qcount" aria-hidden="true">
          {String(currentStep + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>
      <div className="qbar" aria-hidden="true">
        <span style={{ width: `${((currentStep + 1) / total) * 100}%` }} />
      </div>
      <p className="sr" aria-live="polite">
        question {currentStep + 1} of {total}: {step.question}
      </p>

      <fieldset className="qstep" data-invalid={invalid ? '1' : undefined}>
        <legend className="qq">{step.question}</legend>
        <p className="qhint">{step.hint}</p>

        {step.type === 'radio' && step.options && (
          <div className={`qopts${step.gridLayout ? ' qgrid' : ''}`}>
            {step.options.map((opt) => (
              <label key={opt.value} className="qopt">
                <input
                  type="radio"
                  name={step.name}
                  value={opt.value}
                  checked={answers[step.name] === opt.value}
                  onChange={() => handleRadioChange(step.name, opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}

        {step.type === 'checkbox' && step.checkboxGroups && (
          <div className="qcats">
            {step.checkboxGroups.map((group) => (
              <div key={group.title} className="qcat" role="group" aria-label={group.title}>
                <p className="qcatname">{group.title}</p>
                <div className="qopts qgrid">
                  {group.options.map((opt) => (
                    <label key={opt.value} className="qopt check">
                      <input
                        type="checkbox"
                        name="fixes"
                        value={opt.value}
                        checked={checkedFixes.includes(opt.value)}
                        onChange={(e) => {
                          setCheckedFixes((prev) =>
                            e.target.checked
                              ? [...prev, opt.value]
                              : prev.filter((v) => v !== opt.value)
                          )
                          setInvalid(false)
                        }}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="qcat" role="group" aria-label="Add your own">
              <p className="qcatname">not listed? add your own</p>
              <div className="qadd">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      if (customInput.trim()) {
                        setCustomFixes((prev) => [...prev, customInput.trim()])
                        setCustomInput('')
                        setInvalid(false)
                      }
                    }
                  }}
                  placeholder="e.g. the size guide popup stopped opening"
                />
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => {
                    if (customInput.trim()) {
                      setCustomFixes((prev) => [...prev, customInput.trim()])
                      setCustomInput('')
                      setInvalid(false)
                    }
                  }}
                >
                  add
                </button>
              </div>
              {customFixes.length > 0 && (
                <ul className="qchips" aria-live="polite">
                  {customFixes.map((fix, i) => (
                    <li key={i}>
                      <span>{fix}</span>
                      <button
                        type="button"
                        aria-label={`remove ${fix}`}
                        onClick={() => setCustomFixes((prev) => prev.filter((_, j) => j !== i))}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {step.type === 'text' && (
          <label className="field">
            <span className="sr">{step.question}</span>
            <input
              type="text"
              name={step.name}
              value={answers[step.name] ?? ''}
              onChange={(e) => updateAnswer(step.name, e.target.value)}
              placeholder={step.placeholder}
            />
          </label>
        )}

        {step.type === 'textarea' && (
          <label className="field">
            <span className="sr">{step.question}</span>
            <textarea
              name={step.name}
              value={answers[step.name] ?? ''}
              onChange={(e) => updateAnswer(step.name, e.target.value)}
              placeholder={step.placeholder}
            />
          </label>
        )}

        {step.type === 'contact' && (
          <>
            <label className="field"><span>name</span><input type="text" name="name" value={answers.name ?? ''} onChange={(e) => updateAnswer('name', e.target.value)} placeholder="jane roberts" /></label>
            <label className="field"><span>email</span><input type="email" name="email" value={answers.email ?? ''} onChange={(e) => updateAnswer('email', e.target.value)} placeholder="jane@yourbrand.com" /></label>
            <label className="field"><span>brand or company</span><input type="text" name="company" value={answers.company ?? ''} onChange={(e) => updateAnswer('company', e.target.value)} placeholder="optional" /></label>
          </>
        )}

        {invalid && step.error && <p className="qerr">{step.error}</p>}
      </fieldset>

      <div className="qnav">
        {currentStep > 0 && (
          <button type="button" className="btn ghost" onClick={goBack}>back</button>
        )}
        <button type="submit" className="btn">{isLast ? 'send it over' : 'next'}</button>
        <span className="spacer">press enter to continue</span>
      </div>

      <div className="qalt">
        <p>would rather just email?</p>
        <a className="btn ghost" href="mailto:hello@kidanstudios.co.uk">hello@kidanstudios.co.uk</a>
      </div>
    </form>
  )
}

export default ContactForm
