import styled from '@emotion/styled'
import { Fade as BurgerIcon } from 'hamburger-react'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { toggleBurger } from '@slices/navSlice'
// https://hamburger-react.netlify.app/

export function Burger() {
  const dispatch = useDispatchTyped()
  const isOpen = useSelector(state => state.nav.burger.isOpen)
  const screenWidthWhenShowBurger = useSelector(state => state.nav.mediaQueryWidth.burger)

  return (
    <BurgerContainer screenWidthWhenShowBurger={screenWidthWhenShowBurger}>
      <BurgerIcon
        toggled={isOpen}
        toggle={() => dispatch(toggleBurger())}
        size={20}
        color='#bcbcbc'
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
