import Link from 'next/link'

interface PromptProps {
  heading: string
  subtext: string
  actions?: React.ReactNode
}

const Prompt = ({ heading, subtext, actions }: PromptProps) => {
  return (
    <section className="wrap sec pt0">
      <div className="prompt">
        <div>
          <p>{heading}</p>
          <p className="sub">{subtext}</p>
        </div>
        {actions ?? (
          <Link className="btn" href="/contact">start a project</Link>
        )}
      </div>
    </section>
  )
}

export default Prompt
