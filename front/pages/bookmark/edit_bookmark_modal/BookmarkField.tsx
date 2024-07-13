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
  const blocks = useSelectorTyped(
    (state) => state.quotation.blocks,
    itemsShapeEqualityFn,
  )

  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  if (blocks.length === 0) return null

  const firstBlock = blocks[0]

  if (firstBlock === undefined) return null

  return (
    <BookmarkFieldLayout>
      <AnimatePresence initial={false}>
        <Item
          item={firstBlock}
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
          [`.${cls.blocks}`]: {
            maxWidth: 'none !important',
            padding: '10px !important',
            [`:has(.${cls.priceBlock})`]: {
              display: 'block !important',
            },
            [`:has(.${cls.textBlock})`]: {
              display: 'block !important',
            },
          },
          [`.${cls.block}`]: {
            marginBottom: '0px !important',
          },
          [`.${cls.block}.${cls.priceBlock}`]: {
            display: 'block !important',
          },
          [`.${cls.block}.${cls.textBlock}`]: {
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
