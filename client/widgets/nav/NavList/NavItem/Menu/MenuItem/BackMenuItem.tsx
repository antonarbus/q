import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { theme } from 'client/shared/clients'
import { setMenuItemHoverIndex } from 'client/entities/nav'
import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { navigateInMenu } from '../functions/useMenuAnimation'
import type { MouseEvent } from 'react'

export const BackMenuItem = (): JSX.Element => {
  const dispatch = useDispatchTyped()
  const isHovered = useSelectorTyped(state => state.nav.menuItemHoverIndex === 1)
  const color = theme.colors.topMenuItem

  return (
    <MenuItemStyled
      to={'/'}
      onClick={(e: MouseEvent): void => {
        e.preventDefault()
        navigateInMenu.up?.()
      }}
      onMouseEnter={(): void => {
        dispatch(setMenuItemHoverIndex(1))
      }}
      state={{ isHovered }}
    >
      <Icon icon={<FaChevronLeft />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemStyled>
  )
}
