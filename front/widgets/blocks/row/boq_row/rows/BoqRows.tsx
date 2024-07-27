import { useSelectorTyped } from '@lib_instances/store'
import { hideBoqRowPinsOnRowBlur } from '@features/blocks/cell/pin'
import { RowProvider, useBlock } from '@entities/quotation'
import { BoqRow } from './row/BoqRow'

export const BoqRows = (): React.ReactNode => {
  const { blockIndex } = useBlock()

  const block = useSelectorTyped((state) => state.quotation.blocks[0])

  if (block?.type !== 'row') return null

  return (
    <RowProvider
      rowIndex={0}
      id={block.id}
      key={block.id}
    >
      <BoqRow
        onBlur={(e) => {
          hideBoqRowPinsOnRowBlur({ e, blockIndex, rowIndex: 0 })
        }}
      />
    </RowProvider>
  )
}
