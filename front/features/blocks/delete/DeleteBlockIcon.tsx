import { copySlice } from '@entities/copy'
import {
  quotationSlice,
  selectIsLastBlock,
  useBlock,
} from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/const/cls'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { fixElementDimensionStyle } from '@shared/util/fixElementDimensionStyle'
import type { JSX, MouseEvent } from 'react'
import { GoTrash } from 'react-icons/go'

export const DeleteBlockIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()

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

            const blockToDelete = getState().quotation.blocks[blockIndex]

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

            dispatch(textSlice.actions.setNotEditable())

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
