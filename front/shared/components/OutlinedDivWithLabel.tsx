/* eslint-disable react/no-multi-comp */
import { type SxProps, TextField } from '@mui/material'

type InputComponentProps = Record<string, unknown> & {
  ref: React.RefObject<HTMLDivElement>
}

const InputComponent = (props: InputComponentProps): React.JSX.Element => {
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
  children: React.ReactNode
  label: string
  sx?: SxProps
}

export const OutlinedDivWithLabel = (props: Props): React.JSX.Element => {
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
