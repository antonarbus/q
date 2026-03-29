import { Box, Portal } from '@mui/material'
import { theme } from '@front/shared/theme'
import { useMemo } from 'react'
import { useIsMenuOutsideWindow } from './functions/useIsMenuOutsideWindow'

type Props = {
  children: React.ReactNode
  navItemRef?: { current: HTMLElement | null }
}

export const MenuLayout = (props: Props): React.ReactNode => {
  const isMenuOutsideWindow = useIsMenuOutsideWindow()

  // Calculate menu position based on parent nav item
  const menuPosition = useMemo(() => {
    const navItem = props.navItemRef?.current

    if (navItem instanceof HTMLElement === false) {
      return null
    }

    const rect = navItem.getBoundingClientRect()

    return {
      top: rect.bottom + 5,
      right: window.innerWidth - rect.right,
      left: rect.left,
    }
  }, [props.navItemRef])

  if (menuPosition === null) {
    return null
  }

  const leftPosition =
    isMenuOutsideWindow === true ? menuPosition.left : menuPosition.right - theme.menu.width

  return (
    <Portal>
      <Box
        className='menu-layout'
        sx={{
          position: 'fixed',
          top: `${menuPosition.top}px`,
          left: isMenuOutsideWindow === true ? `${leftPosition}px` : 'auto',
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
