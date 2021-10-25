import { forwardRef, useCallback, useState } from 'react'
import cns from 'classnames'

import { Text } from 'shared/ui/common/Text'

import s from './Toggle.module.scss'

type Props = {
  name?: string
  label?: React.ReactNode
  value?: string

  checked?: boolean
  disabled?: boolean

  className?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function ToggleRaw(props: Props, ref: React.Ref<HTMLInputElement>) {
  const {
    name,
    label,
    value,
    disabled: isDisabled,
    checked: isCheckedProp,
    className,
    onChange,
  } = props

  const [isCheckedState, setValueState] = useState(false)
  const isControlled = isCheckedProp !== undefined
  const isChecked = isControlled ? isCheckedProp : isCheckedState

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setValueState(e.target.checked)
      }
      onChange?.(e)
    },
    [onChange, isControlled],
  )

  return (
    <label
      className={cns(s.wrap, className, {
        [s.isChecked]: isChecked,
        [s.isDisabled]: isDisabled,
      })}
    >
      <input
        ref={ref}
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        className={s.input}
        onChange={handleChange}
        type="checkbox"
      />
      <Text size={12} weight={500} isUppercased>
        {label}
      </Text>
      <div className={s.dotWrap}>
        <div className={s.dot} />
      </div>
    </label>
  )
}

export const Toggle = forwardRef(ToggleRaw)
