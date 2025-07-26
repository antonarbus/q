import type { ReqBody } from '@back/api/bookmark/getBookmarkHandler'
import { dispatch } from '@shared/lib/redux'
import { IconButton, Tooltip } from '@mui/material'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { quotationSlice } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { toast } from 'sonner'
import { textSlice } from '@shared/lib/froala/textSlice'

export const OpenBookmarkModalButton = ({ id }: ReqBody): React.JSX.Element => {
  const navigate = useNavigate()
  const getBookmarkMutation = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (getBookmarkMutation.isSuccess === true) {
      const { item: block } = getBookmarkMutation.data

      if (block !== undefined) {
        dispatch(textSlice.actions.setNotEditable())

        dispatch(
          quotationSlice.actions.loadBlockAtPosThousandReducer({ block }),
        )

        void navigate(`./${id}`)
      }
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
          getBookmarkMutation.mutate({ id })
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
