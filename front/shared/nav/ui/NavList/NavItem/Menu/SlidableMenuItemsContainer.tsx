import { MenuItem } from './MenuItem'
import type { NavItemId } from '@shared/const/navItemId'
import { getNavItem } from './functions/getNavItem'
import type { ReactNode,ComponentRef,RefObject } from 'react'

type Props = {
  reference: RefObject<ComponentRef<'div'> | null>
  className: string
  menuNavItemId: NavItemId | null
}

export const SlidableMenuItemsContainer = ({
  reference,
  className,
  menuNavItemId,
}: Props): ReactNode => {
  if (menuNavItemId === null) {
    return null
  }

  const { navItem } = getNavItem({ navItemId: menuNavItemId })

  const menuItemsNotHidden = navItem?.navItems
    ?.filter((item) => item.isHidden === false)
    .map((item, index) => (
      <MenuItem
        hoverIndex={index + 1}
        key={item.id}
        navItem={item}
      />
    ))

  return (
    <div
      className={className}
      ref={reference}
    >
      {menuItemsNotHidden}
    </div>
  )
}
