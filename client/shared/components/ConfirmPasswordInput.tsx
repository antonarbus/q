import { type Signal, useSignal } from '@preact/signals-react'
import { useUpdateEffect } from 'react-use'
import { PasswordInput } from './PasswordInput'

type Props = {
  originalPassword: string
  isConfirmPasswordOkSignal: Signal<boolean>
}

export const ConfirmPasswordInput = ({
  originalPassword,
  isConfirmPasswordOkSignal,
}: Props): JSX.Element => {
  const confirmPasswordSignal = useSignal('')
  const didBlurSignal = useSignal(false)
  const initLabel = 'Confirm password'
  const labelSignal = useSignal(initLabel)
  const isLabelRedSignal = useSignal(false)

  useUpdateEffect(() => {
    isConfirmPasswordOkSignal.value = !!originalPassword && originalPassword === confirmPasswordSignal.value
  }, [originalPassword, confirmPasswordSignal.value])

  useUpdateEffect(() => {
    isLabelRedSignal.value = didBlurSignal.value && !!originalPassword && !!confirmPasswordSignal.value && !isConfirmPasswordOkSignal.value
  }, [didBlurSignal.value, originalPassword, confirmPasswordSignal.value, isConfirmPasswordOkSignal.value])

  useUpdateEffect(() => {
    labelSignal.value = isLabelRedSignal.value ? 'Passwords do not match' : initLabel
  }, [isLabelRedSignal.value])

  return (
    <PasswordInput
      passwordSignal={confirmPasswordSignal}
      label={labelSignal.value}
      isLabelRed={isLabelRedSignal.value}
      onBlur={(): void => {
        didBlurSignal.value = true
      }}
    />
  )
}
