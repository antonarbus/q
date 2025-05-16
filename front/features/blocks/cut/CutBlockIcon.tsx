import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'
import { copySlice } from '@entities/copy'
import {
  itemType,
  quotationSlice,
  saveBlockHeightByIndex,
  selectIsLastBlock,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'
import { Tooltip } from '@mui/material'
import { getClosestPaperElementHtml } from '@shared/utils/htmlGetter/getClosestPaperElementHtml'
import { textSlice } from '@shared/lib/froala/textSlice'

export const CutBlockIcon = (): React.JSX.Element => {
  const { blockIndex } = useBlock()
  const isBlockAlone = useSelector(selectIsLastBlock)
  const isCuttable = useSelector((state) => state.copy.isCuttable)
  const disabled = isBlockAlone || isCuttable === false

  return (
    <Tooltip
      title='Cut'
      placement='left'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <TbCut
          tabIndex={-1}
          className={cls.actionIcon}
          style={{
            color: disabled ? '#acacac' : '#000',
            cursor: disabled ? 'default' : 'pointer',
          }}
          onClick={(e: MouseEvent): void => {
            if (disabled) {
              return
            }

            saveBlockHeightByIndex({ blockIndex })

            const blockToCut = getState().quotation.blocks[blockIndex]

            if (blockToCut === undefined) {
              return
            }

            if (blockToCut.type === itemType.paste) {
              return
            }

            const clickedIconElement = e.target

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

            const html = getClosestPaperElementHtml(e)

            dispatch(textSlice.actions.setNotEditable())

            const block = structuredClone(blockToCut)
            block.preview = html

            dispatch(copySlice.actions.addItem({ item: block }))

            dispatch(
              quotationSlice.actions.deleteBlockReducer({ id: blockToCut.id }),
            )

            dispatch(copySlice.actions.forbidAllActions())

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              dispatch(copySlice.actions.showCopyModal())
            }

            setTimeout(
              () => {
                dispatch(copySlice.actions.allowAllActions())
              },
              1000 * theme.block.animationDuration + 500,
            )
          }}
        />
      </span>
    </Tooltip>
  )
}
