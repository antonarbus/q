import type { AccessFormValuesSignal } from '@entities/quotation'
import { Button, InputAdornment, TextField } from '@mui/material'
import type { Signal } from '@preact/signals-react'
import uniq from 'lodash.uniq'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
  emailSignal: Signal<string>
  isButtonDisabledSignal: Signal<boolean>
}

export const SharedWithEmailInputField = (props: Props): React.ReactNode => {
  if (props.accessFormValuesSignal.value.level !== 'custom') {
    return null
  }

  return (
    <TextField
      autoFocus
      focused
      onChange={(event) => {
        props.emailSignal.value = event.target.value
      }}
      placeholder='Email'
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                disabled={props.isButtonDisabledSignal.value}
                onClick={() => {
                  if (props.emailSignal.value === '') {
                    return
                  }

                  const userListWithAddedItem = uniq([
                    ...props.accessFormValuesSignal.value.userList,
                    props.emailSignal.value,
                  ])

                  props.accessFormValuesSignal.value = {
                    level: props.accessFormValuesSignal.value.level,
                    userList: userListWithAddedItem,
                  }

                  props.emailSignal.value = ''
                }}
                size='small'
                sx={{
                  fontSize: '10px',
                  padding: '0px',
                  minWidth: '30px',
                }}
                variant='contained'
              >
                Add
              </Button>
            </InputAdornment>
          ),
        },
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
      value={props.emailSignal.value}
      variant='standard'
    />
  )
}
