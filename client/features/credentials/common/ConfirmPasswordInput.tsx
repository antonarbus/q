import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { PasswordInput } from './PasswordInput'

type TProps = {
  originalPassword: string,
  isConfirmPasswordOk: boolean
  setIsConfirmPasswordOk: (value: boolean) => void
}

/**
 * Confirmation password input field, based on PasswordInput component
 * @param props props
 * @param props.originalPassword original password
 * @param props.isConfirmPasswordOk boolean state, need to pass it from parent because action button is disabled based on this state
 * @param props.setIsConfirmPasswordOk isConfirmPasswordOk state setter
 */

export function ConfirmPasswordInput({ originalPassword, isConfirmPasswordOk, setIsConfirmPasswordOk }: TProps) {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [didBlur, setDidBlur] = useState(false)
  const initLabel = 'Confirm password'
  const [label, setLabel] = useState(initLabel)
  const [isLabelRed, setIsLabelRed] = useState(false)

  useUpdateEffect(() => setIsConfirmPasswordOk(!!originalPassword && originalPassword === confirmPassword), [originalPassword, confirmPassword])
  useUpdateEffect(() => setIsLabelRed(didBlur && !!originalPassword && !!confirmPassword && !isConfirmPasswordOk), [didBlur, originalPassword, confirmPassword, isConfirmPasswordOk])
  useUpdateEffect(() => isLabelRed ? setLabel('Passwords do not match') : setLabel(initLabel), [isLabelRed])

  return (
    <PasswordInput
      password={confirmPassword}
      setPassword={setConfirmPassword}
      onBlur={() => setDidBlur(true)}
      label={label}
      isLabelRed={isLabelRed}
    />
  )
}
