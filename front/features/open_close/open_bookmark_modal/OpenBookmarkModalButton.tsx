import type { ReqBody } from '@back/api/bookmark/getBookmarkHandler'
import { dispatch } from '@shared/lib/redux'
import { IconButton, Tooltip } from '@mui/material'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { quotationSlice } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { toast } from 'sonner'
import { textSlice } from '@shared/lib/froala/textSlice'

export const OpenBookmarkModalButton = ({ id }: ReqBody): React.JSX.Element => {
  const navigate = useNavigate()

  const {
    mutate: loadItem,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (isSuccess === true) {
      const { item } = data

      const block = item

      if (block === undefined) {
        return
      }

      dispatch(textSlice.actions.setNotEditable())

      dispatch(quotationSlice.actions.loadBlockAtPosThousandReducer({ block }))

      void navigate(`./${id}`)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error(error.response?.data.message)
    }
  }, [isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Edit'
    >
      <IconButton
        onClick={() => {
          loadItem({ id })
        }}
        size='small'
        sx={{
          translate: '0px 1px',
        }}
      >
        {isPending === true ? <RotatingLoaderIcon /> : <AiTwotoneEdit />}
      </IconButton>
    </Tooltip>
  )
}
