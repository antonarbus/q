import { selectMenuItemByIdsChainSelector } from 'client/entities/nav'
import { useSelectorTyped } from 'client/shared/hooks'
import { MenuItem } from './MenuItem'
import { RefDiv } from 'client/types'

type Props = {
  reference: RefDiv
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
