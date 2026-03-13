import { copySlice } from '@entity/copy/copySlice'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { selectIsLastBlock } from '@entity/quotation/redux/selector/selectIsLastBlock'
import { saveBlockHeightByIndex } from '@entity/quotation/util/saveBlockHeightByIndex'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { fixElementDimensionStyle } from '@shared/util/fixElementDimensionStyle'
import { TbCut } from 'react-icons/tb'
import { getCleanPaperHtml } from '@shared/util/html-getter/getCleanPaperHtml'
import { lockScroll } from '@shared/util/lockScroll'

export const CutBlockIcon = (): React.JSX.Element => {
  const block = useBlock()
  const isBlockAlone = useSelector(selectIsLastBlock)
  const isCuttable = useSelector((state) => state.copy.isCuttable)
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

            const blockToCut = getState().quotation.blocks[block.index]

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

            lockScroll()

            dispatch(textSlice.actions.setNotEditable())

            dispatch(
              copySlice.actions.addItem({ item: blockToCut, preview: html }),
            )

            dispatch(quotationSlice.actions.deleteBlock({ id: blockToCut.id }))

            dispatch(copySlice.actions.forbidAllActions())

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              dispatch(
                copySlice.actions.setInitCursorPos({
                  x: event.clientX,
                  y: event.clientY,
                }),
              )

              dispatch(copySlice.actions.showCopyModal())
            }

            setTimeout(
              () => {
                dispatch(copySlice.actions.allowAllActions())
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
