import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { Item } from '@widgets/items/Item'
import { itemsShapeEqualityFn, isFroalaSignal } from '@entities/quotation'
import { OutlinedDivWithLabel } from '@shared/components'
import { cls } from '@shared/consts/cls'

export const BookmarkField = (): ReactNode => {
  const items = useSelectorTyped(
    (state) => state.quotation.items,
    itemsShapeEqualityFn,
  )

  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  if (items.length === 0) return null

  const firstItem = items[0]

  if (firstItem === undefined) return null

  return (
    <BookmarkFieldLayout>
      <AnimatePresence initial={false}>
        <Item
          item={firstItem}
          itemIndex={0}
        />
      </AnimatePresence>
    </BookmarkFieldLayout>
  )
}

function BookmarkFieldLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <OutlinedDivWithLabel label='Item'>
      <Box
        sx={{
          overflow: 'auto',
          height: '180px',
          margin: '10px',
          padding: '10px',
          [`.${cls.items}`]: {
            maxWidth: 'none !important',
            padding: '10px !important',
            [`:has(.${cls.priceItem})`]: {
              display: 'block !important',
            },
            [`:has(.${cls.textItem})`]: {
              display: 'block !important',
            },
          },
          [`.${cls.item}`]: {
            marginBottom: '0px !important',
          },
          [`.${cls.item}.${cls.priceItem}`]: {
            display: 'block !important',
          },
          [`.${cls.item}.${cls.textItem}`]: {
            display: 'block !important',
          },
          '.actions-container': {
            display: 'none !important',
          },
        }}
      >
        <Box
          sx={{
            width: '2000px',
          }}
        >
          {children}
        </Box>
      </Box>
    </OutlinedDivWithLabel>
  )
}
