import { dispatch, getState, useSelector } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import { itemType, saveBlockHeightByIndex, useBlock } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { Tooltip } from '@mui/material'
import { getClosestPaperElementHtml } from '@shared/utils/htmlGetter/getClosestPaperElementHtml'
import { textSlice } from '@shared/lib/froala/textSlice'

export const CopyBlockIcon = (): React.JSX.Element => {
  const { blockIndex } = useBlock()
  const isCopyable = useSelector((state) => state.copy.isCopyable)
  const disabled = isCopyable === false

  return (
    <Tooltip
      title='Copy'
      placement='left'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <MdCopyAll
          tabIndex={-1}
          className={cls.actionIcon}
          style={{
            position: 'relative',
            top: 1,
            cursor: disabled === true ? 'default' : 'pointer',
            color: disabled === true ? '#acacac' : '#000',
          }}
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

            dispatch(textSlice.actions.setNotEditable())

            const block = structuredClone(blockToCopy)
            block.preview = html

            dispatch(copySlice.actions.addItem({ item: block }))

            dispatch(copySlice.actions.allowToPaste())

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              dispatch(copySlice.actions.showCopyModal())
            }
          }}
        />
      </span>
    </Tooltip>
  )
}
