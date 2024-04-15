import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import { isFroalaSignal, itemKey, saveItemHeightByIndex, useItem } from '@entities/quotation'
import { className } from '@shared/consts/className'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const CopyItemIcon = (): JSX.Element => {
  const { itemIndex } = useItem()
  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <MdCopyAll
      tabIndex={-1}
      style={{
        position: 'relative',
        top: 1,
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        saveItemHeightByIndex({ itemIndex })

        const itemToCopy = getState().quotation.items[itemIndex]
        if (!itemToCopy) return
        if (itemToCopy.type === itemKey.paste) return

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const itemElement = clickedIconElement.closest(`.${className.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${className.paper}`)
        if (!(paperElement instanceof Element)) return

        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)
        isFroalaSignal.value = false

        dispatch(copySlice.actions.addItemIntoCopyContainer({ copyItem: itemToCopy, preview: cleanedHtml }))
        dispatch(copySlice.actions.allowToPaste())

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          dispatch(copySlice.actions.showCopyContainer())
        }
      }}
    />
  )
}
