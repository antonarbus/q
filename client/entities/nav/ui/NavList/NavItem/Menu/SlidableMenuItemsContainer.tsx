import type { RefObject } from 'react'
import { useSelectorTyped } from '@shared/hooks'
import { selectMenuItemByIdsChainSelector } from '../../../../navSlice'
import { MenuItem } from './MenuItem'

type Props = {
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
