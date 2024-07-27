import type { ReqBody } from '@back/api/bookmark/deleteBookmarkRouter'
import { dispatch } from '@lib_instances/store'
import { IconButton } from '@mui/material'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { isFroalaSignal, quotationSlice } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'

export const OpenEditBookmarkModalButton = ({ id }: ReqBody): JSX.Element => {
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

      if (!item) return

      const block = item

      isFroalaSignal.value = false

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: {
            type: 'quotation',
            id: 'edit-bookmark',
            name: 'edit-bookmark',
            category: 'edit-bookmark',
            desc: 'edit-bookmark',
            info: 'edit-bookmark',
            email: 'edit-bookmark',
            sharedWith: [],
            preview: 'edit-bookmark',
            blocks: [block],
          },
        }),
      )

      // 'id' url param doesn't play any role here, it's just for visual representation in the url
      navigate(`./${route.editBookmark}/${id}`)
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
  )
}
