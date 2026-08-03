/**
 * Blog functionality: table of contents, scroll-spy,
 * reading progress bar, and topic filters.
 */

export function initBlog() {
  initTableOfContents()
  initReadingProgress()
  initTopicFilters()
}

/** Build a TOC from article h2s and add scroll-spy highlighting */
function initTableOfContents() {
  document.querySelectorAll<HTMLElement>('.artwrap').forEach((wrap) => {
    const list = wrap.querySelector<HTMLOListElement>('.toc ol')
    const headings = wrap.querySelectorAll<HTMLHeadingElement>('.article h2[id]')

    if (!list || !headings.length) {
      const toc = wrap.querySelector<HTMLElement>('.toc')
      if (toc) toc.style.display = 'none'
      return
    }

    // Build TOC links
    headings.forEach((heading) => {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = `#${heading.id}`
      a.textContent = heading.textContent
      li.appendChild(a)
      list.appendChild(li)
    })

    // Smooth scroll on click
    list.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a')
      if (!link) return
      e.preventDefault()
      const targetId = link.getAttribute('href')!.slice(1)
      const target = wrap.querySelector(`#${CSS.escape(targetId)}`)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    // Scroll-spy with IntersectionObserver
    if ('IntersectionObserver' in window) {
      const links = Array.from(list.querySelectorAll<HTMLAnchorElement>('a'))
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            links.forEach((link) => {
              link.classList.toggle('on', link.getAttribute('href') === `#${entry.target.id}`)
            })
          })
        },
        { rootMargin: '-25% 0px -65% 0px' },
      )
      headings.forEach((h) => observer.observe(h))
    }
  })
}

/** Reading progress bar tied to the visible article */
function initReadingProgress() {
  function tick() {
    const progressSpan = document.querySelector<HTMLElement>('main:not(.hide) .progress span')
    if (!progressSpan) return

    const article = progressSpan.closest('main')?.querySelector<HTMLElement>('.article')
    if (!article) return

    const rect = article.getBoundingClientRect()
    const total = rect.height - innerHeight
    const progress = total > 0
      ? Math.min(1, Math.max(0, -rect.top / total))
      : (rect.top < 0 ? 1 : 0)

    progressSpan.style.width = `${(progress * 100).toFixed(1)}%`
  }

  addEventListener('scroll', tick, { passive: true })
  addEventListener('resize', tick)
  tick()
  ;(window as any).__tickProgress = tick
}

/** Blog topic tab filtering */
function initTopicFilters() {
  const tabBar = document.querySelector<HTMLElement>('[data-tabs="blog"]')
  if (!tabBar) return

  const grid = document.querySelector<HTMLElement>('.bloggrid')
  const emptyMessage = document.getElementById('blog-empty')
  if (!grid || !emptyMessage) return

  tabBar.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button')
    if (!btn) return

    // Update pressed state
    tabBar.querySelectorAll('button').forEach((b) => {
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false')
    })

    // Filter cards
    const topic = btn.dataset.topic
    let shown = 0
    grid.querySelectorAll<HTMLElement>('.pcard').forEach((card) => {
      const matches = topic === 'all' || card.dataset.topic === topic
      card.hidden = !matches
      if (matches) shown++
    })

    emptyMessage.hidden = shown > 0
  })
}
