import { Box } from '@mui/material'

type Props = {
  onClick: () => void
  isActive: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}

export const MenuButton = (props: Props): React.JSX.Element => (
  <Box
    component='button'
    type='button'
    disabled={props.disabled}
    onMouseDown={(event: React.MouseEvent) => {
      event.preventDefault()
    }}
    onClick={props.onClick}
    title={props.title}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '28px',
      height: '28px',
      padding: '4px 8px',
      border: 'none',
      borderRadius: '4px',
      cursor: props.disabled === true ? 'default' : 'pointer',
      pointerEvents: props.disabled === true ? 'none' : 'auto',
      fontSize: 14,
      opacity: props.disabled === true ? 0.5 : 1,
      backgroundColor: props.isActive === true ? '#dcdcdc' : 'transparent',
      ':hover': {
        backgroundColor: props.isActive === true ? '#dcdcdc' : '#eaeaea',
      },
    }}
  >
    {props.children}
  </Box>
)
