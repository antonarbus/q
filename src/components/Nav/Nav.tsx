import { useLayoutEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Logo } from './Logo'
import { NavList } from './NavList'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@src/store'
import { setNavMediaQueryWidths } from '@slices/navSlice'
import { calcNavMediaQueryParams } from './functions/calcNavMediaQueryParams'
import { useMenuItemActionShortcuts } from './functions/useMenuItemActionShortcuts'
import { theme } from '@src/theme'

export function Nav() {
  const navRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const logoRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const mediaQueryWidth = useSelector(state => state.nav.mediaQueryWidth)
  const dispatch = useDispatchTyped()
  useMenuItemActionShortcuts()

  useLayoutEffect(() => {
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
  }, [])

  return (
    <NavStyled
      ref={navRef}
      mediaQueryWidth={mediaQueryWidth}
    >
      <Logo logoRef={logoRef}/>
      <NavList />
    </NavStyled>
  )
}

type PropsForSC = {
  mediaQueryWidth: {
    icon: number
    name: number
    burger: number
  }
}

const NavStyled = styled.nav<PropsForSC>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  position: sticky;
  top: 5px;
  margin-top: ${theme.nav.marginTop}px;
  margin-bottom: ${theme.nav.marginBottom}px;
  margin-left: 10px;
  margin-right: 10px;
  height: ${theme.nav.height}px;
  border-radius: 4px;
  background: ${theme.colors.darkBackground};
  box-shadow: 0 0px 15px 0 #0000005c;
  z-index: 2;
  contain: layout inline-size;
  font-weight: 300;

  & > ul > li > a > .icon-round-wrapper {
    @media (max-width: ${props => props.mediaQueryWidth.icon}px) and (min-width: ${props => props.mediaQueryWidth.name}px) {
      display: none;
    }
    @media (max-width: ${props => props.mediaQueryWidth.burger}px) {
      display: none;
    }
  }

  .nav-item-name {
    @media (max-width: ${props => props.mediaQueryWidth.name}px) {
      display: none;
    }
  }

  li:not(:last-child) {
    @media (max-width: ${props => props.mediaQueryWidth.burger}px) {
      display: none;
    }
  }

  li:last-child {
    display: none;

    @media (max-width: ${props => props.mediaQueryWidth.burger}px) {
      display: flex;
    }

  }
`
