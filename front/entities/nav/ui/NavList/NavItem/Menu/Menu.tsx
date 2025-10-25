import { navItemId } from '@entities/nav/navItemId'
import { Box, Portal } from '@mui/material'
import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { useKeysForMenuNavigation } from '@widgets/nav/handlers/useKeysForMenuNavigation'
import {
  type ComponentRef,
  type JSX,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { navSlice } from '../../../../navSlice'
import { EmailAtBottomOfMenu } from './EmailAtBottomOfMenu'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindow } from './functions/useIsMenuOutsideWindow'
import { useMenuAnimation } from './functions/useMenuAnimation'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'

type Props = {
  navItemRef?: { current: HTMLElement | null }
}

export const Menu = (props?: Props): ReactNode => {
  const menuContainerRef = useRef<ComponentRef<'div'> | null>(null)
  const currentMenuRef = useRef<ComponentRef<'div'> | null>(null)
  const nextMenuRef = useRef<ComponentRef<'div'> | null>(null)
  const fakeMenuRef = useRef<ComponentRef<'div'> | null>(null)
  const [menuPosition, setMenuPosition] = useState<{
    top: number
    left: number
    right: number
  } | null>(null)

  const currentMenuNavItemId = useSelector(
    (state) => state.nav.currentMenuNavItemId,
  )

  const nextMenuNavItemId = useSelector((state) => state.nav.nextMenuNavItemId)

  const idsToCurrentMenuItems = useSelector(
    (state) => state.nav.idsToCurrentMenuItems,
  )

  useMenuAnimation({
    currentMenuRef,
    nextMenuRef,
    menuContainerRef,
    fakeMenuRef,
  })

  useKeysForMenuNavigation()
  useCloseMenuOnClickOutside({
    menuContainerRef,
    navItemRef: props?.navItemRef,
  })

  const isMenuOutsideWindow = useIsMenuOutsideWindow()

  const isProfileMenu = idsToCurrentMenuItems.includes(navItemId.profile)

  // Calculate menu position based on parent nav item
  useEffect(() => {
    const navItem = props?.navItemRef?.current

    if (navItem) {
      const rect = navItem.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + 5,
        left: isMenuOutsideWindow ? rect.left : rect.right - theme.menu.width,
        right: window.innerWidth - rect.right,
      })
    }
  }, [isMenuOutsideWindow, props?.navItemRef])

  if (!menuPosition) {
    return null
  }

  return (
    <Portal>
      <Box
        className='drop-down-nav-menu'
        sx={{
          position: 'fixed',
          top: menuPosition ? `${menuPosition.top}px` : 'calc(100% + 5px)',
          left:
            isMenuOutsideWindow && menuPosition
              ? `${menuPosition.left}px`
              : 'auto',
          right:
            !isMenuOutsideWindow && menuPosition
              ? `${menuPosition.right}px`
              : 0,
          width: `${theme.menu.width}px`,
          paddingTop: `${theme.menu.paddingTop}px`,
          paddingBottom: `${theme.menu.paddingBottom}px`,
          overflow: 'hidden',

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
        onMouseLeave={(): void => {
          dispatch(
            navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: -1 }),
          )
        }}
        ref={menuContainerRef}
      >
        <TopMenuItemsContainer />
        <SlidableMenuItemsContainer
          className='slidable current'
          menuNavItemId={currentMenuNavItemId}
          reference={currentMenuRef}
        />
        <SlidableMenuItemsContainer
          className='slidable next'
          menuNavItemId={nextMenuNavItemId}
          reference={nextMenuRef}
        />
        <SlidableMenuItemsContainer
          className='measurable-div'
          menuNavItemId={nextMenuNavItemId}
          reference={fakeMenuRef}
        />
        {isProfileMenu === true ? <EmailAtBottomOfMenu /> : null}
      </Box>
    </Portal>
  )
}
