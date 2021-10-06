import cns from 'classnames'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import s from './AddressIcon.module.scss'

type Props = {
  address: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function AddressIcon({ address, onClick, className }: Props) {
  const content = (
    <Jazzicon
      diameter={40}
      seed={jsNumberForAddress(address)}
      paperStyles={{ borderRadius: 0 }}
    />
  )

  const wrapProps = {
    className: cns(s.icon, className),
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} {...wrapProps}>
        {content}
      </button>
    )
  }

  return <div {...wrapProps}>{content}</div>
}
