import { TextField } from '@mui/material'
import type { CSSObject } from '@mui/material'
import { InputComponent } from './InputComponent'

type Props = {
  children: React.ReactNode
  label: string
  sx?: CSSObject
}

export const OutlinedDivWithLabel = (props: Props): React.JSX.Element => {
  return (
    <TextField
      disabled={false}
      focused={true}
      fullWidth={true}
      label={props.label}
      slotProps={{
        htmlInput: {
          children: props.children,
        },
        input: {
          slots: {
            input: InputComponent,
          },
        },
      }}
      sx={{
        fieldset: {
          borderWidth: '1px !important',
        },
        '.MuiInputBase-root': {
          lineHeight: 1.2,
          color: 'rgba(0, 0, 0, 0.87)',
          fontFamily: 'system-ui, sans-serif;',
          fontWeight: 300,
        },
        ...props.sx,
      }}
    />
  )
}
