import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  forwardRef,
} from 'react'
import cns from 'classnames'
import { useMergeRefs } from 'use-callback-ref'
import {
  SelectOptions,
  SelectOptionItem,
  SelectOptionsNotify,
} from '../SelectOptions'
import { ReactComponent as ArrowIcon } from 'assets/drop.svg'
import s from './Select.module.scss'

type Value = string | number

type Option = {
  label: string
  value: Value
  icon?: React.ReactNode
}

type Props = {
  id?: string
  name?: string
  placeholder?: string
  className?: string
  value?: Value
  defaultValue?: Value
  options: Option[]
  isError?: boolean
  withFloatingIcon?: boolean
  onChange?: (value: Value) => void
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
}

function SelectRaw(props: Props, ref: React.Ref<HTMLInputElement>) {
  const {
    id,
    name,
    value: propValue,
    defaultValue,
    options,
    placeholder,
    onChange,
    className,
    isError,
    withFloatingIcon,
    onFocus,
    onBlur,
  } = props

  const optsCount = options.length
  const rootRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const optionsRef = useRef<HTMLDivElement | null>(null)
  const [isFocused, setFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const [activeIdx, setActiveIdx] = useState(-1)

  const isControlled = propValue !== undefined
  const value = isControlled ? propValue : internalValue

  const doBlur = useCallback(() => {
    setFocused(false)
    setActiveIdx(-1)
  }, [])

  const handleClickBox = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleClickOption = useCallback(
    (idx: number) => {
      const option = options[idx]

      doBlur()
      setInternalValue(option.value)
      if (onChange) {
        onChange(option.value)
      }
    },
    [options, onChange, doBlur],
  )

  const handleFocus = useCallback(
    (e: React.FocusEvent) => {
      setFocused(true)
      if (onFocus) {
        onFocus(e)
      }
    },
    [onFocus],
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      doBlur()
      if (onBlur) {
        onBlur(e)
      }
    },
    [doBlur, onBlur],
  )

  const currentOption = useMemo(() => {
    return options.find(o => o.value === value)
  }, [options, value])

  const handleKeyDown = useCallback(
    e => {
      const { key } = e

      if (!isFocused) {
        return
      }

      if (key === 'Enter') {
        e.preventDefault()
        handleClickOption(activeIdx)
      } else if (key === 'Escape') {
        doBlur()
      } else if (key === 'ArrowDown') {
        e.preventDefault()
        const nextActiveIndex = activeIdx >= optsCount - 1 ? 0 : activeIdx + 1

        setActiveIdx(nextActiveIndex)
      } else if (key === 'ArrowUp') {
        e.preventDefault()
        const prevActiveIndex = activeIdx <= 0 ? optsCount - 1 : activeIdx - 1

        setActiveIdx(prevActiveIndex)
      }
    },
    [activeIdx, doBlur, handleClickOption, optsCount, isFocused],
  )

  useEffect(() => {
    const el = optionsRef.current

    if (!el || activeIdx < 0 || activeIdx >= optsCount) {
      return
    }

    const optEl = el.childNodes[activeIdx] as Element

    optEl.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }, [activeIdx, optsCount])

  return (
    <div ref={rootRef} className={cns(s.root, className)}>
      {/* Input emulates default form field behaviour */}
      <input
        ref={useMergeRefs([inputRef, ref])}
        id={id}
        name={name}
        type="text"
        readOnly
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={s.input}
        onKeyDown={handleKeyDown}
      />
      <div
        className={cns(s.box, {
          [s.isFocused]: isFocused,
          [s.isError]: isError,
          [s.withFloatingIcon]: withFloatingIcon,
        })}
        onClick={handleClickBox}
      >
        <span
          className={cns(s.placeholder, {
            [s.isMoved]: Boolean(currentOption),
          })}
        >
          {placeholder}
        </span>
        {currentOption?.label}
        {currentOption?.icon && (
          <div className={s.optionIcon}>{currentOption.icon}</div>
        )}
        <div className={s.arrowWrap}>
          <ArrowIcon className={s.arrow} />
        </div>
      </div>
      {isFocused && (
        <SelectOptions optionsRef={optionsRef}>
          {options.length > 0 ? (
            options.map((option, i) => (
              <SelectOptionItem
                icon={option.icon}
                isActive={i === activeIdx}
                label={option.label}
                key={`${i}-${option.value}`}
                onMouseDown={() => handleClickOption(i)}
              />
            ))
          ) : (
            <SelectOptionsNotify>No options</SelectOptionsNotify>
          )}
        </SelectOptions>
      )}
    </div>
  )
}

export const Select = forwardRef(SelectRaw)
