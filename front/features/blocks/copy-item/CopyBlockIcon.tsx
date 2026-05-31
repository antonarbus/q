import { clipboardSlice } from '@front/entities/quotation/redux/clipboardSlice'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { saveBlockHeightByIndex } from '@front/entities/quotation/util/saveBlockHeightByIndex'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { MdCopyAll } from 'react-icons/md'
import { getCleanPaperHtml } from '@front/shared/util/html-getter/getCleanPaperHtml'

export const CopyBlockIcon = (): React.JSX.Element => {
  const block = useBlock()
  const isCopyable = reduxHolder.useSelector((state) => state.clipboard.isCopyable)
  const disabled = isCopyable === false

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='left' title='Copy'>
      <span className={cls.actionIconContainer}>
        <MdCopyAll
          className={cls.actionIcon}
          onClick={(event: React.MouseEvent): void => {
            if (disabled === true) {
              return
            }

            saveBlockHeightByIndex({ blockIndex: block.index })

            const blockToCopy = reduxHolder.getState().quotation.blocks[block.index]

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

            reduxHolder.dispatch(
              clipboardSlice.actions.addItem({
                item: {
                  ...blockToCopy,
                  width: paperElement.clientWidth,
                  height: paperElement.clientHeight,
                },
                preview: html,
              }),
            )

            reduxHolder.dispatch(clipboardSlice.actions.allowToPaste())

            const isClipboardModalVisible = reduxHolder.getState().clipboard.isVisible

            if (isClipboardModalVisible === false) {
              reduxHolder.dispatch(
                clipboardSlice.actions.setInitCursorPos({
                  x: event.clientX,
                  y: event.clientY,
                }),
              )

              reduxHolder.dispatch(clipboardSlice.actions.showClipboardModal())
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
