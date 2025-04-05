import { theme } from '@shared/theme'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { MdOutlineLock } from 'react-icons/md'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useSignal, type Signal } from '@preact/signals-react'

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
}: Props): React.JSX.Element => {
  const showPassword = useSignal(false)

  return (
    <TextField
      fullWidth
      name='password'
      label={label ?? 'Password'}
      type={showPassword.value ? 'text' : 'password'}
      autoComplete='current-password'
      placeholder='Password'
      autoFocus={autoFocus}
      value={passwordSignal.value}
      onBlur={onBlur}
      onChange={(e): void => {
        passwordSignal.value = e.target.value
      }}
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
                  showPassword.value = !showPassword.value
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
          color: isLabelRed ? theme.colors.red : '',
        },
        '.MuiInputBase-root': {
          background: 'white',
        },
      }}
    />
  )
}
