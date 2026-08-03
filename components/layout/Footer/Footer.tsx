import Link from 'next/link'
import { NAVIGATION } from '@/lib/constants'

const Footer = () => {
  return (
    <footer>
      <div className="wrap">
        {/* Lead CTA */}
        <div className="fhead">
          <h2 className="h2">let&apos;s build something</h2>
          <Link className="btn" href="/contact">start a project</Link>
        </div>

        {/* Grid */}
        <div className="fgrid">
          <div>
            <a className="femail" href="mailto:hello@kidanstudios.co.uk">hello@kidanstudios.co.uk</a>
            <p className="fmeta">London, UK · Available for freelance</p>
          </div>
          <div>
            <h5>pages</h5>
            <ul>
              <li><Link href="/">home</Link></li>
              {NAVIGATION.main.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
              <li><Link href="/contact">contact</Link></li>
            </ul>
          </div>
          <div>
            <h5>elsewhere</h5>
            <ul>
              {NAVIGATION.social.map((item) => (
                <li key={item.label}><a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="fbottom">
          <span className="fmark">Kidan Studios</span>
          <span className="flegal">© 2026 Kidan Studios. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
