import { selectMenuItemByIdsChainSelector } from 'client/features/nav/navSlice'
import { useSelectorTyped } from 'client/store'
import { MenuItem } from './MenuItem'
import { TRefDiv } from 'client/types'

type Props = {
  reference: TRefDiv
  idsToMenu: string[]
  className: string
}

export function SlidableMenuItemsContainer({ reference, idsToMenu, className }: Props) {
  const menuItems = useSelectorTyped(selectMenuItemByIdsChainSelector(idsToMenu))

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
