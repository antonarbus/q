import { type TextFieldProps, InputAdornment, TextField } from '@mui/material'
import type { Signal } from '@preact/signals-react'
import { PiBooks } from 'react-icons/pi'
import type { JSX } from 'react'

type Props = {
  nameSignal: Signal<string | undefined>
} & TextFieldProps

export const NameField = ({ nameSignal, ...props }: Props): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        autoFocus
        fullWidth
        label='Name'
        name='name'
        placeholder='Name'
        {...props}
        onChange={(event): void => {
          nameSignal.value = event.target.value
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <PiBooks
                  style={{ height: '22px', width: '22px', translate: '0px' }}
                />
              </InputAdornment>
            ),
          },
          htmlInput: {
            autoComplete: 'off',
          },
        }}
        sx={{
          '.MuiInputBase-root': {
            pl: '14px !important',
            background: 'white',
          },
        }}
        value={nameSignal.value}
      />
    </div>
  )
}
