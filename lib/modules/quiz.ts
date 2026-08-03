/**
 * Multi-step enquiry form.
 * Steps are visible in markup and only hidden once JS runs,
 * so with scripting off the form degrades to one long page.
 */

export function initQuiz() {
  const form = document.getElementById('quiz') as HTMLFormElement | null
  if (!form) return

  document.documentElement.classList.remove('no-js')

  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>('.qstep'))
  const fill = document.getElementById('qfill') as HTMLElement
  const pos = document.getElementById('qpos') as HTMLElement
  const live = document.getElementById('qlive') as HTMLElement
  const backBtn = document.getElementById('qback') as HTMLButtonElement
  const nextBtn = document.getElementById('qnext') as HTMLButtonElement
  const esc = document.getElementById('qesc') as HTMLElement | null
  const done = document.getElementById('qdone') as HTMLElement
  const nav = form.querySelector<HTMLElement>('.qnav')!

  let currentIndex = 0

  // --- Helpers ---

  function getAnswers(): Record<string, string> {
    const data: Record<string, string> = {}
    new FormData(form!).forEach((value, key) => { data[key] = value as string })
    return data
  }

  /** Return only the steps whose conditions are met */
  function getActiveSteps(): HTMLFieldSetElement[] {
    const answers = getAnswers()
    return steps.filter((step) => {
      const condition = step.dataset.if
      if (!condition) return true
      const [key, valuesStr] = condition.split('=')
      const allowedValues = valuesStr.split('|')
      return allowedValues.includes(answers[key])
    })
  }

  function syncReveals(step: HTMLFieldSetElement) {
    step.querySelectorAll<HTMLInputElement>('[data-reveal]').forEach((input) => {
      const box = document.getElementById(input.dataset.reveal!)
      if (box) box.hidden = !input.checked
    })
  }

  // --- Validation ---

  function isStepValid(step: HTMLFieldSetElement): boolean {
    // If "other" is selected, its text input must be filled
    const revealInputs = Array.from(step.querySelectorAll<HTMLInputElement>('[data-reveal]'))
      .filter((el) => el.checked)

    for (const input of revealInputs) {
      const box = document.getElementById(input.dataset.reveal!)
      const textInput = box?.querySelector<HTMLInputElement>('input')
      if (textInput && !textInput.value.trim()) return false
    }

    // Checkboxes: at least one checked or custom chip added
    const checkboxes = step.querySelectorAll<HTMLInputElement>('input[type=checkbox]')
    if (checkboxes.length) {
      const customChips = step.querySelectorAll('.qchips input[type=hidden]').length
      return customChips > 0 || Array.from(checkboxes).some((cb) => cb.checked)
    }

    // Radio: at least one selected
    const radios = step.querySelectorAll<HTMLInputElement>('input[type=radio]')
    if (radios.length) return Array.from(radios).some((r) => r.checked)

    // Textarea (problem step)
    if (step.dataset.step === 'problem') {
      return step.querySelector<HTMLTextAreaElement>('textarea')!.value.trim().length > 2
    }

    // Contact info step
    if (step.dataset.step === 'you') {
      const name = (form!.elements.namedItem('name') as HTMLInputElement).value.trim()
      const email = (form!.elements.namedItem('email') as HTMLInputElement).value.trim()
      return name.length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    }

    return true
  }

  // --- Rendering ---

  function render() {
    const activeSteps = getActiveSteps()
    if (currentIndex >= activeSteps.length) currentIndex = activeSteps.length - 1
    if (currentIndex < 0) currentIndex = 0

    steps.forEach((step) => { step.hidden = step !== activeSteps[currentIndex] })

    const stepNumber = currentIndex + 1
    const total = activeSteps.length

    const totalEl = document.getElementById('qtotal')
    if (totalEl) totalEl.textContent = String(total)

    fill.style.width = `${(stepNumber / total) * 100}%`
    pos.textContent = `${String(stepNumber).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
    backBtn.hidden = currentIndex === 0

    const currentStep = activeSteps[currentIndex]
    const pickedCount = currentStep.querySelectorAll('input[type=checkbox]:checked').length
      + currentStep.querySelectorAll('.qchips input[type=hidden]').length

    if (currentIndex === total - 1) {
      nextBtn.textContent = 'send it over'
    } else {
      nextBtn.textContent = pickedCount ? `next (${pickedCount} picked)` : 'next'
    }

    if (esc) {
      esc.textContent = currentStep.querySelector('input[type=checkbox]')
        ? 'tick as many as apply'
        : 'press enter to continue'
    }

    live.textContent = `question ${stepNumber} of ${total}: ${currentStep.querySelector('.qq')!.textContent}`

    // Auto-focus the first text/textarea input
    const focusTarget = currentStep.querySelector<HTMLElement>(
      'input:not([type=checkbox]):not([type=radio]),textarea',
    )
    if (focusTarget && document.activeElement?.getAttribute('type') !== 'checkbox') {
      focusTarget.focus({ preventScroll: true })
    }

    syncReveals(currentStep)
  }

  // --- Navigation ---

  function advance() {
    const activeSteps = getActiveSteps()
    const currentStep = activeSteps[currentIndex]

    if (!isStepValid(currentStep)) {
      currentStep.dataset.invalid = '1'
      const focusEl = currentStep.querySelector<HTMLElement>('input,textarea')
      if (focusEl) focusEl.focus()
      return
    }

    currentStep.removeAttribute('data-invalid')

    if (currentIndex === activeSteps.length - 1) {
      finish()
      return
    }

    currentIndex++
    render()
  }

  function finish() {
    steps.forEach((step) => { step.hidden = true })
    nav.hidden = true
    document.querySelector<HTMLElement>('.qbar')!.hidden = true
    document.getElementById('qcount')!.hidden = true
    pos.hidden = true
    done.hidden = false
    live.textContent = 'thanks — your answers have been sent.'
    done.setAttribute('tabindex', '-1')
    done.focus({ preventScroll: true })
    done.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // --- Custom chips (add-your-own) ---

  const addInput = document.getElementById('qadd-input') as HTMLInputElement | null
  const addBtn = document.getElementById('qadd-btn') as HTMLButtonElement | null
  const chips = document.getElementById('qchips') as HTMLUListElement | null

  function addChip() {
    if (!addInput || !chips) return
    const value = addInput.value.trim()
    if (!value) return

    // Prevent duplicates
    const existing = Array.from(chips.querySelectorAll<HTMLInputElement>('input'))
    if (existing.some((h) => h.value.toLowerCase() === `custom:${value.toLowerCase()}`)) {
      addInput.value = ''
      return
    }

    const li = document.createElement('li')

    const textSpan = document.createElement('span')
    textSpan.textContent = value

    const hidden = document.createElement('input')
    hidden.type = 'hidden'
    hidden.name = 'fixes'
    hidden.value = `custom:${value}`

    const removeBtn = document.createElement('button')
    removeBtn.type = 'button'
    removeBtn.textContent = '×'
    removeBtn.setAttribute('aria-label', `remove ${value}`)
    removeBtn.addEventListener('click', () => { li.remove(); render(); addInput.focus() })

    li.append(textSpan, hidden, removeBtn)
    chips.appendChild(li)

    addInput.value = ''
    addInput.focus()

    const step = addInput.closest<HTMLFieldSetElement>('.qstep')
    if (step) step.removeAttribute('data-invalid')
    render()
  }

  if (addBtn) addBtn.addEventListener('click', addChip)
  if (addInput) {
    addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); addChip() }
      if (e.key === 'Backspace' && !addInput.value && chips?.lastElementChild) {
        chips.lastElementChild.remove()
        render()
      }
    })
  }

  // --- Event listeners ---

  form.addEventListener('submit', (e) => { e.preventDefault(); advance() })
  backBtn.addEventListener('click', () => { currentIndex--; render() })

  form.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    if (target.type !== 'radio') return

    const step = target.closest<HTMLFieldSetElement>('.qstep')!
    step.removeAttribute('data-invalid')
    syncReveals(step)

    if (target.dataset.reveal) {
      const box = document.getElementById(target.dataset.reveal)
      const textInput = box?.querySelector<HTMLInputElement>('input')
      if (textInput) textInput.focus({ preventScroll: true })
      return
    }

    setTimeout(advance, 240)
  })

  form.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement
    const step = target.closest<HTMLFieldSetElement>('.qstep')
    if (step) step.removeAttribute('data-invalid')
    if (target.type === 'checkbox') {
      syncReveals(target.closest<HTMLFieldSetElement>('.qstep')!)
      render()
    }
  })

  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return
    if ((e.target as HTMLElement).tagName === 'TEXTAREA' && !e.metaKey && !e.ctrlKey) return
    if ((e.target as HTMLElement).id === 'qadd-input') return
    e.preventDefault()
    advance()
  })

  if (esc) esc.textContent = 'press enter to continue'
  render()
}
