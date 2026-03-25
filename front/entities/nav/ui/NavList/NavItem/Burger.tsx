import { reduxHolder } from '@front/shared/lib/redux'
import { theme } from '@front/shared/theme'
import { Fade as BurgerIcon } from 'hamburger-react'
import { navSlice } from '../../../navSlice'

// https://hamburger-react.netlify.app/

export const Burger = (): React.JSX.Element => {
  const isOpen = reduxHolder.useSelector((state) => state.nav.burger.isOpen)

  return (
    <BurgerIcon
      color={theme.colors.greyFont}
      data-testid='hamburger icon'
      label='Show menu'
      onToggle={(): void => {
        // if (toggled) console.log('menu opened')
        // if (!toggled) reduxHolder.dispatch(closeMenu())
      }}
      rounded
      size={20}
      toggle={(): void => {
        reduxHolder.dispatch(navSlice.actions.toggleBurger())
      }}
      toggled={isOpen}
    />
  )
}
