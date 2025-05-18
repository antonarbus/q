import { theme } from '@shared/theme'
import { RiUser3Line } from 'react-icons/ri'
import { InputAdornment, TextField } from '@mui/material'
import { useSignal, type Signal, useSignalEffect } from '@preact/signals-react'
import mailcheck from 'mailcheck'
import { isEmailPatternOk } from '../../utils/isEmailPatternOk'

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
      isEmailOkSignal.value === false

    emailLabelSignal.value =
      isMailPatternOk === true ? 'Check email pattern' : initEmailLabel
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
        autoFocus={autoFocus}
        disabled={disabled}
        fullWidth
        id='email'
        inputRef={inputRef}
        label={emailLabelSignal.value}
        name='email'
        onBlur={(): void => {
          inputFocusedOutOnesSignal.value = true
          suggestEmail(emailSignal.value)
          onClickAway?.()
        }}
        onChange={(event): void => {
          emailSignal.value = event.target.value
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
            color:
              emailLabelSignal.value === initEmailLabel ? '' : theme.colors.red,
          },
          '.MuiInputBase-root': {
            background: 'white',
          },
        }}
        type='email'
        value={emailSignal.value}
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
            onClick={(event): void => {
              event.preventDefault()
              emailSignal.value = emailSuggestionSignal.value
              suggestEmail(emailSuggestionSignal.value)
            }}
            style={{ textDecoration: 'underline' }}
          >
            {emailSuggestionSignal.value}
          </a>
        </div>
      )}
    </div>
  )
}
