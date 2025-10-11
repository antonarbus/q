import { useIsCopyModalVisible } from '@entities/copy/useIsCopyModalVisible'
import { boqRowKey } from '@entities/quotation/const/boqRowKey'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getBoqRowFromStore } from '@entities/quotation/redux/getter/getBoqRowFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent, ReactNode } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const BookmarkBoqRowIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
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
        <MdOutlineStarOutline
          className={cls.actionIcon}
          onClick={(event: MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const { email } = getState().user

            if (email === null) {
              toast.warning('Not logged in')
              void navigate(`./${route.login}`)

              return
            }

            const clickedIconElement = event.target

            if (clickedIconElement instanceof Element === false) {
              return
            }

            const boqRowElement = clickedIconElement.closest(`.${cls.boqRow}`)

            if (boqRowElement === null) {
              return
            }

            const boqRow = getBoqRowFromStore({ rowIndex, blockIndex })

            if (boqRow === undefined) {
              return
            }

            if (boqRow.type === boqRowKey.paste) {
              return
            }

            dispatch(
              quotationSlice.actions.loadBlockAtPosThousandReducer({
                block: boqRow,
              }),
            )

            void navigate(`./${route.bookmark}/${boqRow.id}`)
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
