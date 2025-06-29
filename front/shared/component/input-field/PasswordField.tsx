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
