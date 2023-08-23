import type { MouseEvent } from 'react'
import { createElement } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { MenuItemStyled } from './MenuItemStyled'
import { navSlice } from 'client/entities/nav'
import { dispatch, theme } from 'client/shared/clients'
import { useSelectorTyped } from 'client/shared/hooks'

const closeIcon = createElement(CloseIcon, {})

export const CloseMenuItem = (): JSX.Element => {
  const color = theme.colors.topMenuItem
  const isHovered = useSelectorTyped(state => state.nav.menuItemHoverIndex === 1)

  return (
    <MenuItemStyled
      to='/'
      onClick={(e: MouseEvent): void => {
        e.preventDefault()
        dispatch(navSlice.actions.closeMenu())
      }}
      onMouseEnter={(): void => {
        dispatch(navSlice.actions.setMenuItemHoverIndex(1))
      }}
      state={{ isHovered }}
    >
      <Icon icon={closeIcon} />
      <TextInMenu name={<span style={{ color }}>Close</span>} />
    </MenuItemStyled>
  )
}
