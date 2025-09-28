import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { useRef } from 'react'
import type { JSX,ComponentRef } from 'react'
import { navSlice } from '../../../../navSlice'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindow } from './functions/useIsMenuOutsideWindow'
import { useKeysForMenuNavigation } from './functions/useKeysForMenuNavigation'
import { useMenuAnimation } from './functions/useMenuAnimation'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'
import { EmailAtBottomOfMenu } from './EmailAtBottomOfMenu'
import { css } from '@emotion/react'
import { navItemId } from '@shared/const/navItemId'

export const Menu = (): JSX.Element => {
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
  useCloseMenuOnClickOutside({ menuContainerRef })

  const isMenuOutsideWindow = useIsMenuOutsideWindow()

  const isProfileMenu = idsToCurrentMenuItems.includes(navItemId.profile)

  return (
    <div
      className='drop-down-nav-menu'
      css={css`
        position: absolute;
        top: calc(100% + 5px);
        right: 0;
        /* if right corner goes over the screen fix the left instead of right */
        left: ${isMenuOutsideWindow === true ? '0' : 'not set'};
        width: ${theme.menu.width}px;
        padding-top: ${theme.menu.paddingTop}px;
        padding-bottom: ${theme.menu.paddingBottom}px;
        background: ${theme.colors.darkBackground};
        backdrop-filter: blur(4px);
        border: 1px solid #474a4d;
        border-radius: 4px;
        overflow: hidden;

        @media screen and (width <= 480px) {
          left: 0px;
          right: 0px;
          width: auto;
        }

        .slidable {
          position: absolute;
          right: 0px;
          left: 0px;
          height: auto;
        }

        .next {
          transform: translateX(100%);
        }

        .measurable-div {
          transform: translateX(9999px);
        }
      `}
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
    </div>
  )
}
