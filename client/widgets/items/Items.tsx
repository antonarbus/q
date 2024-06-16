import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { type Item as ItemType } from '@entities/quotation'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'
import { Item } from './Item'
import { ItemsSortableContext } from './ItemsSortableContext'

type Props = {
  items: ItemType[]
}

export const Items = ({ items }: Props): ReactNode => {
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
