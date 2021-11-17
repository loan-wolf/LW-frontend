import { useCallback } from 'react'
import {
  FormProvider,
  UseFormReturn,
  UseFormHandleSubmit,
} from 'react-hook-form'

type Props<TFieldValues> = {
  formMethods: UseFormReturn<TFieldValues>
  onSubmit: Parameters<UseFormHandleSubmit<TFieldValues>>[0]
  className?: string
  children?: React.ReactNode
}

export function Form<TFieldValues>({
  formMethods,
  onSubmit,
  className,
  children,
}: Props<TFieldValues>) {
  const submit = useCallback(
    async (...args: Parameters<typeof onSubmit>) => {
      try {
        await onSubmit(...args)
      } catch (error) {
        console.error(error)
      }
    },
    [onSubmit],
  )
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(submit)}
        className={className}
        children={children}
      />
    </FormProvider>
  )
}
