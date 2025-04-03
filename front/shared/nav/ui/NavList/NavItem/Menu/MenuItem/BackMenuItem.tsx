import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { MouseEvent } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { navSlice } from '../../../../../navSlice'
import { Icon } from '../../Icon'
import { navigateInMenu } from '../functions/useMenuAnimation'
import { MenuItemLayout } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'

export const BackMenuItem = (): React.JSX.Element => {
  const isHovered = useSelector((state) => state.nav.hoverIndex === 0)

  const color = theme.colors.topMenuItem

  return (
    <MenuItemLayout
      to={'/'}
      onClick={(e: MouseEvent): void => {
        e.preventDefault()
        void navigateInMenu.up()
      }}
      onMouseEnter={(): void => {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )
      }}
      isHovered={isHovered}
    >
      <Icon icon={<FaChevronLeft />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemLayout>
  )
}
