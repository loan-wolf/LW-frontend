import React, { useCallback, useContext } from 'react'
import cns from 'classnames'
import { Link } from 'react-router-dom'
import { Text, TextParams } from 'shared/ui/common/Text'
import { DropdownContext } from '../../context/DropdownContext'
import type { LocationDescriptor } from 'history'
// eslint-disable-next-line css-modules/no-unused-class
import cn from './DropdownItem.module.scss'

type Props = TextParams & {
  link?: LocationDescriptor
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  preventClose?: boolean
  isDisabled?: boolean
  onClick?: React.MouseEventHandler
}

export function DropdownItem(props: Props) {
  const {
    link,
    icon,
    children,
    className: classNameProp,
    isDisabled,
    onClick,
    preventClose,

    // Text params
    size = 12,
    weight = 500,
    isUppercased,
    color,
  } = props

  const { fashion, handleClose } = useContext(DropdownContext)

  const handleClick = useCallback(
    e => {
      if (!isDisabled && onClick) {
        onClick(e)
        if (!preventClose) {
          handleClose()
        }
      }
    },
    [isDisabled, onClick, handleClose, preventClose],
  )

  const content = (
    <Text
      size={size}
      weight={weight}
      isUppercased={isUppercased}
      color={color}
      className={cn.content}
    >
      {children}
      {icon && <div className={cn.icon}>{icon}</div>}
    </Text>
  )

  const className = cns(cn.root, classNameProp, cn[`fashion--${fashion}`], {
    [cn.isDisabled]: isDisabled,
    [cn.isInteractive]: Boolean(!isDisabled && (link || onClick)),
  })

  if (link) {
    return (
      <Link
        to={link}
        onClick={handleClick}
        className={className}
        children={content}
      />
    )
  }

  return <div onClick={handleClick} className={className} children={content} />
}
