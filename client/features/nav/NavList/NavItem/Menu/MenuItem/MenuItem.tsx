import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIcon } from '../../RoundSpanForIcon'
import { TMenu } from 'client/features/nav/navStructure'
import { setMenuItemHoverIndex } from 'client/features/nav/navSlice'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { Shortcut } from './Shortcut'
import { clickOnMenuItem } from './function/clickOnMenuItem'

type TProps = {
  menuItem: TMenu
  hoveredMenuItemIndex: number
}

export function MenuItem({ menuItem, hoveredMenuItemIndex }: TProps) {
  const dispatch = useDispatchTyped()
  const isHovered = useSelectorTyped(state => state.nav.menuItemHoverIndex === hoveredMenuItemIndex)
  const isNextMenuAvailable = !!menuItem.menuItems
  const isIcon = !!menuItem.icon
  const menuId = menuItem.id
  const link = menuItem.link
  const shortcut = menuItem?.shortcut
  const disabled = !!menuItem?.disabled

  return (
    <MenuItemStyled
      to={link || '/'}
      onClick={(e) => clickOnMenuItem(e, menuId, disabled)}
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex))}
      state={{ isHovered }}
    >
      {isIcon && <Icon icon={menuItem.icon} disabled={disabled}/>}
      <TextInMenu reserveSpaceForIcon={isNextMenuAvailable} name={menuItem.name} disabled={disabled}/>
      {isNextMenuAvailable && !disabled && (
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
