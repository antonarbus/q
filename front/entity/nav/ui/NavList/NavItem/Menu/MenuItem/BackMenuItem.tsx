import { useMenuNavigation } from '@entity/nav/provider/MenuNavigationProvider'
import { dispatch, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { JSX, MouseEvent } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { navSlice } from '../../../../../navSlice'
import { Icon } from '../../Icon'
import { MenuItemLayout } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'

export const BackMenuItem = (): JSX.Element => {
  const menuNavigation = useMenuNavigation()
  const isHovered = useSelector((state) => state.nav.hoverIndex === 0)

  const color = theme.colors.topMenuItem

  return (
    <MenuItemLayout
      isHovered={isHovered}
      onClick={(event: MouseEvent): void => {
        event.preventDefault()
        void menuNavigation.goUp()
      }}
      onMouseEnter={(): void => {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }),
        )
      }}
      to='/'
    >
      <Icon icon={<FaChevronLeft />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemLayout>
  )
}
