import type { RowBlock } from '@back/entity/quotation/schema'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { selectIsLastRow } from '@entity/quotation/redux/selector/selectIsLastRow'
import { recalculateTotalPrices } from '@entity/quotation/util/recalculateTotalPrices'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch, useSelector } from '@shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'
import { GoTrash } from 'react-icons/go'
import { roundTo } from 'round-to'

export const DeleteRowIcon = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const isLastRow = useSelector(selectIsLastRow({ blockIndex: block.index }))

  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isLastRow || isDeletable === false

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='right'
      title='Delete'
    >
      <span className={cls.actionIconContainer}>
        <GoTrash
          className={cls.actionIcon}
          css={{
            '&:hover': {
              color: disabled === true ? '#acacac' : 'red !important',
            },
          }}
          onClick={(): void => {
            if (disabled === true) {
              return
            }

            dispatch(
              quotationSlice.actions.deleteRow({
                blockIndex: block.index,
                rowIndex: row.index,
              }),
            )

            const rows = getRowsFromStore({ blockIndex: block.index })

            if (rows === undefined) {
              return
            }

            const subTotalPriceValueNew: number = rows.reduce(
              (accumulator: number, boqRow: RowBlock) => {
                const price = boqRow.price.value

                return accumulator + price
              },
              0,
            )

            const subTotalPriceValueNewRounded = roundTo(
              subTotalPriceValueNew,
              2,
            )

            updateSubTotalPriceWithValue({
              blockIndex: block.index,
              subTotalPriceEditor:
                editorRegistry.get(
                  getRegistryKey({
                    editorName: 'boqBlockSubTotalPrice',
                    blockIndex: block.index,
                    rowIndex: null,
                  }),
                ) ?? null,
              value: subTotalPriceValueNewRounded,
              incrementally: true,
            })

            recalculateTotalPrices()
          }}
          tabIndex={-1}
          style={{
            color: disabled === true ? '#acacac' : '#000',
          }}
        />
      </span>
    </Tooltip>
  )
}
