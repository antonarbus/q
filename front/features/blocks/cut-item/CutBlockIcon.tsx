import { clipboardSlice } from '@front/entities/clipboard/clipboardSlice'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { selectIsLastBlock } from '@front/entities/quotation/redux/selector/selectIsLastBlock'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { saveBlockHeightByIndex } from '@front/entities/quotation/util/saveBlockHeightByIndex'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { theme } from '@front/shared/theme'
import { fixElementDimensionStyle } from '@front/shared/util/fixElementDimensionStyle'
import { TbCut } from 'react-icons/tb'
import { getCleanPaperHtml } from '@front/shared/util/html-getter/getCleanPaperHtml'

export const CutBlockIcon = (): React.JSX.Element => {
  const block = useBlock()
  const isBlockAlone = reduxHolder.useSelector(selectIsLastBlock)
  const isCuttable = reduxHolder.useSelector((state) => state.clipboard.isCuttable)
  const disabled = isBlockAlone || isCuttable === false

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='left' title='Cut'>
      <span className={cls.actionIconContainer}>
        <TbCut
          className={cls.actionIcon}
          onClick={(event: React.MouseEvent): void => {
            if (disabled === true) {
              return
            }

            saveBlockHeightByIndex({ blockIndex: block.index })

            const blockToCut = reduxHolder.getState().quotation.blocks[block.index]

            if (blockToCut === undefined) {
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

            const html = getCleanPaperHtml({ paperElement })

            reduxHolder.dispatch(
              clipboardSlice.actions.addItem({ item: blockToCut, preview: html }),
            )

            reduxHolder.dispatch(quotationSlice.actions.deleteBlock({ id: blockToCut.id }))

            // Deferred so React re-renders first. The editor registry is keyed by blockIndex —
            // removing a block shifts the price block's index, and its editor stays registered
            // under the old key until PriceValue re-renders with the new blockIndex from context.
            setTimeout(() => {
              recalculateTotalPrices()
            }, 0)

            reduxHolder.dispatch(clipboardSlice.actions.forbidAllActions())

            const isClipboardModalVisible = reduxHolder.getState().clipboard.isVisible

            if (isClipboardModalVisible === false) {
              reduxHolder.dispatch(
                clipboardSlice.actions.setInitCursorPos({
                  x: event.clientX,
                  y: event.clientY,
                }),
              )

              reduxHolder.dispatch(clipboardSlice.actions.showCopyModal())
            }

            setTimeout(
              () => {
                reduxHolder.dispatch(clipboardSlice.actions.allowAllActions())
              },
              1000 * theme.block.animationDuration + 500,
            )
          }}
          style={{
            color: disabled === true ? '#acacac' : '#000',
            cursor: disabled === true ? 'default' : 'pointer',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
