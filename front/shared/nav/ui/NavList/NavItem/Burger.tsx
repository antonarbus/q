import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { Fade as BurgerIcon } from 'hamburger-react'
import { navSlice } from '../../../navSlice'

// https://hamburger-react.netlify.app/

export const Burger = (): React.JSX.Element => {
  const isOpen = useSelector((state) => state.nav.burger.isOpen)

  return (
    <BurgerIcon
      data-testid='hamburger icon'
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
  )
}
