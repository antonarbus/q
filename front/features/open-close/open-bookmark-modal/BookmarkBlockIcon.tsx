import { useIsCopyModalVisible } from '@entities/copy'
import {
  getBlockFromStore,
  itemType,
  quotationSlice,
  useBlock,
} from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent, ReactNode } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const BookmarkBlockIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
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
