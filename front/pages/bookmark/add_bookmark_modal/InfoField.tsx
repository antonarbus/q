import { InputAdornment, TextField } from '@mui/material'
import { type Signal } from '@preact/signals-react'
import { BsFileEarmarkText } from 'react-icons/bs'

type Props = {
  infoSignal: Signal<string | undefined>
}

export const InfoField = ({ infoSignal }: Props): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        disabled={false}
        fullWidth
        name='info'
        placeholder='Internal info'
        label='Info'
        multiline
        rows={4}
        value={infoSignal.value}
        onChange={(e): void => {
          infoSignal.value = e.target.value
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <BsFileEarmarkText
                style={{ height: '22px', width: '22px', translate: '0px 11px' }}
              />
            </InputAdornment>
          ),
        }}
        inputProps={{
          autoComplete: 'off',
        }}
        sx={{
          '.MuiInputBase-root': {
            alignItems: 'flex-start',
            pl: '14px !important',
            background: 'white',
          },
        }}
      />
    </div>
  )
}
