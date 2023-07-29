import { createElement } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { MenuItemStyled } from './MenuItemStyled'
import { closeMenu, setMenuItemHoverIndex } from 'client/features/nav/navSlice'
import { theme } from 'client/shared/clients'
import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { Event } from 'client/types'

const closeIcon = createElement(CloseIcon, {})

export function CloseMenuItem() {
  const color = theme.colors.topMenuItem
  const dispatch = useDispatchTyped()
  const isHovered = useSelectorTyped(state => state.nav.menuItemHoverIndex === 1)

  const onClickHandler = (e: Event) => {
    e.preventDefault()
    dispatch(closeMenu())
  }

  return (
    <MenuItemStyled
      to={'/'}
      onClick={onClickHandler}
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(1))}
      state={{ isHovered }}
    >
      <Icon icon={closeIcon} />
      <TextInMenu name={<span style={{ color }}>Close</span>} />
    </MenuItemStyled>
  )
}
