import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { flushSync } from 'react-dom'
import { GoTrash } from 'react-icons/go'
import { copySlice } from '@entities/copy'
import {
  quotationSlice,
  selectIsLastBoqRow,
  useBlock,
  useRow,
} from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/const/cls'
import type { JSX } from 'react'

export const DeleteBoqRowIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  const isLastBoqRow = useSelector(selectIsLastBoqRow({ blockIndex }))
  const isDeletable = useSelector((state) => state.copy.isDeletable)
  const disabled = isLastBoqRow || isDeletable === false

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
          onClick={(): void => {
            if (disabled === true) {
              return
            }

            flushSync(() => {
              dispatch(
                quotationSlice.actions.disableFroalaReducer({ blockIndex }),
              )
            })

            dispatch(
              quotationSlice.actions.deleteBoqRowReducer({
                blockIndex,
                rowIndex,
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
                  dispatch(
                    quotationSlice.actions.enableFroalaReducer({ blockIndex }),
                  )
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
