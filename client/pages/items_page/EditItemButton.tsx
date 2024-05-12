import { dispatch } from '@lib_instances/store'
import { IconButton } from '@mui/material'
import type { ReqBody } from '@server/api/deleteItemRouter'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetItemMutation } from '@entities/item'
import { quotationSlice } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'

export const EditItemButton = ({ id }: ReqBody): JSX.Element => {
  const navigate = useNavigate()
  const { mutate: loadItem, isPending, isSuccess, isError, error, data } = useGetItemMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { item } = data
      if (!item) return

      // add item into store
      dispatch(quotationSlice.actions.loadQuotationReducer({
        quotation: {
          id: 'temp',
          name: 'temp',
          category: 'temp',
          desc: 'temp',
          email: 'temp',
          items: [item],
        },
      }))

      // todo: as we loaded item into the quotation store, we can take all data from the store and not pass in navigate
      navigate(`./${route.editItem}`, { state: { item } })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'light' })
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
