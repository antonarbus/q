import { selectMenuItemByIdsChainSelector } from 'client/entities/nav'
import { useSelectorTyped } from 'client/shared/hooks'
import { MenuItem } from './MenuItem'
import type { RefObject } from 'react'

interface Props {
  reference: RefObject<HTMLDivElement>
  idsToMenu: string[]
  className: string
}

export const SlidableMenuItemsContainer = ({ reference, idsToMenu, className }: Props): JSX.Element => {
  const menuItems = useSelectorTyped(selectMenuItemByIdsChainSelector(idsToMenu))

  return (
    <div ref={reference} className={className}>
      {menuItems
        .filter(menuItem => !menuItem.isHidden)
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
