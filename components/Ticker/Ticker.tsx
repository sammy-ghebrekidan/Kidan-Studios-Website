import { tickerItems } from '@/content/ticker'

const Ticker = () => {
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <section aria-label="What I build">
      <div className="ticker">
        <div className="tk" aria-hidden="true">
          {doubled.map((item, i) => (
            <span key={i}>
              <span className={item.outline ? 'o' : ''}>
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <use href={`#${item.icon}`} />
                </svg>
                {item.label}
              </span>
              <svg className="star" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#i-star4" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Ticker
