import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { useRef } from 'react'
import { navSlice } from '../../../../navSlice'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindow } from './functions/useIsMenuOutsideWindow'
import { useKeysForMenuNavigation } from './functions/useKeysForMenuNavigation'
import { useMenuAnimation } from './functions/useMenuAnimation'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'
import { EmailAtBottomOfMenu } from './EmailAtBottomOfMenu'
import { css } from '@emotion/react'

export const Menu = (): React.JSX.Element => {
  const menuContainerRef = useRef<React.ComponentRef<'div'> | null>(null)
  const currentMenuRef = useRef<React.ComponentRef<'div'> | null>(null)
  const nextMenuRef = useRef<React.ComponentRef<'div'> | null>(null)
  const fakeMenuRef = useRef<React.ComponentRef<'div'> | null>(null)

  const idsToNextMenuItems = useSelector(
    (state) => state.nav.idsToNextMenuItems,
  )

  const idsToCurrentMenuItems = useSelector(
    (state) => state.nav.idsToCurrentMenuItems,
  )

  useMenuAnimation({
    currentMenuRef,
    nextMenuRef,
    menuContainerRef,
    fakeMenuRef,
    idsToNextMenuItems,
  })

  useKeysForMenuNavigation()
  useCloseMenuOnClickOutside({ menuContainerRef })

  const isMenuOutsideWindow = useIsMenuOutsideWindow()
  const isProfileMenu = idsToCurrentMenuItems.includes('profile')

  return (
    <div
      ref={menuContainerRef}
      className='drop-down-nav-menu'
      onMouseLeave={(): void => {
        dispatch(navSlice.actions.setMenuItemHoverIndex(0))
      }}
      css={css`
        position: absolute;
        top: calc(100% + 5px);
        right: 0;
        /* if right corner goes over the screen fix the left instead of right */
        left: ${isMenuOutsideWindow ? '0' : 'not set'};
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
    >
      <TopMenuItemsContainer />
      <SlidableMenuItemsContainer
        reference={currentMenuRef}
        idsToMenu={idsToCurrentMenuItems}
        className='slidable current'
      />
      <SlidableMenuItemsContainer
        reference={nextMenuRef}
        idsToMenu={idsToNextMenuItems}
        className='slidable next'
      />
      <SlidableMenuItemsContainer
        reference={fakeMenuRef}
        idsToMenu={idsToNextMenuItems}
        className='measurable-div'
      />
      {isProfileMenu && <EmailAtBottomOfMenu />}
    </div>
  )
}
