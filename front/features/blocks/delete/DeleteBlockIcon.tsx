import { copySlice } from '@entities/copy/copySlice'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { selectIsLastBlock } from '@entities/quotation/redux/selector/selectIsLastBlock'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { fixElementDimensionStyle } from '@shared/util/fixElementDimensionStyle'
import type { JSX, MouseEvent } from 'react'
import { GoTrash } from 'react-icons/go'

export const DeleteBlockIcon = (): JSX.Element => {
  const block = useBlock()

  const isBlockAlone = useSelector(selectIsLastBlock)
  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isBlockAlone || isDeletable === false

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='right'
      title='Delete'
    >
      <span className={cls.actionIconContainer}>
        <GoTrash
          className={cls.actionIcon}
          css={{
            '&:hover': {
              color: disabled === true ? '#acacac' : 'red !important',
            },
          }}
          onClick={(event: MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const blockToDelete = getState().quotation.blocks[block.index]

            if (blockToDelete === undefined) {
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

            // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
            fixElementDimensionStyle({ element: paperElement })

            // Save scroll position before setNotEditable
            const scrollX = window.scrollX
            const scrollY = window.scrollY

            dispatch(textSlice.actions.setNotEditable())

            // Restore scroll position after React renders
            requestAnimationFrame(() => {
              window.scrollTo(scrollX, scrollY)
            })

            dispatch(
              quotationSlice.actions.deleteBlockReducer({
                id: blockToDelete.id,
              }),
            )

            dispatch(copySlice.actions.forbidAllActions())

            setTimeout(() => {
              dispatch(copySlice.actions.allowAllActions())
            }, 1000 * theme.block.animationDuration)

            const isCopyModalVisible = getState().copy.isVisible

            if (isCopyModalVisible === false) {
              setTimeout(
                () => {
                  dispatch(textSlice.actions.setEditable())
                },
                1000 * theme.block.animationDuration + 500,
              )
            }
          }}
          style={{
            color: disabled === true ? '#acacac' : '#000',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
