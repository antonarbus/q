import { theme } from '@lib_instances/theme'
import { Person } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { useSignal, type Signal, useSignalEffect } from '@preact/signals-react'
import mailcheck from 'mailcheck'
import type { RefObject } from 'react'

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isEmailPatternOk = (email: string): boolean => emailRegExp.test(email)

type Props = {
  emailSignal: Signal<string>
  isEmailOkSignal: Signal<boolean>
  inputRef?: RefObject<HTMLDivElement>
}

type Suggestion = {
  address: string
  domain: string
  full: string
}

export const EmailInput = ({ emailSignal, isEmailOkSignal, inputRef }: Props): JSX.Element => {
  const emailSuggestionSignal = useSignal('')
  const initEmailLabel = 'Email'
  const emailLabelSignal = useSignal(initEmailLabel)
  const inputFocusedOutOnesSignal = useSignal(false)

  useSignalEffect(() => {
    isEmailOkSignal.value = isEmailPatternOk(emailSignal.value)
    const isMailPatternOk = inputFocusedOutOnesSignal.value && emailSignal.value !== '' && !isEmailOkSignal.value
    emailLabelSignal.value = isMailPatternOk ? 'Check email pattern' : initEmailLabel
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
    <div css={{ position: 'relative' }}>
      <TextField
        inputRef={inputRef}
        fullWidth
        id='email'
        type='email'
        name='email'
        autoComplete='email'
        placeholder='Email'
        label={emailLabelSignal.value}
        autoFocus
        value={emailSignal.value}
        onChange={(e): void => {
          emailSignal.value = e.target.value
        }}
        onBlur={(): void => {
          inputFocusedOutOnesSignal.value = true
          suggestEmail(emailSignal.value)
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
            color: emailLabelSignal.value !== initEmailLabel ? theme.colors.red : '',
          },
          mb: 2,
        }}
      />
      {!!emailSuggestionSignal.value && (
        <div
          css={{
            position: 'absolute',
            bottom: '18px',
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
