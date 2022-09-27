import { getMenuItemByIdsChainSelector } from '@features/nav/navSlice'
import { useSelectorTyped as useSelector } from '@src/store'
import { MenuItem } from './MenuItem'

type Props = {
  reference: React.MutableRefObject<HTMLDivElement>
  idsToMenu: string[]
  className: string
}

export function SlidableMenuItemsContainer({ reference, idsToMenu, className }: Props) {
  const menuItems = useSelector(getMenuItemByIdsChainSelector(idsToMenu))

  return (
    <div ref={reference} className={className}>
      {
        menuItems
          .filter(menuItem => !menuItem.isHidden)
          .map((menuItem, index) => (
            <MenuItem
              menuItem={menuItem}
              key={menuItem.id}
              hoveredMenuItemIndex={index + 2}
            />
          ))
      }
    </div>
  )
}
