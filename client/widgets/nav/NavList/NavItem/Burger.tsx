import styled from '@emotion/styled'
import { Fade as BurgerIcon } from 'hamburger-react'
import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { navSlice } from 'client/entities/nav'
import { theme } from 'client/shared/clients'
// https://hamburger-react.netlify.app/

interface Props {
  screenWidthWhenShowBurger: number
}

const BurgerContainer = styled.div<Props>`
  display: none;

  @media (max-width: ${(props): number => props.screenWidthWhenShowBurger}px) {
    display: block;
  }
`

export const Burger = (): JSX.Element => {
  const dispatch = useDispatchTyped()
  const isOpen = useSelectorTyped(state => state.nav.burger.isOpen)
  const screenWidthWhenShowBurger = useSelectorTyped(state => state.nav.mediaQueryWidth.burger)

  return (
    <BurgerContainer screenWidthWhenShowBurger={screenWidthWhenShowBurger}>
      <BurgerIcon
        toggled={isOpen}
        toggle={(): void => {
          dispatch(navSlice.actions.toggleBurger())
        }}
        size={20}
        color={theme.colors.greyFont}
        rounded
        label='Show menu'
        onToggle={(toggled): void => {
          // if (toggled) console.log('menu opened')
          // if (!toggled) dispatch(closeMenu())
        }}
      />
    </BurgerContainer>
  )
}
