import type { UrlParam } from '@back/api/bookmark/getBookmarkHandler'
import { useGetBookmarkMutation } from '@front/entities/bookmark/api/useGetBookmarkMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { reduxHolder } from '@front/shared/lib/redux'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const OpenBookmarkModalButton = (props: UrlParam): React.JSX.Element => {
  const navigate = useNavigate()
  const getBookmarkMutation = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (getBookmarkMutation.isSuccess === true) {
      reduxHolder.dispatch(
        quotationSlice.actions.loadBlockAtPosThousand({
          block: getBookmarkMutation.data.bookmark,
        }),
      )

      void navigate(`./${props.id}`)
    }
  }, [getBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (getBookmarkMutation.isError === true) {
      toast.error(getBookmarkMutation.error.response?.data.message)
    }
  }, [getBookmarkMutation.isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Edit'
    >
      <IconButton
        onClick={() => {
          getBookmarkMutation.mutate({ id: props.id })
        }}
        size='small'
        sx={{
          translate: '0px 1px',
        }}
      >
        {getBookmarkMutation.isPending === true ? (
          <RotatingLoaderIcon />
        ) : (
          <AiTwotoneEdit />
        )}
      </IconButton>
    </Tooltip>
  )
}
