import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { createElement, type MouseEvent } from 'react'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { navSlice } from '../../../../../navSlice'
import { Icon } from '../../Icon'
import { MenuItemLayout } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'

const closeIcon = createElement(CloseIcon, {})

export const CloseMenuItem = (): React.JSX.Element => {
  const color = theme.colors.topMenuItem

  const isHovered = useSelector((state) => state.nav.hoverIndex === 0)

  return (
    <MenuItemLayout
      isHovered={isHovered}
      onClick={(event: MouseEvent): void => {
        event.preventDefault()
        dispatch(navSlice.actions.closeMenu())
      }}
      onMouseEnter={(): void => {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )
      }}
      to='/'
    >
      <Icon icon={closeIcon} />
      <TextInMenu name={<span style={{ color }}>Close</span>} />
    </MenuItemLayout>
  )
}
