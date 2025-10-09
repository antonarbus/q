import { IconButton, InputAdornment, TextField } from '@mui/material'
import { type Signal, useSignal } from '@preact/signals-react'
import { theme } from '@shared/theme'
import type { JSX } from 'react'
import { MdOutlineLock } from 'react-icons/md'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

type Props = {
  passwordSignal: Signal<string>
  onBlur?: () => void
  label?: string
  isLabelRed?: boolean
  autoFocus?: boolean
}

export const PasswordField = ({
  passwordSignal,
  onBlur,
  label,
  isLabelRed,
  autoFocus,
}: Props): JSX.Element => {
  const showPassword = useSignal(false)

  return (
    <TextField
      autoComplete='current-password'
      autoFocus={autoFocus}
      fullWidth
      label={label ?? 'Password'}
      name='password'
      onBlur={onBlur}
      onChange={(event): void => {
        passwordSignal.value = event.target.value
      }}
      placeholder='Password'
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <MdOutlineLock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onClick={(): void => {
                  showPassword.value = showPassword.value === false
                }}
              >
                {showPassword.value ? <VscEyeClosed /> : <VscEye />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiInputLabel-shrink': {
          color: isLabelRed === true ? theme.colors.red : '',
        },
        '.MuiInputBase-root': {
          background: 'white',
        },
      }}
      type={showPassword.value ? 'text' : 'password'}
      value={passwordSignal.value}
    />
  )
}
