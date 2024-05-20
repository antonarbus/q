import { TextField } from '@mui/material'
import { forwardRef } from 'react'

type InputComponentProps = {
  ownerState: unknown
  [key: string]: unknown
}

const InputComponent = forwardRef((props: InputComponentProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
  const { ownerState, ...other } = props

  return (
    <div
      {...other}
      ref={ref}
      css={{
        overflow: 'hidden',
        backgroundColor: 'white',
        width: '100%',
      }}
    />
  )
})

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
