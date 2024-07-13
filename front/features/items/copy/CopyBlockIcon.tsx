import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import {
  isFroalaSignal,
  itemKey,
  saveBlockHeightByIndex,
  useItem,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const CopyBlockIcon = (): JSX.Element => {
  const { itemIndex } = useItem()
  const isCopyable = useSelectorTyped((state) => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <MdCopyAll
      className='copy-item-icon'
      tabIndex={-1}
      style={{
        position: 'relative',
        top: 1,
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        saveBlockHeightByIndex({ itemIndex })

        const blockToCopy = getState().quotation.blocks[itemIndex]
        if (!blockToCopy) return
        if (blockToCopy.type === itemKey.paste) return

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const itemElement = clickedIconElement.closest(`.${cls.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${cls.paper}`)
        if (!(paperElement instanceof Element)) return

        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)
        isFroalaSignal.value = false

        const block = structuredClone(blockToCopy)
        block.preview = cleanedHtml

        dispatch(copySlice.actions.addItemIntoCopyContainer({ item: block }))
        dispatch(copySlice.actions.allowToPaste())

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          dispatch(copySlice.actions.showCopyContainer())
        }
      }}
    />
  )
}
