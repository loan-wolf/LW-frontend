import cns from 'classnames'
// eslint-disable-next-line css-modules/no-unused-class
import s from './Button.module.scss'

type ButtonSize = 24 | 30 | 40 | 56 | 60 | 72

type Props = {
  size?: ButtonSize
  type?: 'button' | 'submit'
  fashion?: 'default' | 'secondary' | 'glass' | 'glass-branded'
  isSquare?: boolean
  isFullWidth?: boolean
  onClick?: React.MouseEventHandler
  children?: React.ReactNode
  className?: string
}

export function Button({
  size = 60,
  type = 'button',
  fashion = 'default',
  onClick,
  isSquare,
  isFullWidth,
  children,
  className,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cns(
        s.button,
        className,
        s[`size--${size}`],
        s[`fashion--${fashion}`],
        {
          [s.isSquare]: isSquare,
          [s.isFullWidth]: isFullWidth,
        },
      )}
    >
      <span className={s.content}>{children}</span>
    </button>
  )
}
