import { InputAdornment, TextField } from '@mui/material'
import { type Signal } from '@preact/signals-react'
import { PiBooks } from 'react-icons/pi'

type Props = {
  nameSignal: Signal<string>
}

export const NameInput = ({ nameSignal }: Props): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        disabled={false}
        fullWidth
        name='name'
        placeholder='Item name'
        label='Item name'
        autoFocus
        value={nameSignal.value}
        onChange={(e): void => {
          nameSignal.value = e.target.value
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PiBooks style={{ height: '22px', width: '22px', translate: '0px' }}/>
            </InputAdornment>
          ),
        }}
        inputProps={{
          autoComplete: 'off',
        }}
        sx={{
          mb: 2,
          '.MuiInputBase-root': {
            pl: '14px !important',
          },
        }}
      />
    </div>
  )
}
