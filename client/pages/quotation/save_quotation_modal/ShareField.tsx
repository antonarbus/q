import { useAutoAnimate } from '@formkit/auto-animate/react'
import { theme } from '@lib_instances/theme'
import { Box, Button, Chip, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import { type Signal, useSignal } from '@preact/signals-react'
import { AnimatePresence, motion } from 'framer-motion'
import uniq from 'lodash.uniq'
import { useEffect, useRef } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { MdGroups, MdGroupOff } from 'react-icons/md'
import { OutlinedDivWithLabel } from '@shared/components'
import { isEmailPatternOk } from '@shared/utils/isEmailPatternOk'

const sharedWithOptions = {
  none: 'none',
  anyone: 'anyone',
  persons: 'persons',
} as const

export type SharedOptions = (typeof sharedWithOptions)[keyof typeof sharedWithOptions]

type Props = {
  shareWithOptionSignal: Signal<SharedOptions>
  emailsSharedWithSignal: Signal<string[]>
}

export const ShareField = ({ shareWithOptionSignal, emailsSharedWithSignal }: Props): JSX.Element => {
  const emailSignal = useSignal('')
  const labelSignal = useSignal('Share')
  const shouldMonitorIfEmailIsOkRef = useRef(false)
  const [chipsParent] = useAutoAnimate()

  useEffect(function monitorIfEmailIsOk() {
    if (shouldMonitorIfEmailIsOkRef.current) {
      const isEmailOk = isEmailPatternOk(emailSignal.value)
      labelSignal.value = isEmailOk ? 'Share' : 'Check email'
    }
  }, [emailSignal.value])

  return (
    <OutlinedDivWithLabel
        label={labelSignal.value}
        sx={{
          '.MuiInputLabel-shrink': {
            color: labelSignal.value !== 'Share' ? theme.colors.red : '',
          },
        }}
      >
        <Box
          sx={{
            padding: '10px 10px 10px 20px',
          }}
        >
          <AnimatePresence initial={false}>
            <Box
              key='radio-buttons'
              sx={{
                display: 'flex',
              }}
            >
              <RadioGroup
                name='controlled-radio-buttons-group'
                value={shareWithOptionSignal.value}
                onChange={(event): void => {
                  const value = event.target.value as SharedOptions
                  shareWithOptionSignal.value = value
                }}
                sx={{
                  '.MuiRadio-root': {
                    padding: '5px',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <MdGroupOff style={{ opacity: 0.7 }}/>
                  <FormControlLabel
                    value={sharedWithOptions.none}
                    label={sharedWithOptions.none}
                    disabled={shareWithOptionSignal.value === sharedWithOptions.none}
                    control={<Radio size='small' />}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <MdGroups style={{ opacity: 0.7, scale: '1.2', translate: '-1px 0px' }}/>
                  <FormControlLabel
                    value={sharedWithOptions.anyone}
                    label={sharedWithOptions.anyone}
                    disabled={shareWithOptionSignal.value === sharedWithOptions.anyone}
                    control={<Radio size='small' />}
                  />
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <BsFillPersonPlusFill style={{ opacity: 0.7 }}/>
                  <FormControlLabel
                    value={sharedWithOptions.persons}
                    label={sharedWithOptions.persons}
                    disabled={shareWithOptionSignal.value === sharedWithOptions.persons}
                    control={<Radio size='small' />}
                  />
                </Box>
              </RadioGroup>
              {shareWithOptionSignal.value === sharedWithOptions.persons && (
                <TextField
                  autoFocus
                  focused
                  variant='standard'
                  placeholder='Email'
                  value={emailSignal.value}
                  onChange={e => {
                    emailSignal.value = e.target.value
                  }}
                  sx={{
                    position: 'relative',
                    bottom: '5px',
                    flexGrow: 1,
                    alignSelf: 'self-end',
                    input: {
                      fontSize: '12px',
                      padding: '4px',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Button
                          variant='contained'
                          size='small'
                          sx={{
                            fontSize: '10px',
                            padding: '0px',
                            minWidth: '30px',
                          }}
                          onClick={() => {
                            if (emailSignal.value === '') return
                            const isEmailOk = isEmailPatternOk(emailSignal.value)

                            if (isEmailOk) {
                              shouldMonitorIfEmailIsOkRef.current = false
                              labelSignal.value = 'Share'
                              emailsSharedWithSignal.value = uniq([...emailsSharedWithSignal.value, emailSignal.value])
                              emailSignal.value = ''
                              return
                            }

                            if (!isEmailOk) {
                              shouldMonitorIfEmailIsOkRef.current = true
                              labelSignal.value = 'Check email'
                            }
                          }}
                        >
                          Add
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Box>
            {shareWithOptionSignal.value === sharedWithOptions.persons && emailsSharedWithSignal.value.length > 0 && (
              <Box
                ref={chipsParent}
                key='emails-chips'
                component={motion.div}
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'row-reverse',
                }}
              >
                {emailsSharedWithSignal.value.map(email => {
                  return (
                    <Chip
                      key={email}
                      label={email}
                      onDelete={() => {
                        emailsSharedWithSignal.value = emailsSharedWithSignal.value
                          .filter(emailInArray => emailInArray !== email)
                      }}
                      sx={{
                        width: 'min-content',
                        margin: '2px',
                        fontSize: '12px',
                      }}
                    />
                  )
                })}
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </OutlinedDivWithLabel>
  )
}
