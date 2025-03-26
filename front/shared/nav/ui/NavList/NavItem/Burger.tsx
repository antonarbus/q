import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { Fade as BurgerIcon } from 'hamburger-react'
import { navSlice } from '../../../navSlice'
import { css } from '@emotion/react'

// https://hamburger-react.netlify.app/

export const Burger = (): React.JSX.Element => {
  const isOpen = useSelector((state) => state.nav.burger.isOpen)

  const screenWidthWhenShowBurger = useSelector(
    (state) => state.nav.mediaQueryWidth.burger,
  )

  return (
    <div
      data-testid='hamburger icon'
      css={css`
        display: none;

        @media (max-width: ${screenWidthWhenShowBurger}px) {
          display: block;
        }
      `}
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
    </div>
  )
}
