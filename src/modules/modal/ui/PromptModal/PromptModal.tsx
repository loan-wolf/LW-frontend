import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMount } from 'react-use'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'

import s from './PromptModal.module.scss'

type Props = ModalProps & {
  title: React.ReactNode
  onSubmit: (value: string) => void
}

type FormData = {
  value: string
}

export function PromptModal({ title, onSubmit, ...modalProps }: Props) {
  const formMethods = useForm<FormData>({
    defaultValues: {
      value: '',
    },
  })

  const handleSubmit = useCallback(
    ({ value }: FormData) => onSubmit(value),
    [onSubmit],
  )

  useMount(() => {
    formMethods.setFocus('value')
  })

  return (
    <Modal {...modalProps}>
      <form action="" onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <Text size={16} weight={500} isCentered className={s.title}>
          {title}
        </Text>
        <input
          {...formMethods.register('value', { required: true })}
          type="text"
          className={s.input}
        />
        <Button isFullWidth type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  )
}
