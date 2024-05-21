import { useAutoAnimate } from '@formkit/auto-animate/react'
import { getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Box, Chip, FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { AnimatePresence, motion } from 'framer-motion'
import uniq from 'lodash.uniq'
import { useEffect, useRef } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { IoAddCircleOutline } from 'react-icons/io5'
import { MdSaveAlt, MdGroups, MdGroupOff } from 'react-icons/md'
import { useSaveQuotation } from '@features/quotation/save_quotation'
import { FormModal, OutlinedDivWithLabel } from '@shared/components'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isEmailPatternOk = (email: string): boolean => emailRegExp.test(email)

export const SaveQuotationModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(getState().quotation.name ?? '')
  const categorySignal = useSignal(getState().quotation.category ?? '')
  const descSignal = useSignal(getState().quotation.desc ?? '')
  const { onSubmit, isPending, isSuccess, isError } = useSaveQuotation({ modalRef, nameSignal, categorySignal, descSignal })
  const id = useSelectorTyped(state => state.quotation.id)
  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  const sharedToOptions = {
    none: 'none',
    anyone: 'anyone',
    persons: 'persons',
  } as const

  type SharedOptions = (typeof sharedToOptions)[keyof typeof sharedToOptions]

  const shareToOptionSignal = useSignal<SharedOptions>(sharedToOptions.none)
  const emailToSignal = useSignal('')
  const emailsToSignal = useSignal<string[]>([])
  const labelSignal = useSignal('Share')

  const shouldMonitorIfEmailIsOkRef = useRef(false)

  const [chipsParent] = useAutoAnimate()

  useEffect(() => {
    if (shouldMonitorIfEmailIsOkRef.current) {
      const isEmailOk = isEmailPatternOk(emailToSignal.value)
      labelSignal.value = isEmailOk ? 'Share' : 'Check email'
    }
  }, [emailToSignal.value])

  return (
    <FormModal
      modalRef={modalRef}
      width='450px'
      paddingContent='50px 40px'
      headerText='Save quotation'
      headerIcon={<MdSaveAlt />}
      buttonText={id === 'new' ? 'SAVE' : 'UPDATE'}
      isButtonDisabled={isDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <NameField nameSignal={nameSignal}/>
      <CategoryField categorySignal={categorySignal}/>
      <DescriptionField descSignal={descSignal} />

      <OutlinedDivWithLabel
        label={labelSignal.value}
        sx={{
          '& .MuiInputLabel-shrink': {
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
                value={shareToOptionSignal.value}
                onChange={(event): void => {
                  const value = event.target.value as SharedOptions
                  shareToOptionSignal.value = value
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
                    value={sharedToOptions.none}
                    label={sharedToOptions.none}
                    disabled={shareToOptionSignal.value === sharedToOptions.none}
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
                    value={sharedToOptions.anyone}
                    label={sharedToOptions.anyone}
                    disabled={shareToOptionSignal.value === sharedToOptions.anyone}
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
                    value={sharedToOptions.persons}
                    label={sharedToOptions.persons}
                    disabled={shareToOptionSignal.value === sharedToOptions.persons}
                    control={<Radio size='small' />}
                  />
                </Box>
              </RadioGroup>
              {shareToOptionSignal.value === sharedToOptions.persons && (
                <TextField
                  autoFocus
                  focused
                  variant='standard'
                  placeholder='Email'
                  value={emailToSignal.value}
                  onChange={e => {
                    emailToSignal.value = e.target.value
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
                        <IconButton
                          size='small'
                          onClick={() => {
                            if (emailToSignal.value === '') return
                            const isEmailOk = isEmailPatternOk(emailToSignal.value)

                            if (isEmailOk) {
                              shouldMonitorIfEmailIsOkRef.current = false
                              labelSignal.value = 'Share'
                              emailsToSignal.value = uniq([...emailsToSignal.value, emailToSignal.value])
                              emailToSignal.value = ''
                              return
                            }

                            if (!isEmailOk) {
                              shouldMonitorIfEmailIsOkRef.current = true
                              labelSignal.value = 'Check email'
                            }
                          }}
                        >
                          <IoAddCircleOutline />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Box>
            {shareToOptionSignal.value === sharedToOptions.persons && emailsToSignal.value.length > 0 && (
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
                {emailsToSignal.value.map(email => {
                  return (
                    <Chip
                      key={email}
                      label={email}
                      onDelete={() => {
                        emailsToSignal.value = emailsToSignal.value
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

    </FormModal>
  )
}
