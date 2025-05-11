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
import { useSignal } from '@preact/signals-react'
import { AnimatePresence, motion } from 'motion/react'
import uniq from 'lodash.uniq'
import { useEffect } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { MdGroups, MdGroupOff } from 'react-icons/md'
import type { AccessFormValuesSignal, Quotation } from '@entities/quotation'
import { OutlinedDivWithLabel } from '@shared/components/OutlinedDivWithLabel'
import { isEmailPatternOk } from '@shared/utils/isEmailPatternOk'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const ShareQuotationField = ({
  accessFormValuesSignal,
}: Props): React.JSX.Element => {
  const emailSignal = useSignal('')
  const isButtonDisabledSignal = useSignal(true)
  const [chipsParent] = useAutoAnimate()

  // disable button
  useEffect(() => {
    const isEmailOk = isEmailPatternOk(emailSignal.value)
    isButtonDisabledSignal.value = !isEmailOk
  }, [emailSignal.value])

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
              value={accessFormValuesSignal.value.level}
              onChange={(event): void => {
                const selectedAccessLevel = event.target
                  .value as Quotation['access']['level']

                accessFormValuesSignal.value = {
                  level: selectedAccessLevel,
                  userList: accessFormValuesSignal.value.userList,
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
                  value='nobody'
                  label='Nobody'
                  control={<Radio size='small' />}
                  disabled={accessFormValuesSignal.value.level === 'nobody'}
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
                  value='everyone'
                  label='Everyone'
                  control={<Radio size='small' />}
                  disabled={accessFormValuesSignal.value.level === 'everyone'}
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
                  value='custom'
                  label='Custom'
                  control={<Radio size='small' />}
                  disabled={accessFormValuesSignal.value.level === 'custom'}
                />
              </Box>
            </RadioGroup>
            {accessFormValuesSignal.value.level === 'custom' && (
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
                slotProps={{
                  input: {
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
                            if (emailSignal.value === '') {
                              return
                            }

                            const userListWithAddedItem = uniq([
                              ...accessFormValuesSignal.value.userList,
                              emailSignal.value,
                            ])

                            accessFormValuesSignal.value = {
                              level: accessFormValuesSignal.value.level,
                              userList: userListWithAddedItem,
                            }

                            emailSignal.value = ''
                          }}
                        >
                          Add
                        </Button>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          </Box>
          {accessFormValuesSignal.value.level === 'custom' &&
            accessFormValuesSignal.value.userList.length > 0 && (
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
                {accessFormValuesSignal.value.userList.map((email) => {
                  return (
                    <Chip
                      key={email}
                      label={email}
                      onDelete={() => {
                        const userListWithoutDeletedItem =
                          accessFormValuesSignal.value.userList.filter(
                            (emailInArray) => emailInArray !== email,
                          )

                        accessFormValuesSignal.value = {
                          level: accessFormValuesSignal.value.level,
                          userList: userListWithoutDeletedItem,
                        }
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
