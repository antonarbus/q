import { MenuItem } from './MenuItem'
import type { NavItemId } from '@shared/consts/navItemId'
import { getNavItem } from './functions/getNavItem'

type Props = {
  reference: React.RefObject<React.ComponentRef<'div'> | null>
  className: string
  menuNavItemId: NavItemId | null
}

export const SlidableMenuItemsContainer = ({
  reference,
  className,
  menuNavItemId,
}: Props): React.ReactNode => {
  if (menuNavItemId === null) {
    return null
  }

  const { navItem } = getNavItem({ navItemId: menuNavItemId })

  const menuItemsNotHidden = navItem?.navItems
    ?.filter((item) => item.isHidden === false)
    .map((item, index) => (
      <MenuItem
        navItem={item}
        key={item.id}
        hoverIndex={index + 1}
      />
    ))

  return (
    <div
      ref={reference}
      className={className}
    >
      {menuItemsNotHidden}
    </div>
  )
}
