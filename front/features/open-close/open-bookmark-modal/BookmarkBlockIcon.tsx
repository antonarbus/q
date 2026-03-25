import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { getBlockFromStoreByIndex } from '@front/entities/quotation/redux/getter/getBlockFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { FaRegStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const BookmarkBlockIcon = (): React.ReactNode => {
  const navigate = useNavigate()
  const block = useBlock()

  const isCopyModalVisible = reduxHolder.useSelector(
    (state) => state.copy.isVisible,
  )

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
          onClick={(): void => {
            if (disabled === true) {
              return
            }

            if (reduxHolder.getState().user.email === null) {
              toast.warning('Not logged in')
              void navigate(`./${route.login}`)

              return
            }

            const blockFromStore = getBlockFromStoreByIndex({
              blockIndex: block.index,
            })

            if (blockFromStore === undefined) {
              return
            }

            reduxHolder.dispatch(
              quotationSlice.actions.loadBlockAtPosThousand({
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
