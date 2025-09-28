import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { Fade as BurgerIcon } from 'hamburger-react'
import { navSlice } from '../../../navSlice'
import type { JSX } from 'react'

// https://hamburger-react.netlify.app/

export const Burger = (): JSX.Element => {
  const isOpen = useSelector((state) => state.nav.burger.isOpen)

  return (
    <BurgerIcon
      color={theme.colors.greyFont}
      data-testid='hamburger icon'
      label='Show menu'
      onToggle={(toggled): void => {
        // if (toggled) console.log('menu opened')
        // if (!toggled) dispatch(closeMenu())
      }}
      rounded
      size={20}
      toggle={(): void => {
        dispatch(navSlice.actions.toggleBurger())
      }}
      toggled={isOpen}
    />
  )
}
