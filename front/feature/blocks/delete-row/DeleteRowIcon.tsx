import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { selectIsLastRow } from '@entity/quotation/redux/selector/selectIsLastRow'
import { updateSubTotalPrice } from '@entity/quotation/util/updateSubTotalPrice'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch, useSelector } from '@shared/lib/redux'
import { GoTrash } from 'react-icons/go'

export const DeleteRowIcon = (): React.JSX.Element => {
  const block = useBlock()
  const boq = useBoq()
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

            updateSubTotalPrice({
              blockIndex: block.index,
              subTotalPriceEditor: boq.subTotalPriceEditorRef.current,
            })
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
