import type { ReqBody } from '@back/api/bookmark/deleteBookmarkHandler'
import { dispatch } from '@shared/lib/redux'
import { IconButton, Tooltip } from '@mui/material'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { quotationSlice, useGetQuotationMutation } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { route } from '@shared/const/route'
import { toast } from 'sonner'
import { textSlice } from '@shared/lib/froala/textSlice'
import { appSlice } from '@shared/appSlice'

export const OpenSaveQuotationModalButton = ({
  id,
}: ReqBody): React.JSX.Element => {
  const navigate = useNavigate()

  const {
    mutate: loadQuotation,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useGetQuotationMutation()

  useUpdateEffect(() => {
    if (isSuccess === true) {
      dispatch(textSlice.actions.setNotEditable())

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: data.quotation,
        }),
      )

      dispatch(
        appSlice.actions.setNavigateState({
          to: `/${route.save}`,
          shouldSlide: true,
        }),
      )

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
      title='Quick edit'
    >
      <Link
        onClick={(event) => {
          event.preventDefault()
          loadQuotation({ id })
        }}
        to={`./${id}`}
      >
        <IconButton
          size='small'
          sx={{
            translate: '0px 1px',
          }}
        >
          {isPending === true ? <RotatingLoaderIcon /> : <AiTwotoneEdit />}
        </IconButton>
      </Link>
    </Tooltip>
  )
}
