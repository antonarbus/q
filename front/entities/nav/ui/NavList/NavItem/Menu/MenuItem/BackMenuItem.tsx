import { useMenuNavigation } from '@front/entities/nav/provider/MenuNavigationProvider'
import { reduxHolder } from '@front/shared/lib/redux'
import { theme } from '@front/shared/theme'
import { FaChevronLeft } from 'react-icons/fa'
import { navSlice } from '../../../../../navSlice'
import { Icon } from '../../Icon'
import { MenuItemLayout } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'

export const BackMenuItem = (): React.JSX.Element => {
  const menuNavigation = useMenuNavigation()

  const isHovered = reduxHolder.useSelector((state) => state.nav.hoverIndex === 0)

  const color = theme.colors.topMenuItem

  return (
    <MenuItemLayout
      isHovered={isHovered}
      onClick={(event: React.MouseEvent): void => {
        event.preventDefault()
        void menuNavigation.goUp()
      }}
      onMouseEnter={(): void => {
        reduxHolder.dispatch(navSlice.actions.setMenuItemHoverIndex({ menuItemHoverIndex: 0 }))
      }}
      to='/'
    >
      <Icon icon={<FaChevronLeft />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemLayout>
  )
}
