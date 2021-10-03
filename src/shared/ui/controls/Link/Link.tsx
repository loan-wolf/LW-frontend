import { Link as LinkRouter } from 'react-router-dom'

type Props = {
  to: string
  className?: string
  children?: React.ReactNode
}

export function Link({ to, className, children }: Props) {
  return <LinkRouter to={to} className={className} children={children} />
}
