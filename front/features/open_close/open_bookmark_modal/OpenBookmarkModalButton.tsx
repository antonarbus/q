import type { ReqBody } from '@back/api/bookmark/getBookmarkRouter'
import { dispatch } from '@shared/lib/redux'
import { IconButton, Tooltip } from '@mui/material'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { isFroalaSignal, quotationSlice } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { notify } from '@shared/toast'

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
    if (isSuccess) {
      const { item } = data

      const block = item

      if (!block) return

      isFroalaSignal.value = false

      dispatch(quotationSlice.actions.loadBlockAtPosThousandReducer({ block }))

      navigate(`./${id}`)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({
        msg: error.response?.data.message,
        type: 'error',
        theme: 'light',
      })
    }
  }, [isError])

  return (
    <Tooltip
      title='Edit'
      placement='bottom'
      enterDelay={500}
      enterNextDelay={500}
    >
      <IconButton
        size='small'
        onClick={() => {
          loadItem({ id })
        }}
        sx={{
          translate: '0px 1px',
        }}
      >
        {!isPending && <AiTwotoneEdit />}
        {isPending && <RotatingLoaderIcon />}
      </IconButton>
    </Tooltip>
  )
}
