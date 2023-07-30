import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { theme } from 'client/shared/clients'
import { setMenuItemHoverIndex } from 'client/entities/nav'
import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { Event } from 'client/types'
import { navigateInMenu } from '../functions/useMenuAnimation'

export function BackMenuItem() {
  const dispatch = useDispatchTyped()
  const isHovered = useSelectorTyped(
    (state) => state.nav.menuItemHoverIndex === 1
  )
  const color = theme.colors.topMenuItem

  const onClickHandler = (e: Event) => {
    e.preventDefault()
    navigateInMenu.up && navigateInMenu.up()
  }

  return (
    <MenuItemStyled
      to={'/'}
      onClick={onClickHandler}
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(1))}
      state={{ isHovered }}
    >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemStyled>
  )
}
