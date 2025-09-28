/* eslint-disable react/no-multi-comp */
import { type SxProps, TextField } from '@mui/material'
import type { JSX,ReactNode,RefObject } from 'react'

type InputComponentProps = Record<string, unknown> & {
  ref: RefObject<HTMLDivElement>
}

const InputComponent = (props: InputComponentProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownerState, ref, ...other } = props

  return (
    <div
      {...other}
      css={{
        overflow: 'hidden',
        backgroundColor: 'white',
        width: '100%',
      }}
      ref={ref}
    />
  )
}

type Props = {
  children: ReactNode
  label: string
  sx?: SxProps
}

export const OutlinedDivWithLabel = (props: Props): JSX.Element => {
  return (
    <TextField
      disabled={false}
      focused
      fullWidth
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
        // eslint-disable-next-line @typescript-eslint/no-misused-spread
        ...props.sx,
      }}
    />
  )
}
