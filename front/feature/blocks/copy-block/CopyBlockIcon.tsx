import { copySlice } from '@entity/copy/copySlice'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { saveBlockHeightByIndex } from '@entity/quotation/util/saveBlockHeightByIndex'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { MdCopyAll } from 'react-icons/md'
import { getCleanPaperHtml } from '@shared/util/html-getter/getCleanPaperHtml'

export const CopyBlockIcon = (): React.JSX.Element => {
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
          onClick={(event: React.MouseEvent): void => {
            if (disabled === true) {
              return
            }

            saveBlockHeightByIndex({ blockIndex: block.index })

            const blockToCopy = getState().quotation.blocks[block.index]

            if (blockToCopy === undefined) {
              return
            }

            const clickedIconElement = event.target

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

            const html = getCleanPaperHtml({ paperElement })

            dispatch(
              copySlice.actions.addItem({ item: blockToCopy, preview: html }),
            )

            dispatch(copySlice.actions.allowToPaste())

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              dispatch(
                copySlice.actions.setInitCursorPos({
                  x: event.clientX,
                  y: event.clientY,
                }),
              )

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
