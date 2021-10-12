import cns from 'classnames'
import { useCallback, useState, Children } from 'react'
import s from './Tabs.module.scss'

type TabProps = {
  isActive?: boolean
  className?: string
  title?: React.ReactNode
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const Tab = (p: TabProps) => <>{p.children ?? null}</>

type TabsProps = {
  initialTab?: number
  currentTab?: number
  className?: string
  children?: React.ReactNode
  onChange?: (tabIndex: number) => void
}

export function Tabs({
  initialTab,
  currentTab: currentTabProp,
  className,
  children,
  onChange,
}: TabsProps) {
  const isControlled = currentTabProp !== undefined
  const [currentTabState, setCurrentTabState] = useState(initialTab || 0)
  const currentTab = isControlled ? currentTabProp : currentTabState

  const childrenArray = Children.toArray(
    children,
  ) as React.ReactElement<TabProps>[]

  const handleClickTab = useCallback(
    (idx: number) => {
      onChange?.(idx)
      if (!isControlled) setCurrentTabState(idx)
    },
    [isControlled, onChange],
  )

  return (
    <div className={className}>
      <div className={s.tabs}>
        {childrenArray.map((tab, i) => (
          <div
            key={i}
            onClick={() => handleClickTab(i)}
            className={cns(s.tab, {
              [s.isActive]: i === currentTab,
            })}
          >
            {tab.props.title}
          </div>
        ))}
      </div>
      {childrenArray[currentTab]}
    </div>
  )
}
