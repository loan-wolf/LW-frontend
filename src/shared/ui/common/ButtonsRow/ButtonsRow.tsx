import s from './ButtonsRow.module.scss'

type Props = {
  children?: React.ReactNode
}

export function ButtonsRow({ children }: Props) {
  return <div className={s.buttonsRow}>{children}</div>
}
