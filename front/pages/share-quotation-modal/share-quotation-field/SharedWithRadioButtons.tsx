import type { AccessFormValuesSignal, Quotation } from '@entities/quotation'
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import type { JSX } from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { MdGroupOff, MdGroups } from 'react-icons/md'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const SharedWithRadioButtons = (props: Props): JSX.Element => {
  return (
    <RadioGroup
      name='controlled-radio-buttons-group'
      onChange={(_event, value): void => {
        const getIsCorrectValue = (
          radioButtonValue: string,
        ): radioButtonValue is Quotation['access']['level'] => {
          const isCorrect =
            radioButtonValue === 'everyone' ||
            radioButtonValue === 'nobody' ||
            radioButtonValue === 'custom'

          return isCorrect
        }

        const isCorrectValue = getIsCorrectValue(value)

        if (isCorrectValue === true) {
          props.accessFormValuesSignal.value = {
            level: value,
            // do not remove email list when click radio buttons
            // erase the list for 'everyone' | 'nobody' on save
            userList: props.accessFormValuesSignal.value.userList,
          }
        }
      }}
      sx={{
        '.MuiRadio-root': {
          padding: '5px',
        },
      }}
      value={props.accessFormValuesSignal.value.level}
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
          control={<Radio size='small' />}
          disabled={props.accessFormValuesSignal.value.level === 'nobody'}
          label='Nobody'
          value='nobody'
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
          control={<Radio size='small' />}
          disabled={props.accessFormValuesSignal.value.level === 'everyone'}
          label='Everyone'
          value='everyone'
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
          control={<Radio size='small' />}
          disabled={props.accessFormValuesSignal.value.level === 'custom'}
          label='Custom'
          value='custom'
        />
      </Box>
    </RadioGroup>
  )
}
