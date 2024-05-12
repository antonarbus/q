import { TextField } from '@mui/material'

const InputComponent = ({ ...props }): JSX.Element => (
  <div
    {...props}
    css={{
      overflow: 'hidden',
      backgroundColor: 'white',
    }}
  />
)

export const OutlinedDivWithLabel = ({ children, label }: { children: React.ReactNode, label: string }): JSX.Element => {
  return (
    <TextField
      disabled={false}
      fullWidth
      focused
      label={label}
      inputProps={{
        children,
      }}
      InputProps={{
        slots: {
          input: InputComponent,
        },
      }}
      sx={{
        fieldset: {
          borderWidth: '1px !important',
        },
      }}

    />
  )
}
