import cns from 'classnames'
import s from './Button.module.scss'

type Props = {
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
  isFullWidth?: boolean
  onClick?: React.MouseEventHandler
  children: React.ReactNode
  className?: string
}

export function Button({
  size = 'md',
  type = 'button',
  onClick,
  isFullWidth,
  children,
  className,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cns(s.button, className, s[`size--${size}`], {
        [s.isFullWidth]: isFullWidth,
      })}
      children={children}
    />
  )
}
