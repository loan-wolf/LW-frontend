import s from './ContentBox.module.scss'

type Props = {
  children: React.ReactNode
}

export function ContentBox({ children }: Props) {
  return <div className={s.contentBox}>{children}</div>
}
