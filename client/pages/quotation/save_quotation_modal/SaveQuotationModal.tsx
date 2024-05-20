import { getState, useSelectorTyped } from '@lib_instances/store'
import { Box, Chip, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import uniq from 'lodash.uniq'
import { useRef } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi'
import { MdSaveAlt, MdGroups, MdGroupOff } from 'react-icons/md'
import { useSaveQuotation } from '@features/quotation/save_quotation'
import { EmailField, FormModal, OutlinedDivWithLabel } from '@shared/components'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'

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

  const sharedToSignal = useSignal<SharedOptions>(sharedToOptions.none)
  const emailToShareSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)
  const emailsToShareSignal = useSignal<string[]>([])

  console.log('🚀 ~ emailsToShareSignal.value:', emailsToShareSignal.value)

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
      <NameField key='name-field' nameSignal={nameSignal}/>
      <CategoryField key='category-field' categorySignal={categorySignal}/>
      <DescriptionField key='description-field' descSignal={descSignal} />

      <OutlinedDivWithLabel key='name-field' label='Share'>
        <Box
          sx={{
            display: 'flex',
            padding: '5px',
          }}
        >
          <Box
            sx={{
              width: '50px',
              flexShrink: 0,
            }}
          >
            <FiShare2 style={{ height: '22px', width: '22px', translate: '6px 10px', opacity: 0.5 }}/>
          </Box>
          <RadioGroup
            name='controlled-radio-buttons-group'
            value={sharedToSignal.value}
            onChange={(event): void => {
              const value = event.target.value as SharedOptions
              sharedToSignal.value = value
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
                disabled={sharedToSignal.value === sharedToOptions.none}
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
                disabled={sharedToSignal.value === sharedToOptions.anyone}
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
              <BsFillPersonPlusFill style={{ opacity: 0.7 }}/>
              <FormControlLabel
                value={sharedToOptions.persons}
                label={sharedToOptions.persons}
                disabled={sharedToSignal.value === sharedToOptions.persons}
                control={<Radio size='small' />}
              />
            </Box>
          </RadioGroup>
        </Box>
      </OutlinedDivWithLabel>

      {sharedToSignal.value === sharedToOptions.persons && (
        <EmailField
          key='email-field'
          emailSignal={emailToShareSignal}
          isEmailOkSignal={isEmailOkSignal}
          onClickAway={() => {
            if (isEmailOkSignal.value) {
              emailsToShareSignal.value = uniq([...emailsToShareSignal.value, emailToShareSignal.value])
              emailToShareSignal.value = ''
            }
          }}
        />
      )}

      {sharedToSignal.value === sharedToOptions.persons && emailsToShareSignal.value.length > 0 && (
        <Box
          key='emails-chips'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {emailsToShareSignal.value.map(email => {
            return (
              <Chip
                label={email}
                onDelete={() => {
                  emailsToShareSignal.value = emailsToShareSignal.value
                    .filter(emailInArray => emailInArray !== email)
                }}
                sx={{
                  width: 'min-content',
                  m: '2px',
                }}
              />
            )
          })}
        </Box>
      )}
    </FormModal>
  )
}
