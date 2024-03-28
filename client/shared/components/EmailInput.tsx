import { theme } from '@lib_instances/theme'
import { Person } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { useSignal, type Signal } from '@preact/signals-react'
import mailcheck from 'mailcheck'
import type { RefObject } from 'react'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'

const isEmailPatternOk = (email: string): boolean =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  )

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
  const [inputFocusedOutOnes, setInputFocusedOutOnes] = useState(false)

  useUpdateEffect((): void => {
    const isPatternOk = isEmailPatternOk(emailSignal.value)
    isEmailOkSignal.value = isPatternOk
  }, [emailSignal.value])

  const initEmailLabel = 'Email'
  const emailLabelSignal = useSignal(initEmailLabel)

  useUpdateEffect(() => {
    const isMailPatternOk = inputFocusedOutOnes && emailSignal.value !== '' && !isEmailOkSignal.value
    emailLabelSignal.value = isMailPatternOk ? 'Check email pattern' : initEmailLabel
  }, [emailSignal.value, inputFocusedOutOnes, isEmailOkSignal.value])

  const [emailSuggestion, setEmailSuggestion] = useState('')

  const suggestEmail = (emailVal?: string): void => {
    mailcheck.run({
      email: emailVal ?? emailSignal.value,
      suggested: (suggestion: Suggestion) => {
        setEmailSuggestion(suggestion.full)
      },
      empty: () => {
        setEmailSuggestion('')
      },
    })
  }

  return (
    <div css={{ position: 'relative' }}>
      <TextField
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
          setInputFocusedOutOnes(true)
          suggestEmail()
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
        inputRef={inputRef}
      />
      {!!emailSuggestion && (
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
              emailSignal.value = emailSuggestion
              suggestEmail(emailSuggestion)
            }}
          >
            {emailSuggestion}
          </a>
        </div>
      )}
    </div>
  )
}
