import type { NavItemId } from '@entity/nav/navItemId'
import { getNavItem } from './functions/getNavItem'
import { MenuItem } from './MenuItem'

type Props = {
  reference: React.RefObject<React.ComponentRef<'div'> | null>
  className: string
  menuNavItemId: NavItemId | null
}

export const SlidableMenuItemsContainer = (props: Props): React.ReactNode => {
  if (props.menuNavItemId === null) {
    return null
  }

  const navItem = getNavItem({ navItemId: props.menuNavItemId })

  return (
    <div className={props.className} ref={props.reference}>
      {navItem.current?.nestedItemList
        ?.filter((item) => item.isHidden === false)
        .map((item, index) => (
          <MenuItem hoverIndex={index + 1} key={item.id} navItem={item} />
        ))}
    </div>
  )
}
