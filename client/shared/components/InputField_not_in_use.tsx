import { InputAdornment, TextField } from '@mui/material'
import { type Signal } from '@preact/signals-react'
import { FaBook } from 'react-icons/fa'

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
              <FaBook style={{ translate: '-4px' }}/>
            </InputAdornment>
          ),
        }}
        inputProps={{
          autoComplete: 'off',
        }}
        sx={{
          mb: 2,
          '.MuiInputBase-root': {
            pl: '21px !important',
          },
        }}
      />
    </div>
  )
}
