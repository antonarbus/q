import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import type { MouseEvent } from 'react'
import { TbCut } from 'react-icons/tb'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal, itemKey, itemsSlice, saveItemHeightByIndex, selectIsLastItem, useItem } from '@entities/quotation'
import { className } from '@shared/consts/className'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const CutItemIcon = (): JSX.Element => {
  const { itemIndex } = useItem()
  const isItemAlone = useSelectorTyped(selectIsLastItem)
  const isCuttable = useSelectorTyped(state => state.copy.isCuttable)
  const disabled = isItemAlone || !isCuttable

  return (
      <TbCut
        tabIndex={-1}
        style={{
          color: disabled ? '#acacac' : '#000',
          cursor: disabled ? 'default' : 'pointer',
        }}
        onClick={(e: MouseEvent): void => {
          if (disabled) return

          saveItemHeightByIndex({ itemIndex })

          const itemToCut = getState().items[itemIndex]
          if (!itemToCut) return
          if (itemToCut.type === itemKey.paste) return

          const clickedIconElement = e.target
          if (!(clickedIconElement instanceof Element)) return
          const itemElement = clickedIconElement.closest(`.${className.item}`)
          if (!(itemElement instanceof Element)) return
          const paperElement = itemElement.querySelector(`.${className.paper}`)
          if (!(paperElement instanceof HTMLElement)) return

          // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
          fixElementDimensionStyle({ element: paperElement })

          const html = paperElement.innerHTML
          const cleanedHtml = cleanHtml(html)
          isItemsFroalaSignal.value = false
          dispatch(copySlice.actions.addItemIntoCopyContainer({ copyItem: itemToCut, preview: cleanedHtml }))
          dispatch(itemsSlice.actions.deleteItemReducer({ itemId: itemToCut.id }))
          dispatch(copySlice.actions.forbidAllActions())

          const isCopyContainer = getState().copy.isCopyContainer

          if (!isCopyContainer) {
            dispatch(copySlice.actions.showCopyContainer())
          }

          setTimeout(() => {
            dispatch(copySlice.actions.allowAllActions())
          }, 1000 * theme.item.animationDuration + 500)
        }}
      />
  )
}
