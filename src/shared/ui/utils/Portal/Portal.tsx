import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

const popsAndModalsRoot = document.getElementById('pops-and-modals')

type Props = {
  children?: React.ReactNode
}

export function Portal({ children }: Props) {
  const { current: state } = useRef({
    el: document.createElement('div'),
  })

  useEffect(() => {
    popsAndModalsRoot?.appendChild(state.el)
    return () => {
      popsAndModalsRoot?.removeChild(state.el)
    }
  }, [state])

  return ReactDOM.createPortal(children, state.el)
}
