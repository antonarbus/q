import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { theme } from '@client/theme'
import { setMenuItemHoverIndex } from '@client/nav/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@client/store'
import { globalObject } from '@client/globalObject'
import { EventType } from '@client/types'

export function BackMenuItem() {
  const dispatch = useDispatchTyped()
  const isHovered = useSelector(state => state.nav.menuItemHoverIndex === 1)
  const color = theme.colors.topMenuItem

  const onClickHandler = (e: EventType) => {
    e.preventDefault()
    globalObject.goUpInMenu && globalObject.goUpInMenu()
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
