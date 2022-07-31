import styled from 'styled-components'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { useRef } from 'react'
import { useMenuAnimation } from './functions/useMenuAnimation'
import { useKeysForMenuNavigation } from './functions/useKeysForMenuNavigation'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindow } from './functions/useIsMenuOutsideWindow'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'
import { setMenuItemHoverIndex } from '@slices/navSlice'
import { globalObject } from '@src/globalObject'

export function Menu() {
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const idsToNextMenuItems = useSelector(state => state.nav.idsToNextMenuItems)
  const idsToCurrentMenuItems = useSelector(state => state.nav.idsToCurrentMenuItems)
  const { goDownInMenu, goUpInMenu } = useMenuAnimation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, idsToNextMenuItems: idsToNextMenuItems })
  globalObject.goDownInMenu = goDownInMenu
  globalObject.goUpInMenu = goUpInMenu
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
  right: -${props => props.theme.menu.navItem.marginRight}px;
  /* if right corner goes over the screen fix the left instead of right */
  left: ${props => props.isMenuOutsideWindow ? '0' : 'not set'};
  width: ${props => props.theme.menu.width}px;
  padding-top: ${props => props.theme.menu.paddingTop}px;
  padding-bottom: ${props => props.theme.menu.paddingBottom}px;
  background: rgb(52 52 52 / 98%);
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
