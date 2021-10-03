import React from 'react'
import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'
// import { Animated } from 'components/Animated'
import s from './SelectOptions.module.scss'

type OptionsProps = {
  children?: React.ReactNode
  optionsRef?: React.Ref<HTMLDivElement>
}

export function SelectOptions({ children, optionsRef }: OptionsProps) {
  return (
    <div className={s.optionsWrapper}>
      <div className={s.options} ref={optionsRef}>
        {children}
      </div>
    </div>
  )
}

type ItemProps = {
  hint?: React.ReactNode
  icon?: React.ReactNode
  label?: React.ReactNode
  isActive?: boolean
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  className?: string
}

export function SelectOptionItem({
  hint,
  icon,
  label,
  isActive,
  onMouseDown,
  className,
}: ItemProps) {
  return (
    <div
      className={cns(s.item, className, { [s.isActive]: isActive })}
      onMouseDown={onMouseDown}
    >
      {typeof label === 'string' ? (
        <Text
          size={16}
          // color="default"
          weight={400}
          children={label}
        />
      ) : (
        label
      )}
      {typeof hint === 'string' ? (
        <Text
          size={12}
          // color="secondary"
          weight={400}
          children={hint}
        />
      ) : (
        hint
      )}
      {icon && <div className={s.icon}>{icon}</div>}
    </div>
  )
}

type NotifyProps = {
  children?: React.ReactNode
  className?: string
}

export function SelectOptionsNotify({ children, className }: NotifyProps) {
  return <div className={cns(s.optionsNotify, className)}>{children}</div>
}
