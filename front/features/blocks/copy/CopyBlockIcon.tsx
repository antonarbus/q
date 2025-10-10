import { copySlice } from '@entities/copy'
import { itemType, saveBlockHeightByIndex, useBlock } from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/const/cls'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { getClosestPaperElementHtml } from '@shared/util/html-getter/getClosestPaperElementHtml'
import type { JSX, MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'

export const CopyBlockIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
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

            saveBlockHeightByIndex({ blockIndex })

            const blockToCopy = getState().quotation.blocks[blockIndex]

            if (blockToCopy === undefined) {
              return
            }

            if (blockToCopy.type === itemType.paste) {
              return
            }

            const html = getClosestPaperElementHtml(event)

            // Save scroll position before setNotEditable
            const scrollX = window.scrollX
            const scrollY = window.scrollY

            dispatch(textSlice.actions.setNotEditable())

            // Restore scroll position after React renders
            requestAnimationFrame(() => {
              window.scrollTo(scrollX, scrollY)
            })

            const block = structuredClone(blockToCopy)
            block.preview = html

            dispatch(copySlice.actions.addItem({ item: block }))

            dispatch(copySlice.actions.allowToPaste())

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              dispatch(copySlice.actions.showCopyModal())
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
