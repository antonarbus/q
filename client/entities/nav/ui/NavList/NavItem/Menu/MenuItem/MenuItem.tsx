import { dispatch, useSelectorTyped } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { navSlice } from '../../../../../navSlice'
import { type MenuItemType } from '../../../../../type/MenuItemType'
import { Icon } from '../../Icon'
import { RoundSpanForIcon } from '../../RoundSpanForIcon'
import { SpinnerIcon } from '../../SpinnerIcon'
import { clickOnMenuItem } from './function/clickOnMenuItem'
import { MenuItemStyled } from './MenuItemStyled'
import { Shortcut } from './Shortcut'
import { TextInMenu } from './TextInMenu'

type Props = {
  menuItem: MenuItemType
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
  const isLoading = menuItem?.isLoading

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
      {isIcon && !isLoading && <Icon icon={menuItem.icon} disabled={disabled} />}
      {isIcon && isLoading && <SpinnerIcon />}
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
