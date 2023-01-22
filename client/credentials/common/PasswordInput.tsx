import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { theme } from 'client/theme'
import { EventType } from 'client/types'
import { useState } from 'react'

type Props = {
  password: string
  setPassword: (value: string) => void
  onBlur?: () => void
  label?: string
  isLabelRed?: boolean
}

/**
 * Password input field with an eye
 * @param props props
 * @param props.password password string value state
 * @param props.setPassword password state setter
 * @param props.onBlur optional handler function, used in ConfirmPasswordInput to start comparing passwords only after focusing out
 * @param props.label label
 */

export function PasswordInput({ password, setPassword, onBlur, label, isLabelRed }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      fullWidth
      name='password'
      label={label || 'Password'}
      type={showPassword ? 'text' : 'password'}
      autoComplete='new-password'
      placeholder='Password'
      value={password}
      onChange={(e: EventType) => setPassword((e.target as HTMLInputElement).value)}
      onBlur={onBlur}
      sx={{
        mb: 2,
        '& .MuiInputLabel-shrink': {
          color: isLabelRed ? theme.colors.red : ''
        }
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
              onClick={() => setShowPassword(!showPassword)}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}
