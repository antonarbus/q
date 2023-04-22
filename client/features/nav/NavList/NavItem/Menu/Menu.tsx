import styled from '@emotion/styled'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { useRef } from 'react'
import { useMenuAnimation } from './functions/useMenuAnimation'
import { useKeysForMenuNavigation } from './functions/useKeysForMenuNavigation'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindow } from './functions/useIsMenuOutsideWindow'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'
import { setMenuItemHoverIndex } from 'client/features/nav/navSlice'
import { theme } from 'client/theme'

export function Menu() {
  const menuContainerRef = useRef() as RefDivType
  const currentMenuRef = useRef() as RefDivType
  const nextMenuRef = useRef() as RefDivType
  const fakeMenuRef = useRef() as RefDivType
  const idsToNextMenuItems = useSelectorTyped(state => state.nav.idsToNextMenuItems)
  const idsToCurrentMenuItems = useSelectorTyped(state => state.nav.idsToCurrentMenuItems)
  useMenuAnimation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, idsToNextMenuItems })
  useKeysForMenuNavigation()
  useCloseMenuOnClickOutside({ menuContainerRef })
  const isMenuOutsideWindow = useIsMenuOutsideWindow()
  const dispatch = useDispatchTyped()

  return (
    <MenuStyled
      ref={menuContainerRef}
      isMenuOutsideWindow={isMenuOutsideWindow}
      onMouseLeave={() => dispatch(setMenuItemHoverIndex(0))}
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

type PropsForSC = {
  isMenuOutsideWindow: boolean
}

export const MenuStyled = styled.div<PropsForSC>`
  position: absolute;
  top: calc(100% + 5px);
  right: -${theme.menu.navItem.marginRight}px;
  /* if right corner goes over the screen fix the left instead of right */
  left: ${props => props.isMenuOutsideWindow ? '0' : 'not set'};
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
