import { useIsCopyModalVisible } from '@entity/copy/useIsCopyModalVisible'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getRowFromStore } from '@entity/quotation/redux/getter/getRowFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent, ReactNode } from 'react'
import { FaRegStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const BookmarkRowIcon = (): ReactNode => {
  const navigate = useNavigate()
  const block = useBlock()
  const row = useRow()
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isCopyModalVisible

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='right'
      title='Add to bookmarks'
    >
      <span className={cls.actionIconContainer}>
        <FaRegStar
          className={cls.actionIcon}
          css={{
            '&:hover': {
              color: disabled === true ? '#acacac' : '#ff7f00 !important',
            },
          }}
          onClick={(event: MouseEvent): void => {
            if (disabled === true) {
              return
            }

            if (getState().user.email === null) {
              toast.warning('Not logged in')
              void navigate(`./${route.login}`)

              return
            }

            const clickedIconElement = event.target

            if (clickedIconElement instanceof Element === false) {
              return
            }

            const rowElement = clickedIconElement.closest(`.${cls.row}`)

            if (rowElement === null) {
              return
            }

            const rowFromStore = getRowFromStore({
              rowIndex: row.index,
              blockIndex: block.index,
            })

            if (rowFromStore === undefined) {
              return
            }

            dispatch(
              quotationSlice.actions.loadBlockAtPosThousandReducer({
                block: rowFromStore,
              }),
            )

            void navigate(`./${route.bookmark}/${rowFromStore.id}`)
          }}
          style={{
            color: disabled === true ? '#acacac' : '#000',
            cursor: 'pointer',
            touchAction: 'none',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
