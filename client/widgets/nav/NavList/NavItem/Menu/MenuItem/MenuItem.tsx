import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIcon } from '../../RoundSpanForIcon'
import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { Shortcut } from './Shortcut'
import { clickOnMenuItem } from './function/clickOnMenuItem'
import { MenuLevel, setMenuItemHoverIndex } from 'client/entities/nav'

type Props = {
  menuItem: MenuLevel
  hoveredMenuItemIndex: number
}

export function MenuItem({ menuItem, hoveredMenuItemIndex }: Props) {
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
