import styled from '@emotion/styled'
import { useRef } from 'react'
import { dispatch, theme } from '@shared/clients'
import { useSelectorTyped } from '@shared/hooks'
import { navSlice } from '../../../../navSlice'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindow } from './functions/useIsMenuOutsideWindow'
import { useKeysForMenuNavigation } from './functions/useKeysForMenuNavigation'
import { useMenuAnimation } from './functions/useMenuAnimation'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'

type Props = {
  isMenuOutsideWindow: boolean
}

export const MenuStyled = styled.div<Props>`
  position: absolute;
  top: calc(100% + 5px);
  right: -${theme.menu.navItem.marginRight}px;
  /* if right corner goes over the screen fix the left instead of right */
  left: ${(props): string => (props.isMenuOutsideWindow ? '0' : 'not set')};
  width: ${theme.menu.width}px;
  padding-top: ${theme.menu.paddingTop}px;
  padding-bottom: ${theme.menu.paddingBottom}px;
  background: ${theme.colors.darkBackground};
  backdrop-filter: blur(4px);
  border: 1px solid #474a4d;
  border-radius: 4px;
  overflow: hidden;
  z-index: 666;

  @media screen and (max-width: 480px) {
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
`

export const Menu = (): JSX.Element => {
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const currentMenuRef = useRef<HTMLDivElement>(null)
  const nextMenuRef = useRef<HTMLDivElement>(null)
  const fakeMenuRef = useRef<HTMLDivElement>(null)
  const idsToNextMenuItems = useSelectorTyped(state => state.nav.idsToNextMenuItems)
  const idsToCurrentMenuItems = useSelectorTyped(state => state.nav.idsToCurrentMenuItems)
  useMenuAnimation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, idsToNextMenuItems })
  useKeysForMenuNavigation()
  useCloseMenuOnClickOutside({ menuContainerRef })
  const isMenuOutsideWindow = useIsMenuOutsideWindow()

  return (
    <MenuStyled
      ref={menuContainerRef}
      isMenuOutsideWindow={isMenuOutsideWindow}
      onMouseLeave={(): void => {
        dispatch(navSlice.actions.setMenuItemHoverIndex(0))
      }}
      className='drop-down-nav-menu'
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
        className='slidable
        next'
      />
      <SlidableMenuItemsContainer
        reference={fakeMenuRef}
        idsToMenu={idsToNextMenuItems}
        className='measurable-div'
      />
    </MenuStyled>
  )
}
