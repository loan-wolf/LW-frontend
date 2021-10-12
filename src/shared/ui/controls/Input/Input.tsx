import { useState, forwardRef, useCallback } from 'react'
import { FieldError } from 'shared/ui/controls/FieldError'
// import TextareaAutosize from 'react-textarea-autosize'
import cns from 'classnames'

import s from './Input.module.scss'

type InputElement = HTMLInputElement | HTMLTextAreaElement

type Props = {
  id?: string
  name?: string
  type?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  autoComplete?: string
  maxLength?: number
  className?: string
  concat?: 'top' | 'bottom'
  rows?: number
  minRows?: number
  maxRows?: number
  error?: React.ReactNode

  required?: boolean
  disabled?: boolean
  readonly?: boolean
  onlyNumber?: boolean
  isAutosizable?: boolean
  withFloatingIcon?: boolean

  onChange?: React.ChangeEventHandler<InputElement>
  onKeyDown?: React.KeyboardEventHandler<InputElement>
  onKeyPress?: React.KeyboardEventHandler<InputElement>
  onFocus?: React.FocusEventHandler<InputElement>
  onBlur?: React.FocusEventHandler<InputElement>
}

function InputRaw(
  {
    className,
    isAutosizable,
    placeholder,
    type = 'text',
    withFloatingIcon,
    onFocus,
    onBlur,
    value: valueProp,
    onChange,
    concat,
    error,
    onlyNumber,
    ...restProps
  }: Props,
  ref: React.Ref<InputElement>,
) {
  const [valueState, setValue] = useState('')
  const [isFocused, setFocused] = useState(false)

  const isTextarea = type === 'textarea'
  const Tag = isTextarea ? 'textarea' : 'input'
  const isControlled = Boolean(onChange)
  const value = isControlled ? valueProp : valueState

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(true)
      onFocus?.(e)
    },
    [onFocus],
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false)
      onBlur?.(e)
    },
    [onBlur],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onlyNumber && isNaN(Number(e.target.value))) {
        return
      }
      if (onChange) {
        onChange(e)
      } else {
        setValue(e.target.value)
      }
    },
    [onChange, onlyNumber],
  )

  const fieldProps = {
    ...restProps,
    type: !isTextarea ? type : undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    value,
    className: cns(s.field, {
      [s.isError]: Boolean(error),
      [s.isTextarea]: isTextarea || isAutosizable,
      [s.withFloatingIcon]: withFloatingIcon,
    }),
  }

  // if (isAutosizable) {
  //   <TextareaAutosize {...fieldProps} cacheMeasurements ref={ref as any} />
  // }

  return (
    <div
      className={cns(s.wrap, className, {
        [s.isFocused]: isFocused,
        [s.isConcatTop]: concat === 'top',
        [s.isConcatBottom]: concat === 'bottom',
      })}
    >
      <div
        className={cns(s.placeholder, {
          [s.isMoved]: isFocused || Boolean(value),
        })}
      >
        {placeholder}
      </div>
      <Tag {...fieldProps} ref={ref as any} type={type} />
      {error && <FieldError className={s.error}>{error}</FieldError>}
    </div>
  )
}

export const Input = forwardRef<InputElement, Props>(InputRaw)
