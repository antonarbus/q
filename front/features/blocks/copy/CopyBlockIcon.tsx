import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import {
  isFroalaSignal,
  itemType,
  saveBlockHeightByIndex,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { cleanHtml } from '@shared/utils/itemsUtils'
import { Tooltip } from '@mui/material'

export const CopyBlockIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const isCopyable = useSelectorTyped((state) => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <Tooltip
      title='copy'
      placement='left'
    >
      <span className={cls.actionIconContainer}>
        <MdCopyAll
          tabIndex={-1}
          className={cls.actionIcon}
          style={{
            position: 'relative',
            top: 1,
            cursor: disabled ? 'default' : 'pointer',
            color: disabled ? '#acacac' : '#000',
          }}
          onClick={(e: MouseEvent): void => {
            if (disabled) return

            saveBlockHeightByIndex({ blockIndex })

            const blockToCopy = getState().quotation.blocks[blockIndex]
            if (!blockToCopy) return
            if (blockToCopy.type === itemType.paste) return

            const clickedIconElement = e.target
            if (!(clickedIconElement instanceof Element)) return
            const blockElement = clickedIconElement.closest(`.${cls.block}`)
            if (!(blockElement instanceof Element)) return
            const paperElement = blockElement.querySelector(`.${cls.paper}`)
            if (!(paperElement instanceof Element)) return

            const html = paperElement.innerHTML
            const cleanedHtml = cleanHtml(html)
            isFroalaSignal.value = false

            const block = structuredClone(blockToCopy)
            block.preview = cleanedHtml

            dispatch(
              copySlice.actions.addItemIntoCopyContainer({ item: block }),
            )
            dispatch(copySlice.actions.allowToPaste())

            const isCopyContainer = getState().copy.isCopyContainer

            if (!isCopyContainer) {
              dispatch(copySlice.actions.showCopyContainer())
            }
          }}
        />
      </span>
    </Tooltip>
  )
}
