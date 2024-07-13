import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { type Item as ItemType } from '@entities/quotation'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'
import { Block } from './Block'
import { BlocksSortableContext } from './BlocksSortableContext'

type Props = {
  items: ItemType[]
}

export const Blocks = ({ items }: Props): ReactNode => {
  if (items.length === 0) return null

  return (
    <FadeInOnInitLoad>
      <BlocksSortableContext>
        <AnimatePresence initial={false}>
          {items.map((item, itemIndex) => (
            <Block
              key={item.id}
              item={item}
              itemIndex={itemIndex}
            />
          ))}
        </AnimatePresence>
      </BlocksSortableContext>
    </FadeInOnInitLoad>
  )
}
