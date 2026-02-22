import { useState, useCallback } from 'react'
import { Box, Popover } from '@mui/material'
import { RiArrowDropDownLine } from 'react-icons/ri'

export type DropdownColorItem = {
  label: string
  color: string
  onClick: () => void
}

type Props = {
  onClick: () => void
  isActive: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
  dropdownItems: DropdownColorItem[]
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

  const mainButtonSx = {
    ...baseButtonSx,
    backgroundColor: props.isActive === true ? '#dcdcdc' : 'transparent',
    ':hover': {
      backgroundColor: props.isActive === true ? '#dcdcdc' : '#eaeaea',
    },
  }

  const arrowButtonSx = {
    ...baseButtonSx,
    backgroundColor: 'transparent',
    ':hover': { backgroundColor: '#eaeaea' },
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
          onClick={props.onClick}
          sx={{ ...mainButtonSx, minWidth: '28px', padding: '4px 6px' }}
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
          sx={{ ...arrowButtonSx, padding: '0 2px' }}
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
        slotProps={{ paper: { sx: { borderRadius: '8px', mt: '2px' } } }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 18px)',
            gap: '5px',
            p: 1,
          }}
        >
          {props.dropdownItems.map((item) => (
            <Box
              key={item.label}
              component='button'
              type='button'
              title={item.label}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
              }}
              onClick={() => {
                item.onClick()
                handleClose()
              }}
              sx={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '1.5px solid rgba(0,0,0,0.15)',
                backgroundColor: item.color,
                cursor: 'pointer',
                padding: 0,
                transition: 'transform 0.1s, box-shadow 0.1s',
                ':hover': {
                  transform: 'scale(1.15)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                },
              }}
            />
          ))}
        </Box>
      </Popover>
    </>
  )
}
