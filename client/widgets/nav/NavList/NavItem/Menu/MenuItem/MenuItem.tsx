import { FaChevronRight } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIcon } from '../../RoundSpanForIcon'
import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { Shortcut } from './Shortcut'
import { clickOnMenuItem } from './function/clickOnMenuItem'
import type { MenuItemTypes } from 'client/entities/nav'
import { setMenuItemHoverIndex } from 'client/entities/nav'
import type { MouseEvent } from 'react'

interface Props {
  menuItem: MenuItemTypes
  hoveredMenuItemIndex: number
}

export const MenuItem = ({ menuItem, hoveredMenuItemIndex }: Props): JSX.Element => {
  const dispatch = useDispatchTyped()
  const isHovered = useSelectorTyped(
    (state) => state.nav.menuItemHoverIndex === hoveredMenuItemIndex,
  )
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
        dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex))
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
