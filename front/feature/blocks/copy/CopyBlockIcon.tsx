import { copySlice } from '@entity/copy/copySlice'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { saveBlockHeightByIndex } from '@entity/quotation/util/saveBlockHeightByIndex'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { getClosestPaperElementHtml } from '@shared/util/html-getter/getClosestPaperElementHtml'
import type { JSX, MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'

export const CopyBlockIcon = (): JSX.Element => {
  const block = useBlock()
  const isCopyable = useSelector((state) => state.copy.isCopyable)
  const disabled = isCopyable === false

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='left'
      title='Copy'
    >
      <span className={cls.actionIconContainer}>
        <MdCopyAll
          className={cls.actionIcon}
          onClick={(event: MouseEvent): void => {
            if (disabled === true) {
              return
            }

            saveBlockHeightByIndex({ blockIndex: block.index })

            const blockToCopy = getState().quotation.blocks[block.index]

            if (blockToCopy === undefined) {
              return
            }

            const html = getClosestPaperElementHtml(event)

            const persistedScrollX = window.scrollX
            const persistedScrollY = window.scrollY

            dispatch(textSlice.actions.setNotEditable())

            // Restore scroll position after React renders
            requestAnimationFrame(() => {
              window.scrollTo(persistedScrollX, persistedScrollY)
            })

            const blockCloned = structuredClone(blockToCopy)
            blockCloned.preview = html

            dispatch(copySlice.actions.addItem({ item: blockCloned }))

            dispatch(copySlice.actions.allowToPaste())

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              dispatch(
                copySlice.actions.showCopyModal({
                  initCursorPos: { x: event.clientX, y: event.clientY },
                }),
              )
            }
          }}
          style={{
            position: 'relative',
            top: 1,
            cursor: disabled === true ? 'default' : 'pointer',
            color: disabled === true ? '#acacac' : '#000',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
