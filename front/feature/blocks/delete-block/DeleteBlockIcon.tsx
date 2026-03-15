import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useBoq } from '@entity/quotation/provider/BoqBlockProvider'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { selectIsLastBlock } from '@entity/quotation/redux/selector/selectIsLastBlock'
import { updateSubTotalPrice } from '@entity/quotation/util/updateSubTotalPrice'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { fixElementDimensionStyle } from '@shared/util/fixElementDimensionStyle'
import { GoTrash } from 'react-icons/go'

export const DeleteBlockIcon = (): React.JSX.Element => {
  const block = useBlock()
  const boq = useBoq()

  const isBlockAlone = useSelector(selectIsLastBlock)
  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isBlockAlone || isDeletable === false

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
          onClick={(event: React.MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const blockToDelete = getState().quotation.blocks[block.index]

            if (blockToDelete === undefined) {
              return
            }

            const clickedIconElement = event.target

            if (clickedIconElement instanceof Element === false) {
              return
            }

            const blockElement = clickedIconElement.closest(`.${cls.block}`)

            if (blockElement instanceof Element === false) {
              return
            }

            const paperElement = blockElement.querySelector(`.${cls.paper}`)

            if (paperElement instanceof HTMLElement === false) {
              return
            }

            // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
            fixElementDimensionStyle({ element: paperElement })

            dispatch(
              quotationSlice.actions.deleteBlock({
                id: blockToDelete.id,
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
