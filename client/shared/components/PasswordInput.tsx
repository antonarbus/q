import { theme } from '@lib_instances/theme'
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { type Signal } from '@preact/signals-react'
import { useState } from 'react'

type Props = {
  passwordSignal: Signal<string>
  onBlur?: () => void
  label?: string
  isLabelRed?: boolean
}

export const PasswordInput = ({
  passwordSignal,
  onBlur,
  label,
  isLabelRed,
}: Props): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      fullWidth
      name='password'
      label={label ?? 'Password'}
      type={showPassword ? 'text' : 'password'}
      autoComplete='current-password'
      placeholder='Password'
      value={passwordSignal.value}
      onBlur={onBlur}
      onChange={(e): void => {
        passwordSignal.value = e.target.value
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Lock />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              edge='end'
              onClick={(): void => {
                setShowPassword(!showPassword)
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 2,
        '& .MuiInputLabel-shrink': {
          color: isLabelRed ? theme.colors.red : '',
        },
      }}
    />
  )
}
