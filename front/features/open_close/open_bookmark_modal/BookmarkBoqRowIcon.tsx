import { dispatch, getState } from '@shared/lib/redux'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {
  boqRowKey,
  getBoqRowFromStore,
  quotationSlice,
  useBlock,
  useRow,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'
import { toast } from 'sonner'
import { Tooltip } from '@mui/material'
import { useIsCopyModalVisible } from '@entities/copy'

export const BookmarkBoqRowIcon = (): React.ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isCopyModalVisible

  return (
    <Tooltip
      title='Add to bookmarks'
      placement='right'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <MdOutlineStarOutline
          className={cls.actionIcon}
          tabIndex={-1}
          style={{
            color: disabled ? '#acacac' : '#000',
            cursor: 'pointer',
            touchAction: 'none',
          }}
          onClick={(e: React.MouseEvent): void => {
            if (disabled) {
              return
            }

            const { email } = getState().user

            if (email === null) {
              toast.warning('Not logged in')
              void navigate(`./${route.login}`)

              return
            }

            const clickedIconElement = e.target

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
        />
      </span>
    </Tooltip>
  )
}
