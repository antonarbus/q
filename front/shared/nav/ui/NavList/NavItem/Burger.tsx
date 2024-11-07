import styled from '@emotion/styled'
import { dispatch, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@shared/theme'
import { Fade as BurgerIcon } from 'hamburger-react'
import { navSlice } from '../../../navSlice'
// https://hamburger-react.netlify.app/

type Props = {
  screenWidthWhenShowBurger: number
}

const BurgerContainer = styled.div<Props>`
  display: none;

  @media (max-width: ${(props): number => props.screenWidthWhenShowBurger}px) {
    display: block;
  }
`

export const Burger = (): React.JSX.Element => {
  const isOpen = useSelectorTyped((state) => state.nav.burger.isOpen)

  const screenWidthWhenShowBurger = useSelectorTyped(
    (state) => state.nav.mediaQueryWidth.burger,
  )

  return (
    <BurgerContainer
      screenWidthWhenShowBurger={screenWidthWhenShowBurger}
      data-testid='hamburger icon'
    >
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
