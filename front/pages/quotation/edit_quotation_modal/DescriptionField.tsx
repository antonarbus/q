import { InputAdornment, TextField } from '@mui/material'
import { type Signal } from '@preact/signals-react'
import { BsFileEarmarkText } from 'react-icons/bs'

type Props = {
  descSignal: Signal<string>
}

export const DescriptionField = ({ descSignal }: Props): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        disabled={false}
        fullWidth
        name='description'
        placeholder='Description'
        label='Description'
        multiline
        rows={2}
        value={descSignal.value}
        onChange={(e): void => {
          descSignal.value = e.target.value
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
