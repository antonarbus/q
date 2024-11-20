import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { MouseEvent } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { navSlice } from '../../../../../navSlice'
import { Icon } from '../../Icon'
import { navigateInMenu } from '../functions/useMenuAnimation'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'

export const BackMenuItem = (): React.JSX.Element => {
  const isHovered = useSelector((state) => state.nav.menuItemHoverIndex === 1)

  const color = theme.colors.topMenuItem

  return (
    <MenuItemStyled
      to={'/'}
      onClick={(e: MouseEvent): void => {
        e.preventDefault()
        void navigateInMenu.up()
      }}
      onMouseEnter={(): void => {
        dispatch(navSlice.actions.setMenuItemHoverIndex(1))
      }}
      state={{ isHovered }}
    >
      <Icon icon={<FaChevronLeft />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemStyled>
  )
}
