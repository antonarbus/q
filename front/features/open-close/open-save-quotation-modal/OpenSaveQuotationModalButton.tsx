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
import type { JSX } from 'react'

export const OpenSaveQuotationModalButton = (props: ReqBody): JSX.Element => {
  const navigate = useNavigate()

  const quotationMutation = useGetQuotationMutation()

  useUpdateEffect(() => {
    if (quotationMutation.isSuccess === true) {
      dispatch(textSlice.actions.setNotEditable())

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: quotationMutation.data.quotation,
        }),
      )

      dispatch(
        appSlice.actions.setNavigateState({
          to: `/${route.save}`,
          shouldSlide: true,
        }),
      )

      void navigate(`./${props.id}`)
    }
  }, [quotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (quotationMutation.isError === true) {
      toast.error(quotationMutation.error.response?.data.message)
    }
  }, [quotationMutation.isError])

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
          quotationMutation.mutate({ id: props.id })
        }}
        to={`./${props.id}`}
      >
        <IconButton
          size='small'
          sx={{
            translate: '0px 1px',
          }}
        >
          {quotationMutation.isPending === true ? (
            <RotatingLoaderIcon />
          ) : (
            <AiTwotoneEdit />
          )}
        </IconButton>
      </Link>
    </Tooltip>
  )
}
