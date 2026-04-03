import { Box } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useKeysForMenuNavigation } from '@front/widgets/nav/handlers/useKeysForMenuNavigation'
import { navSlice } from '../../../../navSlice'
import { EmailAtBottomOfMenu } from './EmailAtBottomOfMenu'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { MenuLayout } from './MenuLayout'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'
import { useMenuNavigation } from '@front/entities/nav/provider/useMenuNavigation'

export type Props = {
  navItemRef?: { current: HTMLElement | null }
}

export const MenuContent = (props: Props): React.ReactNode => {
  const menuNavigation = useMenuNavigation()
  useKeysForMenuNavigation()

  useCloseMenuOnClickOutside({
    menuContainerRef: menuNavigation.menuContainerRef,
    navItemRef: props.navItemRef,
  })

  return (
    <MenuLayout navItemRef={props.navItemRef}>
      <Box
        ref={menuNavigation.menuContainerRef}
        className='drop-down-nav-menu'
        onMouseLeave={(): void => {
          reduxHolder.dispatch(
            navSlice.actions.setMenuItemHoverIndex({
              menuItemHoverIndex: -1,
            }),
          )
        }}
      >
        <TopMenuItemsContainer />
        <SlidableMenuItemsContainer
          className='slidable current'
          menuNavItemId={menuNavigation.currentMenuNavItemId}
          reference={menuNavigation.currentMenuRef}
        />
        <SlidableMenuItemsContainer
          className='slidable next'
          menuNavItemId={menuNavigation.nextMenuNavItemId}
          reference={menuNavigation.nextMenuRef}
        />
        <SlidableMenuItemsContainer
          className='measurable-div'
          menuNavItemId={menuNavigation.nextMenuNavItemId}
          reference={menuNavigation.fakeMenuRef}
        />
        {menuNavigation.isProfileMenu === true ? <EmailAtBottomOfMenu /> : null}
      </Box>
    </MenuLayout>
  )
}
