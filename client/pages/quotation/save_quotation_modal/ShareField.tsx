import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { type Signal, useSignal } from '@preact/signals-react'
import { AnimatePresence, motion } from 'framer-motion'
import uniq from 'lodash.uniq'
import { useEffect } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { MdGroups, MdGroupOff } from 'react-icons/md'
import { type Quotation } from '@entities/quotation'
import { OutlinedDivWithLabel } from '@shared/components'
import {
  type SharedWithOption,
  sharedWithOption,
} from '@shared/consts/sharedWithOption'
import { isEmailPatternOk } from '@shared/utils/isEmailPatternOk'

type Props = {
  shareWithOptionSignal: Signal<SharedWithOption>
  sharedWithSignal: Signal<Quotation['sharedWith']>
}

export const ShareField = ({
  shareWithOptionSignal,
  sharedWithSignal,
}: Props): JSX.Element => {
  const emailSignal = useSignal('')
  const isButtonDisabledSignal = useSignal(true)
  const [chipsParent] = useAutoAnimate()

  useEffect(
    function disableButton() {
      const isEmailOk = isEmailPatternOk(emailSignal.value)
      isButtonDisabledSignal.value = !isEmailOk
    },
    [emailSignal.value],
  )

  return (
    <OutlinedDivWithLabel label='Share'>
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
                const value = event.target.value as SharedWithOption
                shareWithOptionSignal.value = value

                if (
                  shareWithOptionSignal.value === sharedWithOption.everybody
                ) {
                  sharedWithSignal.value = ['*']
                }

                if (shareWithOptionSignal.value === sharedWithOption.nobody) {
                  sharedWithSignal.value = []
                }

                if (shareWithOptionSignal.value === sharedWithOption.persons) {
                  // to make it empty as initial unshared option
                  sharedWithSignal.value = []
                }
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
                <MdGroupOff style={{ opacity: 0.7 }} />
                <FormControlLabel
                  value={sharedWithOption.nobody}
                  label={sharedWithOption.nobody}
                  disabled={
                    shareWithOptionSignal.value === sharedWithOption.nobody
                  }
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
                <MdGroups
                  style={{ opacity: 0.7, scale: '1.2', translate: '-1px 0px' }}
                />
                <FormControlLabel
                  value={sharedWithOption.everybody}
                  label={sharedWithOption.everybody}
                  disabled={
                    shareWithOptionSignal.value === sharedWithOption.everybody
                  }
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
                <BsFillPersonPlusFill style={{ opacity: 0.7 }} />
                <FormControlLabel
                  value={sharedWithOption.persons}
                  label={sharedWithOption.persons}
                  disabled={
                    shareWithOptionSignal.value === sharedWithOption.persons
                  }
                  control={<Radio size='small' />}
                />
              </Box>
            </RadioGroup>
            {shareWithOptionSignal.value === sharedWithOption.persons && (
              <TextField
                autoFocus
                focused
                variant='standard'
                placeholder='Email'
                value={emailSignal.value}
                onChange={(e) => {
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
                        disabled={isButtonDisabledSignal.value}
                        onClick={() => {
                          if (emailSignal.value === '') return

                          sharedWithSignal.value = uniq([
                            ...sharedWithSignal.value,
                            emailSignal.value,
                          ]).filter((item) => item !== '*')
                          emailSignal.value = ''
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
          {shareWithOptionSignal.value === sharedWithOption.persons &&
            sharedWithSignal.value.length > 0 && (
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
                {sharedWithSignal.value
                  .filter((item) => item !== '*')
                  .map((email) => {
                    return (
                      <Chip
                        key={email}
                        label={email}
                        onDelete={() => {
                          sharedWithSignal.value =
                            sharedWithSignal.value.filter(
                              (emailInArray) => emailInArray !== email,
                            )
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
