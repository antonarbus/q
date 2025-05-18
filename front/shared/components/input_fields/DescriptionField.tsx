import { type TextFieldProps, InputAdornment, TextField } from '@mui/material'
import type { Signal } from '@preact/signals-react'
import { BsFileEarmarkText } from 'react-icons/bs'

type Props = {
  descSignal: Signal<string | undefined>
} & TextFieldProps

export const DescriptionField = ({
  descSignal,
  ...props
}: Props): React.JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        disabled={false}
        fullWidth
        name='description'
        placeholder='Short description'
        label='Description'
        multiline
        rows={2}
        {...props}
        value={descSignal.value}
        onChange={(event): void => {
          descSignal.value = event.target.value
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
      />
    </div>
  )
}
