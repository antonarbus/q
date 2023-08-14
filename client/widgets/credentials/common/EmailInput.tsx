import type { RefObject } from 'react'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import mailcheck from 'mailcheck'
import { InputAdornment, TextField } from '@mui/material'
import { Person } from '@mui/icons-material'
import { theme } from 'client/shared/clients'

const isEmailPatternOk = (email: string): boolean =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  )

interface Props {
  email: string
  setEmail: (value: string) => void
  isEmailOk: boolean
  setIsEmailOk: (value: boolean) => void
  inputRef?: RefObject<HTMLDivElement>
}

interface ISuggestion {
  address: string;
  domain: string;
  full: string;
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

export const EmailInput = ({
  email,
  setEmail,
  isEmailOk,
  setIsEmailOk,
  inputRef,
}: Props): JSX.Element => {
  // input focused out ones (show validation msg only after first focus out)
  const [inputFocusedOutOnes, setInputFocusedOutOnes] = useState(false)

  // is email pattern ok
  useUpdateEffect(
    // eslint-disable-next-line no-restricted-syntax
    function checkIfEmailPatternIsOk(): void {
      const isPatternOk = isEmailPatternOk(email)
      if (isPatternOk) {
        setIsEmailOk(true)
      } else {
        setIsEmailOk(false)
      }
    },
    [email],
  )

  // label msg
  const initEmailLabel = 'Email'
  const [emailLabel, setEmailLabel] = useState(initEmailLabel)
  useUpdateEffect(
    // eslint-disable-next-line no-restricted-syntax
    function setLabelMsgBasedOnValidation() {
      const isMailPatternOk = inputFocusedOutOnes && email !== '' && !isEmailOk
      if (isMailPatternOk) {
        setEmailLabel('Check email pattern')
      } else {
        setEmailLabel(initEmailLabel)
      }
    },
    [email, inputFocusedOutOnes, isEmailOk],
  )

  // email suggestion
  const [emailSuggestion, setEmailSuggestion] = useState('')

  const suggestEmail = (emailVal?: string): void => {
    mailcheck.run({
      email: emailVal ?? email,
      suggested: (suggestion: ISuggestion) => {
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
        // id="email"
        label={emailLabel}
        // name="email"
        autoFocus
        autoComplete='email'
        placeholder='Email'
        value={email}
        onChange={(e): void => {
          setEmail(e.target.value)
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
            color: emailLabel !== initEmailLabel ? theme.colors.red : '',
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
