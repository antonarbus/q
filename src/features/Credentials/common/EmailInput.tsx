import { useState } from 'react'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import mailcheck from 'mailcheck'
import { InputAdornment, TextField } from '@mui/material'
import { Person } from '@mui/icons-material'
import { theme } from '@src/theme'
import { EventType } from '@src/types'

const isEmailPatternOk = (email: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

type Props = {
  email: string
  setEmail: (value: string) => void
  isEmailOk: boolean
  setIsEmailOk: (value: boolean) => void
  inputRef?: React.MutableRefObject<HTMLDivElement>
}

/**
 * Email input field with pattern validation and email suggestion
 * @param props props
 * @param props.email email string value state
 * @param props.setEmail email state setter
 * @param props.isEmailOk  email pattern check state, may be needed to disable action button
 * @param props.setIsEmailOk state setter for email pattern check
 * @param props.inputRef reference to the input element, for ex. to put a focus on
 */

export function EmailInput({ email, setEmail, isEmailOk, setIsEmailOk, inputRef }: Props) {
  // input focused out ones (show validation msg only after first focus out)
  const [inputFocusedOutOnes, setInputFocusedOutOnes] = useState(false)

  // is email pattern ok
  useUpdateEffect(function checkIfEmailPatternIsOk() {
    isEmailPatternOk(email) ? setIsEmailOk(true) : setIsEmailOk(false)
  }, [email])

  // label msg
  const initEmailLabel = 'Email'
  const [emailLabel, setEmailLabel] = useState(initEmailLabel)
  useUpdateEffect(function setLabelMsgBasedOnValidation() {
    (inputFocusedOutOnes && email !== '' && !isEmailOk) ? setEmailLabel('Check email pattern') : setEmailLabel(initEmailLabel)
  }, [email, inputFocusedOutOnes, isEmailOk])

  // email suggestion
  const [emailSuggestion, setEmailSuggestion] = useState('')

  function suggestEmail(emailVal?: string) {
    mailcheck.run({
      email: emailVal || email,
      suggested: (suggestion: any) => setEmailSuggestion(suggestion.full),
      empty: () => setEmailSuggestion('')
    })
  }

  return (
    <div css={{ position: 'relative' }}>
      <TextField
        fullWidth
        // id="email"
        label={emailLabel}
        // name="email"
        autoFocus
        autoComplete="email"
        placeholder='Email'
        value={email}
        onChange={(e: EventType) => setEmail((e.target as HTMLInputElement).value)}
        onBlur={() => {
          setInputFocusedOutOnes(true)
          suggestEmail()
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Person /></InputAdornment>
        }}
        sx={{
          '& .MuiInputLabel-shrink': {
            color: (emailLabel !== initEmailLabel) ? theme.colors.red : ''
          },
          mb: 2
        }}
        inputRef={inputRef}
      />
      {!!emailSuggestion && (
        <div css={{ position: 'absolute', bottom: '18px', right: '5px', fontSize: '12px', color: theme.colors.red }} >
          Did you mean? {' '}
          <a
            style={{ textDecoration: 'underline' }}
            onClick={(e) => {
              e.preventDefault()
              setEmail(emailSuggestion)
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
