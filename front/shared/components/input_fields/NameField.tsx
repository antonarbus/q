import { type TextFieldProps, InputAdornment, TextField } from '@mui/material'
import type { Signal } from '@preact/signals-react'
import { PiBooks } from 'react-icons/pi'

type Props = {
  nameSignal: Signal<string | undefined>
} & TextFieldProps

export const NameField = ({
  nameSignal,
  ...props
}: Props): React.JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        placeholder='Name'
        label='Name'
        name='name'
        autoFocus
        fullWidth
        {...props}
        value={nameSignal.value}
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
      />
    </div>
  )
}
