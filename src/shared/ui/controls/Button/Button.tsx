import cns from 'classnames'
import { ReactComponent as LoaderSVG } from 'assets/loader.svg'
// eslint-disable-next-line css-modules/no-unused-class
import s from './Button.module.scss'

type ButtonSize = 24 | 30 | 40 | 56 | 60 | 72
type ButtonFashion =
  | 'default'
  | 'secondary'
  | 'glass'
  | 'glass-branded'
  | 'greenapple'
  | 'greenapple-ghost'

type Props = {
  size?: ButtonSize
  type?: 'button' | 'submit'
  fashion?: ButtonFashion
  isSquare?: boolean
  isFullWidth?: boolean
  isLoading?: boolean
  isDisabled?: boolean
  isCentered?: boolean
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
  isLoading,
  isDisabled,
  isCentered,
  children,
  className,
}: Props) {
  return (
    <button
      type={type}
      onClick={!isLoading && !isDisabled ? onClick : undefined}
      className={cns(
        s.button,
        className,
        s[`size--${size}`],
        s[`fashion--${fashion}`],
        {
          [s.isSquare]: isSquare,
          [s.isFullWidth]: isFullWidth,
          [s.isLoading]: isLoading,
          [s.isDisabled]: isDisabled,
          [s.isCentered]: isCentered,
        },
      )}
    >
      <span className={s.content}>{children}</span>
      {isLoading && (
        <span className={s.loader}>
          <LoaderSVG />
        </span>
      )}
    </button>
  )
}
