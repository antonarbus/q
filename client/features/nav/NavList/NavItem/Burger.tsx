import styled from '@emotion/styled'
import { Fade as BurgerIcon } from 'hamburger-react'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { toggleBurger } from 'client/features/nav/navSlice'
import { theme } from 'client/theme'
// https://hamburger-react.netlify.app/

export function Burger() {
  const dispatch = useDispatchTyped()
  const isOpen = useSelectorTyped(state => state.nav.burger.isOpen)
  const screenWidthWhenShowBurger = useSelectorTyped(state => state.nav.mediaQueryWidth.burger)

  return (
    <BurgerContainer screenWidthWhenShowBurger={screenWidthWhenShowBurger}>
      <BurgerIcon
        toggled={isOpen}
        toggle={() => dispatch(toggleBurger())}
        size={20}
        color={theme.colors.greyFont}
        rounded
        label='Show menu'
        onToggle={toggled => {
          // if (toggled) console.log('menu opened')
          // if (!toggled) dispatch(closeMenu())
        }}
      />
    </BurgerContainer>
  )
}
type PropsForSC = {
  screenWidthWhenShowBurger: number
}

const BurgerContainer = styled.div<PropsForSC>`
  display: none;

  @media (max-width: ${props => props.screenWidthWhenShowBurger}px) {
    display: block;
  }
`
