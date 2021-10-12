import React, { useCallback, useRef, useEffect, useMemo } from 'react'
import cns from 'classnames'
import { Portal } from 'shared/ui/utils/Portal'
import { useSimpleReducer } from 'shared/hooks/useSimpleReducer'
import { isDescendant } from 'shared/utils/isDescendant'
import { getZIndex } from 'shared/utils/incrementalZIndex'
import { DropdownContext } from '../../context/DropdownContext'
import {
  DropdownPopOrigin,
  DropdownSideType,
  DropdownDirection,
  DropdownTarget,
  DropdownFashion,
} from '../../types'
// eslint-disable-next-line css-modules/no-unused-class
import s from './Dropdown.module.scss'

const TRANSFORM_ORIGINS = {
  [DropdownPopOrigin.BottomLeft]: '-12px calc(100% + 12px)',
  [DropdownPopOrigin.BottomCenter]: '50% calc(100% + 12px)',
  [DropdownPopOrigin.BottomRight]: 'calc(100% + 12px) calc(100% + 12px)',

  [DropdownPopOrigin.TopLeft]: '-12px -12px',
  [DropdownPopOrigin.TopCenter]: '50% -12px',
  [DropdownPopOrigin.TopRight]: 'calc(100% + 12px) -12px',
}

type Props = {
  minWidth?: number
  target?: DropdownTarget | null
  popOrigin?: DropdownPopOrigin
  className?: string
  children: React.ReactNode
  onClose: () => void
  closeBy?: 'unhover' | 'clickOutside'
  fashion?: DropdownFashion
}

export function Dropdown(props: Props) {
  const {
    minWidth,
    target,
    popOrigin = DropdownPopOrigin.TopRight,
    className,
    children,
    onClose,
    closeBy = 'clickOutside',
    fashion = 'default',
  } = props

  const isOpened = Boolean(target)
  const controlEl = target?.el

  const contentRef = useRef<HTMLDivElement | null>(null)

  const [state, setState] = useSimpleReducer({
    popOrigin,
    pos: { top: 0, left: 0 },
    zIndex: getZIndex(),
    isShown: false,
    isAnimInit: false,
    isAnimPhase: false,
    isMeasuring: false,
  })

  const popDirection = useMemo<DropdownDirection>(() => {
    const [p0, p1] = state.popOrigin.split('-') as [
      DropdownSideType,
      DropdownSideType,
    ]

    return {
      p: [p0, p1],
      toBot: p0 === 'top',
      toTop: p0 === 'bottom',
      toRight: p1 === 'left',
      toLeft: p1 === 'right',
      isCentered: p1 === 'center',
    }
  }, [state.popOrigin])

  const style = useMemo(
    () => ({
      ...state.pos,
      transformOrigin: TRANSFORM_ORIGINS[state.popOrigin],
      minWidth,
      zIndex: state.zIndex,
    }),
    [state.popOrigin, state.pos, state.zIndex, minWidth],
  )

  const measureAndOpen = useCallback(() => {
    const contentEl = contentRef.current

    if (!contentEl || !target) {
      return
    }

    const pos = {
      top: popDirection.toBot ? target.toBotPos : target.toTopPos,
      left: target.left,
    }
    const popDir = { ...popDirection }
    const contentRect = contentEl.getBoundingClientRect()

    // Check how dropdown fits window boundaries and change `popOrigin` if it's not

    // Change top to bottom
    if (
      popDir.toBot &&
      pos.top + contentRect.height > window.innerHeight - 10
    ) {
      pos.top = target.toTopPos
      popDir.toBot = false
      popDir.toTop = true
      popDir.p[0] = 'bottom'
    }

    // Change bottom to top
    if (popDir.toTop && pos.top - contentRect.height < 10) {
      pos.top = target.toBotPos
      popDir.toBot = true
      popDir.toTop = false
      popDir.p[0] = 'top'
    }

    // Change right to left
    if (popDir.toLeft && pos.left - contentRect.width < 10) {
      popDir.toRight = true
      popDir.toLeft = false
      popDir.p[1] = 'left'
    }

    // Change left to right
    if (
      popDir.toRight &&
      pos.left + contentRect.width > window.innerWidth - 10
    ) {
      popDir.toLeft = true
      popDir.toRight = false
      popDir.p[1] = 'right'
    }

    // Calculate `x` coordinate
    // if (popDir.toRight) {
    //   Should be fine already
    // }
    if (popDir.toLeft) {
      pos.left -= contentRect.width
    }
    if (popDir.isCentered) {
      pos.left -= contentRect.width / 2
    }

    // Calculate `y` coordinate
    if (popDir.toTop) {
      pos.top -= contentRect.height
    }
    // if (popDir.toBot) {
    //   Should be fine already
    // }

    setState({
      pos,
      popOrigin: popDir.p.join('-') as DropdownPopOrigin,
      zIndex: getZIndex(),
      isAnimInit: true,
      isMeasuring: false,
    })

    setTimeout(() => {
      setState({
        isAnimPhase: true,
      })
      setTimeout(() => {
        setState({
          isAnimInit: false,
        })
      }, 0)
    }, 0)

    // Animation Phase
    // setState({ isAnimPhase: true })
    // contentEl.addEventListener(
    //   'transitionend',
    //   () => setState({ isAnimInit: false }),
    //   {
    //     once: true,
    //   },
    // )
  }, [target, setState, popDirection])

  useEffect(() => {
    if (!isOpened) {
      return
    }

    let unhoverTimeout: number | null = null
    const ousideEvent = closeBy === 'unhover' ? 'mousemove' : 'mousedown'

    // Not using `useClickAway` from `react-use` to implement
    // this custom logic with two-element checks: `contentEl` and `controlEl`
    const handleOutsideEvent = (e: MouseEvent) => {
      const eTarget = e.target as HTMLElement | null
      const contentEl = contentRef.current

      if (
        !eTarget ||
        !contentEl ||
        isDescendant(contentEl, eTarget) ||
        (controlEl && isDescendant(controlEl, eTarget))
      ) {
        if (unhoverTimeout !== null) {
          clearTimeout(unhoverTimeout)
          unhoverTimeout = null
        }

        return
      }

      if (closeBy === 'unhover') {
        if (unhoverTimeout === null) {
          unhoverTimeout = setTimeout(onClose, 160) as any
        }
      } else {
        onClose()
      }
    }

    window.addEventListener('scroll', onClose)
    document.addEventListener(ousideEvent, handleOutsideEvent)

    return () => {
      window.removeEventListener('scroll', onClose)
      document.removeEventListener(ousideEvent, handleOutsideEvent)
    }
  }, [isOpened, onClose, closeBy, controlEl])

  useEffect(() => {
    if (isOpened) {
      setState({ isShown: true, isMeasuring: true })
    } else {
      setState({
        isShown: false,
        isMeasuring: false,
        isAnimInit: false,
        isAnimPhase: false,
      })
    }
  }, [isOpened, setState])

  useEffect(() => {
    if (state.isMeasuring) {
      measureAndOpen()
    }
  }, [state.isMeasuring, measureAndOpen])

  if (!isOpened) {
    return null
  }

  return (
    <Portal>
      <div
        ref={contentRef}
        style={style}
        className={cns(s.root, className, s[`fashion--${fashion}`], {
          [s.isShown]: state.isShown,
          [s.isAnimInit]: state.isAnimInit,
          [s.isAnimPhase]: state.isAnimPhase,
          [s.isMeasuring]: state.isMeasuring,
        })}
      >
        <DropdownContext.Provider
          value={{ fashion, handleClose: onClose }}
          children={children}
        />
      </div>
    </Portal>
  )
}
