import { reduxHolder } from '@front/shared/lib/redux'
import { theme } from '@front/shared/theme'
import { createElement } from 'react'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { navSlice } from '../../../../../navSlice'
import { Icon } from '../../Icon'
import { MenuItemLayout } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'

const closeIcon = createElement(CloseIcon, {})

export const CloseMenuItem = (): React.JSX.Element => {
  const color = theme.colors.topMenuItem

  const isHovered = reduxHolder.useSelector((state) => state.nav.hoverIndex === 0)

  return (
    <MenuItemLayout
      isHovered={isHovered}
      onClick={(event: React.MouseEvent): void => {
        event.preventDefault()
        reduxHolder.dispatch(navSlice.actions.closeMenu())
      }}
      onMouseEnter={(): void => {
        reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }))
      }}
      to='/'
    >
      <Icon icon={closeIcon} />
      <TextInMenu name={<span style={{ color }}>Close</span>} />
    </MenuItemLayout>
  )
}
