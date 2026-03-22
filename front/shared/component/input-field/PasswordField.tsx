import { IconButton, InputAdornment, TextField } from '@mui/material'
import { type Signal, useSignal } from '@preact/signals-react'
import { theme } from '@front/shared/theme'
import { MdOutlineLock } from 'react-icons/md'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

type Props = {
  passwordSignal: Signal<string>
  onBlur?: () => void
  label?: string
  isLabelRed?: boolean
  autoFocus?: boolean
}

export const PasswordField = (props: Props): React.JSX.Element => {
  const showPassword = useSignal(false)

  return (
    <TextField
      autoComplete='current-password'
      autoFocus={props.autoFocus}
      fullWidth
      label={props.label ?? 'Password'}
      name='password'
      onBlur={props.onBlur}
      onChange={(event): void => {
        props.passwordSignal.value = event.target.value
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
          color: props.isLabelRed === true ? theme.colors.red : '',
        },
        '.MuiInputBase-root': {
          background: 'white',
        },
      }}
      type={showPassword.value ? 'text' : 'password'}
      value={props.passwordSignal.value}
    />
  )
}
