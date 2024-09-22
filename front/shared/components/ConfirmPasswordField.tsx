import { type Signal, useSignal, useSignalEffect } from '@preact/signals-react'
import { PasswordField } from './PasswordField'

type Props = {
  originalPasswordSignal: Signal<string>
  isConfirmPasswordOkSignal: Signal<boolean>
}

export const ConfirmPasswordField = ({
  originalPasswordSignal,
  isConfirmPasswordOkSignal,
}: Props): React.JSX.Element => {
  const confirmPasswordSignal = useSignal('')
  const didBlurSignal = useSignal(false)
  const initLabel = 'Confirm password'
  const labelSignal = useSignal(initLabel)
  const isLabelRedSignal = useSignal(false)

  useSignalEffect(() => {
    isConfirmPasswordOkSignal.value =
      Boolean(originalPasswordSignal.value) &&
      originalPasswordSignal.value === confirmPasswordSignal.value
    isLabelRedSignal.value =
      didBlurSignal.value &&
      Boolean(originalPasswordSignal.value) &&
      Boolean(confirmPasswordSignal.value) &&
      !isConfirmPasswordOkSignal.value
    labelSignal.value = isLabelRedSignal.value
      ? 'Passwords do not match'
      : initLabel
  })

  return (
    <PasswordField
      passwordSignal={confirmPasswordSignal}
      label={labelSignal.value}
      isLabelRed={isLabelRedSignal.value}
      onBlur={(): void => {
        didBlurSignal.value = true
      }}
    />
  )
}
