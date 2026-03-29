import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { useRow } from '@front/entities/quotation/provider/RowProvider'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { selectIsLastRow } from '@front/entities/quotation/redux/selector/selectIsLastRow'
import { recalculateSubTotalPrices } from '@front/entities/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux'
import { GoTrash } from 'react-icons/go'

export const DeleteRowIcon = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const isLastRow = reduxHolder.useSelector(selectIsLastRow({ blockIndex: block.index }))

  const isDeletable = reduxHolder.useSelector((state) => state.copy.isDeletable)
  const disabled = isLastRow || isDeletable === false

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='right' title='Delete'>
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

            reduxHolder.dispatch(
              quotationSlice.actions.deleteRow({
                blockIndex: block.index,
                rowIndex: row.index,
              }),
            )

            recalculateSubTotalPrices({ incrementally: true })
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
