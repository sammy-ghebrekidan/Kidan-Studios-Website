import Link from 'next/link'
import { NAVIGATION } from '@/lib/constants'

const Footer = () => {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="fmark">Kidan Studios</span>
            <p className="fmeta">London, UK · hello@kidanstudios.co.uk</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/">home</Link>
            {NAVIGATION.main.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
          <span className="flegal">© 2026 Kidan Studios. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
