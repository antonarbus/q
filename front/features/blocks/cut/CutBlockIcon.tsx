import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import type { MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'
import { copySlice } from '@entities/copy'
import {
  isDraggingSignal,
  isFroalaSignal,
  itemType,
  quotationSlice,
  saveBlockHeightByIndex,
  selectIsLastBlock,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'
import { cleanHtml } from '@shared/utils/itemsUtils'
import { Tooltip } from '@mui/material'

export const CutBlockIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const isBlockAlone = useSelectorTyped(selectIsLastBlock)
  const isCuttable = useSelectorTyped((state) => state.copy.isCuttable)
  const disabled = isBlockAlone || !isCuttable

  return (
    <Tooltip
      title='cut'
      placement='left'
      disableHoverListener={isDraggingSignal.value}
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
            if (disabled) return

            saveBlockHeightByIndex({ blockIndex })

            const blockToCut = getState().quotation.blocks[blockIndex]
            if (!blockToCut) return
            if (blockToCut.type === itemType.paste) return

            const clickedIconElement = e.target
            if (!(clickedIconElement instanceof Element)) return
            const blockElement = clickedIconElement.closest(`.${cls.block}`)
            if (!(blockElement instanceof Element)) return
            const paperElement = blockElement.querySelector(`.${cls.paper}`)
            if (!(paperElement instanceof HTMLElement)) return

            // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
            fixElementDimensionStyle({ element: paperElement })

            const html = paperElement.innerHTML
            const cleanedHtml = cleanHtml(html)
            isFroalaSignal.value = false

            const block = structuredClone(blockToCut)
            block.preview = cleanedHtml

            dispatch(
              copySlice.actions.addItemIntoCopyContainer({ item: block }),
            )
            dispatch(
              quotationSlice.actions.deleteBlockReducer({ id: blockToCut.id }),
            )
            dispatch(copySlice.actions.forbidAllActions())

            const isCopyContainer = getState().copy.isCopyContainer

            if (!isCopyContainer) {
              dispatch(copySlice.actions.showCopyContainer())
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
