import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { MouseEvent } from 'react'
import { GoTrash } from 'react-icons/go'
import { copySlice } from '@entities/copy'
import {
  quotationSlice,
  selectIsLastBlock,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'
import { Tooltip } from '@mui/material'
import { textSlice } from '@shared/lib/froala/textSlice'

export const DeleteBlockIcon = (): React.JSX.Element => {
  const { blockIndex } = useBlock()

  const isBlockAlone = useSelector(selectIsLastBlock)
  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isBlockAlone || isDeletable === false

  return (
    <Tooltip
      title='Delete'
      placement='right'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <GoTrash
          tabIndex={-1}
          className={cls.actionIcon}
          style={{
            color: disabled ? '#acacac' : '#000',
          }}
          css={{
            '&:hover': {
              color: disabled ? '#acacac' : 'red !important',
            },
          }}
          onClick={(e: MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const blockToDelete = getState().quotation.blocks[blockIndex]

            if (blockToDelete === undefined) {
              return
            }

            const clickedIconElement = e.target

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
        />
      </span>
    </Tooltip>
  )
}
