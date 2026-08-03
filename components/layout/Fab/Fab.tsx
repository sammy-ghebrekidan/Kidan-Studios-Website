import Link from 'next/link'

const Fab = () => {
  return (
    <Link className="fab glass-rim" id="fab" href="/contact" aria-label="Start a project">
      <svg className="ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="fabpath" d="M100,100 m-73,0 a73,73 0 1,1 146,0 a73,73 0 1,1 -146,0" />
        </defs>
        <text>
          <textPath href="#fabpath" startOffset="0">
            start a project&#160;·&#160;start a project&#160;·&#160;
          </textPath>
        </text>
      </svg>
      <span className="core" aria-hidden="true">↗</span>
    </Link>
  )
}

export default Fab
