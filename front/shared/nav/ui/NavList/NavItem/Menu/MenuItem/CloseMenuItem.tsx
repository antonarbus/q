import { dispatch, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { createElement, type MouseEvent } from 'react'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { navSlice } from '../../../../../navSlice'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'

const closeIcon = createElement(CloseIcon, {})

export const CloseMenuItem = (): JSX.Element => {
  const color = theme.colors.topMenuItem
  const isHovered = useSelectorTyped(
    (state) => state.nav.menuItemHoverIndex === 1,
  )

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
