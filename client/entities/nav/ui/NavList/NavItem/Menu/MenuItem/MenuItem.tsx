import { dispatch, useSelectorTyped } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { navSlice } from '../../../../../navSlice'
import { type MenuItemTypes } from '../../../../../TMenuItem'
import { Icon } from '../../Icon'
import { RoundSpanForIcon } from '../../RoundSpanForIcon'
import { clickOnMenuItem } from './function/clickOnMenuItem'
import { MenuItemStyled } from './MenuItemStyled'
import { Shortcut } from './Shortcut'
import { TextInMenu } from './TextInMenu'

type Props = {
  menuItem: MenuItemTypes
  hoveredMenuItemIndex: number
}

export const MenuItem = ({ menuItem, hoveredMenuItemIndex }: Props): JSX.Element => {
  const isHovered = useSelectorTyped(state => state.nav.menuItemHoverIndex === hoveredMenuItemIndex)
  const isNextMenuAvailable = !!menuItem.menuItems
  const isIcon = !!menuItem.icon
  const menuId = menuItem.id
  const link = menuItem.link
  const shortcut = menuItem.shortcut
  const disabled = !!menuItem.disabled

  return (
    <MenuItemStyled
      to={link ?? '/'}
      onClick={(e: MouseEvent): void => {
        clickOnMenuItem(e, menuId, disabled)
      }}
      onMouseEnter={(): void => {
        dispatch(navSlice.actions.setMenuItemHoverIndex(hoveredMenuItemIndex))
      }}
      state={{ isHovered }}
    >
      {isIcon && <Icon icon={menuItem.icon} disabled={disabled} />}
      <TextInMenu
        reserveSpaceForIcon={isNextMenuAvailable}
        name={menuItem.name}
        disabled={disabled}
      />
      {isNextMenuAvailable && !disabled && (
        <RoundSpanForIcon
          css={{
            background: 'transparent',
            marginRight: '-5px',
            position: 'absolute',
            right: '10px',
          }}
        >
          <FaChevronRight />
        </RoundSpanForIcon>
      )}
      {shortcut && <Shortcut shortcut={shortcut} $isHovered={isHovered} />}
    </MenuItemStyled>
  )
}
