import { createElement } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { MenuItemStyled } from './MenuItemStyled'
import { closeMenu, setMenuItemHoverIndex } from 'client/nav/navSlice'
import { theme } from 'client/theme'
import { useDispatchTyped, useSelectorTyped as useSelector } from 'client/store'
import { EventType } from 'client/types'

const closeIcon = createElement(CloseIcon, {})

export function CloseMenuItem() {
  const color = theme.colors.topMenuItem
  const dispatch = useDispatchTyped()
  const isHovered = useSelector(state => state.nav.menuItemHoverIndex === 1)

  const onClickHandler = (e: EventType) => {
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
