import { navItemId, type NavItemId } from '@entities/nav/navItemId'
import { MenuNavigationProvider } from '@entities/nav/provider/MenuNavigationProvider'
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

type MenuContentProps = {
  currentMenuNavItemId: NavItemId | null
  nextMenuNavItemId: NavItemId | null
  currentMenuRef: React.RefObject<ComponentRef<'div'> | null>
  nextMenuRef: React.RefObject<ComponentRef<'div'> | null>
  menuContainerRef: React.RefObject<ComponentRef<'div'> | null>
  fakeMenuRef: React.RefObject<ComponentRef<'div'> | null>
  navItemRef?: { current: HTMLElement | null }
  isProfileMenu: boolean
}

const MenuContent = (props: MenuContentProps): ReactNode => {
  useKeysForMenuNavigation()

  useCloseMenuOnClickOutside({
    menuContainerRef: props.menuContainerRef,
    navItemRef: props.navItemRef,
  })

  return (
    <MenuLayout navItemRef={props.navItemRef}>
      <Box
        ref={props.menuContainerRef}
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
          menuNavItemId={props.currentMenuNavItemId}
          reference={props.currentMenuRef}
        />
        <SlidableMenuItemsContainer
          className='slidable next'
          menuNavItemId={props.nextMenuNavItemId}
          reference={props.nextMenuRef}
        />
        <SlidableMenuItemsContainer
          className='measurable-div'
          menuNavItemId={props.nextMenuNavItemId}
          reference={props.fakeMenuRef}
        />
        {props.isProfileMenu === true ? <EmailAtBottomOfMenu /> : null}
      </Box>
    </MenuLayout>
  )
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

  const menuNavigation = useMenuAnimation({
    currentMenuRef,
    nextMenuRef,
    menuContainerRef,
    fakeMenuRef,
  })

  const isProfileMenu = idsToCurrentMenuItems.includes(navItemId.profile)

  return (
    <MenuNavigationProvider
      goUp={menuNavigation.goUp}
      goDown={menuNavigation.goDown}
    >
      <MenuContent
        currentMenuNavItemId={currentMenuNavItemId}
        nextMenuNavItemId={nextMenuNavItemId}
        currentMenuRef={currentMenuRef}
        nextMenuRef={nextMenuRef}
        menuContainerRef={menuContainerRef}
        fakeMenuRef={fakeMenuRef}
        navItemRef={props?.navItemRef}
        isProfileMenu={isProfileMenu}
      />
    </MenuNavigationProvider>
  )
}
