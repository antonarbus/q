import { type TextFieldProps, InputAdornment, TextField } from '@mui/material'
import type { Signal } from '@preact/signals-react'
import { BsFileEarmarkText } from 'react-icons/bs'

type Props = {
  infoSignal: Signal<string | undefined>
} & TextFieldProps

export const InfoField = ({
  infoSignal,
  ...props
}: Props): React.JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        disabled={false}
        fullWidth
        label='Info'
        multiline
        name='info'
        placeholder='Internal info'
        rows={4}
        {...props}
        onChange={(event): void => {
          infoSignal.value = event.target.value
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <BsFileEarmarkText
                  style={{
                    height: '22px',
                    width: '22px',
                  }}
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
            alignItems: 'flex-start',
            pl: '14px !important',
            background: 'white',
          },
        }}
        value={infoSignal.value}
      />
    </div>
  )
}
