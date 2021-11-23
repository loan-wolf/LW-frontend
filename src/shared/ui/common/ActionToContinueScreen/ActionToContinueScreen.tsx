import React from 'react'
import { Text } from 'shared/ui/common/Text'

import s from './ActionToContinueScreen.module.scss'

type Props = {
  title: React.ReactNode
  actionTitle: React.ReactNode
  actionText: React.ReactNode
  actionHint: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function ActionToContinueScreen({
  title,
  actionTitle,
  actionText,
  actionHint,
  onClick,
}: Props) {
  return (
    <div className={s.wrap}>
      <Text
        size={16}
        weight={500}
        color="secondary"
        isUppercased
        isCentered
        className={s.title}
      >
        {title}
      </Text>

      <button className={s.button} type="button" onClick={onClick}>
        <Text size={12} weight={500} color="secondary" isUppercased>
          {actionTitle}
        </Text>
        <Text
          size={36}
          weight={700}
          color="inherit"
          isUppercased
          className={s.buttonMainText}
        >
          {actionText}
        </Text>
        <Text size={12} weight={500} color="secondary" isUppercased>
          {actionHint}
        </Text>
      </button>
    </div>
  )
}
