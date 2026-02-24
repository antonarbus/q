import { useState, useCallback } from 'react'
import { Box, Popover } from '@mui/material'
import { RiArrowDropDownLine } from 'react-icons/ri'

type Props = {
  onClick?: () => void
  isActive: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
  dropdownContent: React.ReactNode
}

export const MenuButtonWithDropdown = (props: Props): React.JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleArrowClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setAnchorEl(event.currentTarget)
    },
    [],
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const baseButtonSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '28px',
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '4px',
          overflow: 'hidden',
          opacity: props.disabled === true ? 0.5 : 1,
          pointerEvents: props.disabled === true ? 'none' : 'auto',
        }}
      >
        <Box
          component='button'
          type='button'
          title={props.title}
          onMouseDown={(event: React.MouseEvent) => {
            event.preventDefault()
          }}
          onClick={props.onClick ?? handleArrowClick}
          sx={{
            ...baseButtonSx,
            minWidth: '28px',
            padding: '4px 6px',
            backgroundColor:
              props.isActive === true ? '#d8d8d87d' : 'transparent',
            ':hover': {
              backgroundColor:
                props.isActive === true ? '#d8d8d87d' : '#eaeaea',
            },
          }}
        >
          {props.children}
        </Box>
        <Box
          component='button'
          type='button'
          title={`${props.title} colors`}
          onMouseDown={(event: React.MouseEvent) => {
            event.preventDefault()
          }}
          onClick={handleArrowClick}
          sx={{
            ...baseButtonSx,
            padding: '0 2px',
            backgroundColor: 'transparent',
            '&:hover': {
              scale: 1.3,
              transition: 'scale 0.2s ease',
            },
          }}
        >
          <RiArrowDropDownLine size={16} />
        </Box>
      </Box>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock
        disableRestoreFocus
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '8px',
              mt: '2px',
            },
          },
        }}
      >
        <Box onClick={handleClose}>{props.dropdownContent}</Box>
      </Popover>
    </>
  )
}
