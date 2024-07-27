import { useSelectorTyped } from '@lib_instances/store'
import { hideBoqRowPinsOnRowBlur } from '@features/blocks/cell/pin'
import { RowProvider } from '@entities/quotation'
import { BoqRow } from './row/BoqRow'

export const BoqRows = (): React.ReactNode => {
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
          hideBoqRowPinsOnRowBlur({ e, blockIndex: 0, rowIndex: 0 })
        }}
      />
    </RowProvider>
  )
}
