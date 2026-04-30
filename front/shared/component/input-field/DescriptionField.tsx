import { InputAdornment, TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'
import type { Signal } from '@preact/signals-react'
import { BsFileEarmarkText } from 'react-icons/bs'

type Props = {
  descSignal: Signal<string | undefined>
} & TextFieldProps

export const DescriptionField = (props: Props): React.JSX.Element => {
  const { descSignal, ...restProps } = props

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        disabled={false}
        fullWidth={true}
        label='Description'
        multiline={true}
        name='description'
        placeholder='Short description'
        rows={2}
        {...restProps}
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
        value={descSignal.value}
      />
    </div>
  )
}
