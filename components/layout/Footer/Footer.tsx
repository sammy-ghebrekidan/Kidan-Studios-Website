import Link from 'next/link'
import { NAVIGATION } from '@/lib/constants'

const Footer = () => {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <span className="fmark">Kidan Studios</span>
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/">home</Link>
            {NAVIGATION.main.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <Link href="/contact">contact</Link>
          </nav>
          <span className="flegal">© 2026 Kidan Studios</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
