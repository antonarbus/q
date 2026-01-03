import { useIsCopyModalVisible } from '@entities/copy/useIsCopyModalVisible'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { getBlockFromStore } from '@entities/quotation/redux/getter/getBlockFromStore'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent, ReactNode } from 'react'
import { FaRegStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const BookmarkBlockIcon = (): ReactNode => {
  const navigate = useNavigate()
  const block = useBlock()
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

            const blockFromStore = getBlockFromStore({
              blockIndex: block.index,
            })

            if (blockFromStore === undefined) {
              return
            }

            dispatch(
              quotationSlice.actions.loadBlockAtPosThousandReducer({
                block: blockFromStore,
              }),
            )

            void navigate(`./${route.bookmark}/${blockFromStore.id}`)
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
