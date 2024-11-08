import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { MouseEvent } from 'react'
import { GoTrash } from 'react-icons/go'
import { copySlice } from '@entities/copy'
import {
  isFroalaSignal,
  quotationSlice,
  selectIsLastBlock,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'
import { Tooltip } from '@mui/material'

export const DeleteBlockIcon = (): React.JSX.Element => {
  const { blockIndex } = useBlock()

  const isBlockAlone = useSelector(selectIsLastBlock)
  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isBlockAlone || !isDeletable

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
            if (disabled) return

            const blockToDelete = getState().quotation.blocks[blockIndex]

            if (!blockToDelete) return

            const clickedIconElement = e.target
            if (!(clickedIconElement instanceof Element)) return
            const blockElement = clickedIconElement.closest(`.${cls.block}`)
            if (!(blockElement instanceof Element)) return
            const paperElement = blockElement.querySelector(`.${cls.paper}`)
            if (!(paperElement instanceof HTMLElement)) return

            // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
            fixElementDimensionStyle({ element: paperElement })

            isFroalaSignal.value = false

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

            if (!isCopyModalVisible) {
              setTimeout(
                () => {
                  isFroalaSignal.value = true
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
