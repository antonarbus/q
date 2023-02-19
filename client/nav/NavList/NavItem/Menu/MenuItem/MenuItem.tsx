import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIcon } from '../../RoundSpanForIcon'
import { MenuType } from 'client/nav/navStructure'
import { setMenuItemHoverIndex } from 'client/nav/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from 'client/store'
import { Shortcut } from './Shortcut'
import { clickOnMenuItem } from './function/clickOnMenuItem'

type MenuItemType = {
  menuItem: MenuType
  hoveredMenuItemIndex: number
}

export function MenuItem({ menuItem, hoveredMenuItemIndex }: MenuItemType) {
  const dispatch = useDispatchTyped()
  const isHovered = useSelector(state => state.nav.menuItemHoverIndex === hoveredMenuItemIndex)
  const isNextMenuAvailable = !!menuItem.menuItems
  const isIcon = !!menuItem.icon
  const menuId = menuItem.id
  const link = menuItem.link
  const shortcut = menuItem?.shortcut

  return (
    <MenuItemStyled
      to={link || '/'}
      onClick={(e) => clickOnMenuItem(e, menuId)}
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex))}
      state={{ isHovered }}
    >
      {isIcon && <Icon icon={menuItem.icon} />}
      <TextInMenu reserveSpaceForIcon={isNextMenuAvailable} name={menuItem.name} />
      {isNextMenuAvailable && (
        <RoundSpanForIcon
          css={{
            background: 'transparent',
            marginRight: '-5px',
            position: 'absolute',
            right: '10px',
          }}
        >
          <ForwardIcon />
        </RoundSpanForIcon>
      )}
      {shortcut && <Shortcut shortcut={shortcut} $isHovered={isHovered} />}
    </MenuItemStyled>
  )
}
