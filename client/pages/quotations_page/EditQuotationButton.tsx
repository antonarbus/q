import { IconButton } from '@mui/material'
import type { ReqBody } from '@server/api/deleteItemRouter'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetQuotationMutation } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'

export const EditQuotationButton = ({ id }: ReqBody): JSX.Element => {
  const navigate = useNavigate()
  const { mutate: loadQuotation, isPending, isSuccess, isError, error, data } = useGetQuotationMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { quotation } = data
      if (!quotation) return
      navigate(`./${route.editQuotation}`, { state: { quotation } })
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
        loadQuotation({ id })
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
