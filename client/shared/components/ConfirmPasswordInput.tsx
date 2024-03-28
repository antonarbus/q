import { useSignal } from '@preact/signals-react'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { PasswordInput } from './PasswordInput'

type Props = {
  originalPassword: string
  isConfirmPasswordOk: boolean
  setIsConfirmPasswordOk: (value: boolean) => void
}

export const ConfirmPasswordInput = ({
  originalPassword,
  isConfirmPasswordOk,
  setIsConfirmPasswordOk,
}: Props): JSX.Element => {
  const confirmPasswordSignal = useSignal('')
  const [didBlur, setDidBlur] = useState(false)
  const initLabel = 'Confirm password'
  const [label, setLabel] = useState(initLabel)
  const [isLabelRed, setIsLabelRed] = useState(false)

  useUpdateEffect(() => {
    setIsConfirmPasswordOk(!!originalPassword && originalPassword === confirmPasswordSignal.value)
  }, [originalPassword, confirmPasswordSignal.value])

  useUpdateEffect(() => {
    setIsLabelRed(didBlur && !!originalPassword && !!confirmPasswordSignal.value && !isConfirmPasswordOk)
  }, [didBlur, originalPassword, confirmPasswordSignal.value, isConfirmPasswordOk])

  useUpdateEffect(() => {
    if (isLabelRed) {
      setLabel('Passwords do not match')
    } else {
      setLabel(initLabel)
    }
  }, [isLabelRed])

  return (
    <PasswordInput
      passwordSignal={confirmPasswordSignal}
      label={label}
      isLabelRed={isLabelRed}
      onBlur={(): void => {
        setDidBlur(true)
      }}
    />
  )
}
