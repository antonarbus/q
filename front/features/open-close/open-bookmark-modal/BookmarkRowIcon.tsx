import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { useRow } from '@front/entities/quotation/provider/useRow'
import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { FaRegStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const BookmarkRowIcon = (): React.ReactNode => {
  const navigate = useNavigate()
  const block = useBlock()
  const row = useRow()

  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)

  const disabled = isCopyModalVisible

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='right' title='Add to bookmarks'>
      <span className={cls.actionIconContainer}>
        <FaRegStar
          className={cls.actionIcon}
          css={{
            '&:hover': {
              color: disabled === true ? '#acacac' : '#ff7f00 !important',
            },
          }}
          onClick={(event: React.MouseEvent): void => {
            if (disabled === true) {
              return
            }

            if (reduxHolder.getState().user.email === null) {
              toast.warning('Not logged in')
              navigate(`./${route.login}`)

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

            const rowFromStore = getRowFromStoreByIndex({
              rowIndex: row.index,
              blockIndex: block.index,
            })

            if (rowFromStore === undefined) {
              return
            }

            reduxHolder.dispatch(
              quotationSlice.actions.loadBlockAtPosThousand({
                block: rowFromStore,
              }),
            )

            navigate(`./${route.bookmark}/${rowFromStore.id}`)
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
