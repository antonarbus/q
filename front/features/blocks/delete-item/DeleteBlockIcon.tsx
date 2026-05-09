import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { selectIsLastBlock } from '@front/entities/quotation/redux/selector/selectIsLastBlock'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { fixElementDimensionStyle } from '@front/shared/util/fixElementDimensionStyle'
import { GoTrash } from 'react-icons/go'

export const DeleteBlockIcon = (): React.JSX.Element => {
  const block = useBlock()

  const isBlockAlone = reduxHolder.useSelector(selectIsLastBlock)
  const isDeletable = reduxHolder.useSelector((state) => state.clipboard.isDeletable)
  const disabled = isBlockAlone || isDeletable === false

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
          onClick={(event: React.MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const blockToDelete = reduxHolder.getState().quotation.blocks[block.index]

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

            reduxHolder.dispatch(
              quotationSlice.actions.deleteBlock({
                id: blockToDelete.id,
              }),
            )

            // Deferred so React re-renders first. The editor registry is keyed by blockIndex —
            // removing a block shifts the price block's index, and its editor stays registered
            // under the old key until PriceValue re-renders with the new blockIndex from context.
            setTimeout(() => {
              recalculateTotalPrices()
            }, 0)
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
