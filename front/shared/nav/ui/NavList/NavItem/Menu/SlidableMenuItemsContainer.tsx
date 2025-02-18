import { useSelector } from '@shared/lib/redux'
import { selectMenuItemByIdsChainSelector } from './functions/selectMenuItemByIdsChainSelector'
import { MenuItem } from './MenuItem'

type Props = {
  reference: React.RefObject<React.ComponentRef<'div'> | null>
  idsToMenu: string[]
  className: string
}

export const SlidableMenuItemsContainer = ({
  reference,
  idsToMenu,
  className,
}: Props): React.JSX.Element => {
  const menuItems = useSelector(selectMenuItemByIdsChainSelector(idsToMenu))

  return (
    <div
      ref={reference}
      className={className}
    >
      {menuItems
        .filter((menuItem) => !menuItem.isHidden)
        .map((menuItem, index) => (
          <MenuItem
            menuItem={menuItem}
            key={menuItem.id}
            hoveredMenuItemIndex={index + 2}
          />
        ))}
    </div>
  )
}
