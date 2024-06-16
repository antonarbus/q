import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { itemsShapeEqualityFn } from '@entities/quotation'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'
import { Item } from './Item'
import { ItemsSortableContext } from './ItemsSortableContext'

export const Items = (): ReactNode => {
  const items = useSelectorTyped(
    (state) => state.quotation.items,
    itemsShapeEqualityFn,
  )

  if (items.length === 0) return null

  return (
    <FadeInOnInitLoad>
      <ItemsSortableContext>
        <AnimatePresence initial={false}>
          {items.map((item, itemIndex) => (
            <Item
              key={item.id}
              item={item}
              itemIndex={itemIndex}
            />
          ))}
        </AnimatePresence>
      </ItemsSortableContext>
    </FadeInOnInitLoad>
  )
}
