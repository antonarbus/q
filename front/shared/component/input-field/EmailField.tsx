import { InputAdornment, TextField } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import type { Signal } from '@preact/signals-react'
import { theme } from '@front/shared/theme'
import mailcheck from 'mailcheck'
import { RiUser3Line } from 'react-icons/ri'
import { z } from 'zod'

type Props = {
  emailSignal: Signal<string>
  isEmailOkSignal: Signal<boolean>
  inputRef?: React.RefObject<React.ComponentRef<'div'> | null>
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

export const EmailField = (props: Props): React.JSX.Element => {
  const emailSuggestionSignal = useSignal('')
  const initEmailLabel = props.label ?? 'Email'
  const emailLabelSignal = useSignal(initEmailLabel)
  const inputFocusedOutOnesSignal = useSignal(false)

  useSignalEffect(() => {
    props.isEmailOkSignal.value = z.email().safeParse(props.emailSignal.value).success

    const isMailPatternOk =
      inputFocusedOutOnesSignal.value &&
      props.emailSignal.value !== '' &&
      props.isEmailOkSignal.value === false

    emailLabelSignal.value = isMailPatternOk === true ? 'Check email pattern' : initEmailLabel
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
        autoComplete='email'
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        fullWidth
        inputRef={props.inputRef}
        label={emailLabelSignal.value}
        name='email'
        onBlur={(): void => {
          inputFocusedOutOnesSignal.value = true
          suggestEmail(props.emailSignal.value)
          props.onClickAway?.()
        }}
        onChange={(event): void => {
          props.emailSignal.value = event.target.value
        }}
        placeholder='Email'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <RiUser3Line />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiInputLabel-shrink': {
            color: emailLabelSignal.value === initEmailLabel ? '' : theme.color.red,
          },
          '.MuiInputBase-root': {
            background: 'white',
          },
        }}
        type='email'
        value={props.emailSignal.value}
      />
      {Boolean(emailSuggestionSignal.value) && (
        <div
          style={{
            position: 'absolute',
            bottom: '-17px',
            right: '5px',
            fontSize: '12px',
            color: theme.color.red,
          }}
        >
          Did you mean?{' '}
          <button
            type='button'
            style={{
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              font: 'inherit',
              color: theme.color.blue,
            }}
            onClick={(): void => {
              props.emailSignal.value = emailSuggestionSignal.value
              suggestEmail(emailSuggestionSignal.value)
            }}
          >
            {emailSuggestionSignal.value}
          </button>
        </div>
      )}
    </div>
  )
}
