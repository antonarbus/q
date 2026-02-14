import { InputAdornment, TextField, type TextFieldProps } from '@mui/material'
import type { Signal } from '@preact/signals-react'
import { BsFileEarmarkText } from 'react-icons/bs'

type Props = {
  infoSignal: Signal<string | undefined>
} & TextFieldProps

export const InfoField = (props: Props): React.JSX.Element => {
  const { infoSignal, ...restProps } = props

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
        {...restProps}
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
