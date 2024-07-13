import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import type { MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'
import { copySlice } from '@entities/copy'
import {
  isFroalaSignal,
  itemKey,
  quotationSlice,
  saveBlockHeightByIndex,
  selectIsLastBlock,
  useItem,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const CutBlockIcon = (): JSX.Element => {
  const { itemIndex } = useItem()
  const isBlockAlone = useSelectorTyped(selectIsLastBlock)
  const isCuttable = useSelectorTyped((state) => state.copy.isCuttable)
  const disabled = isBlockAlone || !isCuttable

  return (
    <TbCut
      className='cut-item-icon'
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
        cursor: disabled ? 'default' : 'pointer',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        saveBlockHeightByIndex({ itemIndex })

        const blockToCut = getState().quotation.blocks[itemIndex]
        if (!blockToCut) return
        if (blockToCut.type === itemKey.paste) return

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

        const item = structuredClone(blockToCut)
        item.preview = cleanedHtml

        dispatch(copySlice.actions.addItemIntoCopyContainer({ item }))
        dispatch(
          quotationSlice.actions.deleteBlockReducer({ itemId: blockToCut.id }),
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
          1000 * theme.item.animationDuration + 500,
        )
      }}
    />
  )
}
