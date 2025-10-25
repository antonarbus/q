import { navItemId } from '@entities/nav/navItemId'
import { Box } from '@mui/material'
import { dispatch, useSelector } from '@shared/lib/redux'
import { useKeysForMenuNavigation } from '@widgets/nav/handlers/useKeysForMenuNavigation'
import { type ComponentRef, type ReactNode, useRef } from 'react'
import { navSlice } from '../../../../navSlice'
import { EmailAtBottomOfMenu } from './EmailAtBottomOfMenu'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useMenuAnimation } from './functions/useMenuAnimation'
import { MenuLayout } from './MenuLayout'
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

  const isProfileMenu = idsToCurrentMenuItems.includes(navItemId.profile)

  return (
    <MenuLayout navItemRef={props?.navItemRef}>
      <Box
        ref={menuContainerRef}
        className='drop-down-nav-menu'
        onMouseLeave={(): void => {
          dispatch(
            navSlice.actions.setMenuItemHoverIndex({
              menuItemHoverIndex: -1,
            }),
          )
        }}
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
    </MenuLayout>
  )
}
