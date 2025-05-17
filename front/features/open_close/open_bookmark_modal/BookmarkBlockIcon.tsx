import { dispatch, getState } from '@shared/lib/redux'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'
import { toast } from 'sonner'
import { Tooltip } from '@mui/material'
import {
  getBlockFromStore,
  itemType,
  quotationSlice,
  useBlock,
} from '@entities/quotation'
import { useIsCopyModalVisible } from '@entities/copy'

export const BookmarkBlockIcon = (): React.ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
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
          tabIndex={-1}
          className={cls.actionIcon}
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

            const block = getBlockFromStore({ blockIndex })

            if (block === undefined) {
              return
            }

            if (block.type === itemType.paste) {
              return
            }

            dispatch(
              quotationSlice.actions.loadBlockAtPosThousandReducer({ block }),
            )

            void navigate(`./${route.bookmark}/${block.id}`)
          }}
        />
      </span>
    </Tooltip>
  )
}
