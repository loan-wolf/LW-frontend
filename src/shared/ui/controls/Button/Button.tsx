import cns from 'classnames'
// eslint-disable-next-line css-modules/no-unused-class
import s from './Button.module.scss'

type Props = {
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
  fashion?: 'default' | 'glass'
  isSquare?: boolean
  isFullWidth?: boolean
  onClick?: React.MouseEventHandler
  children: React.ReactNode
  className?: string
}

export function Button({
  size = 'md',
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
      children={children}
    />
  )
}
