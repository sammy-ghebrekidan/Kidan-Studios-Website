import Link from 'next/link'
import { NAVIGATION } from '@/lib/constants'

const Header = () => {
  return (
    <header className="nav">
      <nav className="wrap inner" aria-label="Primary">
        <Link className="brand" href="/">Kidan Studios</Link>
        <div className="nav-links">
          {NAVIGATION.main.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
        <Link className="btn" href="/contact">start a project</Link>
        <button className="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="navpanel">
          <i aria-hidden="true" />
        </button>
      </nav>
      <div className="navpanel wrap" id="navpanel">
        {NAVIGATION.main.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
        <Link className="btn" href="/contact">start a project</Link>
        <p className="meta">hello@kidanstudios.co.uk · london, uk</p>
      </div>
    </header>
  )
}

export default Header
