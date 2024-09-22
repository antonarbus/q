import { theme } from '@lib_instances/theme'
import { Person } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { useSignal, type Signal, useSignalEffect } from '@preact/signals-react'
import mailcheck from 'mailcheck'
import type { RefObject } from 'react'
import { isEmailPatternOk } from '../utils/isEmailPatternOk'

type Props = {
  emailSignal: Signal<string>
  isEmailOkSignal: Signal<boolean>
  inputRef?: RefObject<HTMLDivElement>
  disabled?: boolean
  onClickAway?: () => void
  label?: string
  autoFocus?: boolean
}

type Suggestion = {
  address: string
  domain: string
  full: string
}

export const EmailField = ({
  emailSignal,
  isEmailOkSignal,
  inputRef,
  disabled,
  onClickAway,
  label,
  autoFocus,
}: Props): React.JSX.Element => {
  const emailSuggestionSignal = useSignal('')
  const initEmailLabel = label ?? 'Email'
  const emailLabelSignal = useSignal(initEmailLabel)
  const inputFocusedOutOnesSignal = useSignal(false)

  useSignalEffect(() => {
    isEmailOkSignal.value = isEmailPatternOk(emailSignal.value)
    const isMailPatternOk =
      inputFocusedOutOnesSignal.value &&
      emailSignal.value !== '' &&
      !isEmailOkSignal.value
    emailLabelSignal.value = isMailPatternOk
      ? 'Check email pattern'
      : initEmailLabel
  })

  const suggestEmail = (email: string): void => {
    mailcheck.run({
      email,
      suggested: (suggestion: Suggestion) => {
        emailSuggestionSignal.value = suggestion.full
      },
      empty: () => {
        emailSuggestionSignal.value = ''
      },
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        inputRef={inputRef}
        disabled={disabled}
        fullWidth
        id='email'
        type='email'
        name='email'
        autoComplete='email'
        placeholder='Email'
        label={emailLabelSignal.value}
        autoFocus={autoFocus}
        value={emailSignal.value}
        onChange={(e): void => {
          emailSignal.value = e.target.value
        }}
        onBlur={(): void => {
          inputFocusedOutOnesSignal.value = true
          suggestEmail(emailSignal.value)
          onClickAway?.()
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Person />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputLabel-shrink': {
            color:
              emailLabelSignal.value === initEmailLabel ? '' : theme.colors.red,
          },
          '.MuiInputBase-root': {
            background: 'white',
          },
        }}
      />
      {Boolean(emailSuggestionSignal.value) && (
        <div
          style={{
            position: 'absolute',
            bottom: '-17px',
            right: '5px',
            fontSize: '12px',
            color: theme.colors.red,
          }}
        >
          Did you mean?{' '}
          <a
            style={{ textDecoration: 'underline' }}
            onClick={(e): void => {
              e.preventDefault()
              emailSignal.value = emailSuggestionSignal.value
              suggestEmail(emailSuggestionSignal.value)
            }}
          >
            {emailSuggestionSignal.value}
          </a>
        </div>
      )}
    </div>
  )
}
