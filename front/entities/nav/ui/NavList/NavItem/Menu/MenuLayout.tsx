import { Box, Portal } from '@mui/material'
import { theme } from '@shared/theme'
import { type ReactNode, useEffect, useState } from 'react'
import { useIsMenuOutsideWindow } from './functions/useIsMenuOutsideWindow'

type Props = {
  children: ReactNode
  navItemRef?: { current: HTMLElement | null }
}

export const MenuLayout = (props: Props): ReactNode => {
  const [menuPosition, setMenuPosition] = useState<{
    top: number
    left: number
    right: number
  } | null>(null)

  const isMenuOutsideWindow = useIsMenuOutsideWindow()

  // Calculate menu position based on parent nav item
  useEffect(() => {
    const navItem = props.navItemRef?.current

    if (navItem instanceof HTMLElement) {
      const rect = navItem.getBoundingClientRect()

      setMenuPosition({
        top: rect.bottom + 5,
        right: window.innerWidth - rect.right,
        left:
          isMenuOutsideWindow === true
            ? rect.left
            : rect.right - theme.menu.width,
      })
    }
  }, [isMenuOutsideWindow, props.navItemRef])

  if (menuPosition === null) {
    return null
  }

  console.log('🚀 ~ menuPosition:', menuPosition)

  return (
    <Portal>
      <Box
        className='menu-layout'
        sx={{
          position: 'fixed',
          top: `${menuPosition.top}px`,
          left:
            isMenuOutsideWindow === true ? `${menuPosition.left}px` : 'auto',
          right: isMenuOutsideWindow === false ? `${menuPosition.right}px` : 0,
          width: `${theme.menu.width}px`,
          paddingTop: `${theme.menu.paddingTop}px`,
          paddingBottom: `${theme.menu.paddingBottom}px`,
          overflow: 'hidden',
          zIndex: 666,

          // liquid glass
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          boxShadow:
            '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',

          '@media screen and (width <= 480px) ': {
            left: '0px',
            right: '0px',
            width: 'auto',
          },
          '.slidable': {
            position: 'absolute',
            right: '0px',
            left: '0px',
            height: 'auto',
          },
          '.next': {
            transform: 'translateX(100%)',
          },
          '.measurable-div': {
            transform: 'translateX(9999px)',
          },
        }}
      >
        {props.children}
      </Box>
    </Portal>
  )
}
