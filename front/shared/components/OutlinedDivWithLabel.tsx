import { type SxProps, TextField } from '@mui/material'
import { forwardRef } from 'react'

type InputComponentProps = {
  [key: string]: unknown
  ownerState: unknown
}

const InputComponent = forwardRef(function InputComp(
  props: InputComponentProps,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element {
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

export const OutlinedDivWithLabel = ({
  children,
  label,
  sx,
}: {
  children: React.ReactNode
  label: string
  sx?: SxProps
}): JSX.Element => {
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
        ...sx,
      }}
    />
  )
}
