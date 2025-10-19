import { copySlice } from '@entities/copy/copySlice'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { selectIsLastBoqRow } from '@entities/quotation/redux/selector/selectIsLastBoqRow'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { JSX } from 'react'
import { flushSync } from 'react-dom'
import { GoTrash } from 'react-icons/go'

export const DeleteBoqRowIcon = (): JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const isLastBoqRow = useSelector(
    selectIsLastBoqRow({ blockIndex: block.index }),
  )

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
                quotationSlice.actions.disableFroalaReducer({
                  blockIndex: block.index,
                }),
              )
            })

            dispatch(
              quotationSlice.actions.deleteBoqRowReducer({
                blockIndex: block.index,
                rowIndex: row.index,
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
                    quotationSlice.actions.enableFroalaReducer({
                      blockIndex: block.index,
                    }),
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
