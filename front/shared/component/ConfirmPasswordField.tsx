import { type Signal, useSignal, useSignalEffect } from '@preact/signals-react'
import { PasswordField } from './input-field/PasswordField'

type Props = {
  originalPasswordSignal: Signal<string>
  isConfirmPasswordOkSignal: Signal<boolean>
}

export const ConfirmPasswordField = (props: Props): React.JSX.Element => {
  const confirmPasswordSignal = useSignal('')
  const didBlurSignal = useSignal(false)
  const initLabel = 'Confirm password'
  const labelSignal = useSignal(initLabel)
  const isLabelRedSignal = useSignal(false)

  useSignalEffect(() => {
    props.isConfirmPasswordOkSignal.value =
      Boolean(props.originalPasswordSignal.value) &&
      props.originalPasswordSignal.value === confirmPasswordSignal.value

    isLabelRedSignal.value =
      didBlurSignal.value &&
      Boolean(props.originalPasswordSignal.value) &&
      Boolean(confirmPasswordSignal.value) &&
      props.isConfirmPasswordOkSignal.value === false

    labelSignal.value = isLabelRedSignal.value
      ? 'Passwords do not match'
      : initLabel
  })

  return (
    <PasswordField
      isLabelRed={isLabelRedSignal.value}
      label={labelSignal.value}
      onBlur={(): void => {
        didBlurSignal.value = true
      }}
      passwordSignal={confirmPasswordSignal}
    />
  )
}
