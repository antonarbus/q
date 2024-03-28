import { type Signal, useSignal, useSignalEffect } from '@preact/signals-react'
import { useUpdateEffect } from 'react-use'
import { PasswordInput } from './PasswordInput'

type Props = {
  originalPasswordSignal: Signal<string>
  isConfirmPasswordOkSignal: Signal<boolean>
}

export const ConfirmPasswordInput = ({ originalPasswordSignal, isConfirmPasswordOkSignal }: Props): JSX.Element => {
  const confirmPasswordSignal = useSignal('')
  const didBlurSignal = useSignal(false)
  const initLabel = 'Confirm password'
  const labelSignal = useSignal(initLabel)
  const isLabelRedSignal = useSignal(false)

  useSignalEffect(() => {
    isConfirmPasswordOkSignal.value = !!originalPasswordSignal.value && originalPasswordSignal.value === confirmPasswordSignal.value
    isLabelRedSignal.value = didBlurSignal.value && !!originalPasswordSignal.value && !!confirmPasswordSignal.value && !isConfirmPasswordOkSignal.value
    labelSignal.value = isLabelRedSignal.value ? 'Passwords do not match' : initLabel
  })

  // useUpdateEffect(() => {
  // }, [didBlurSignal.value, originalPasswordSignal.value, confirmPasswordSignal.value, isConfirmPasswordOkSignal.value])

  // useUpdateEffect(() => {
  // }, [isLabelRedSignal.value])

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
