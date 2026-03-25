import type { UrlParam } from '@back/api/bookmark/deleteBookmarkHandler'
import { useGetQuotationMutation } from '@front/entities/quotation/api/useGetQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { IconButton, Tooltip } from '@mui/material'
import { appSlice } from '@front/shared/appSlice'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const OpenSaveQuotationModalButton = (
  props: UrlParam,
): React.JSX.Element => {
  const navigate = useNavigate()

  const quotationMutation = useGetQuotationMutation()

  useUpdateEffect(() => {
    if (quotationMutation.isSuccess === true) {
      reduxHolder.dispatch(
        quotationSlice.actions.loadQuotation({
          quotation: quotationMutation.data.quotation,
        }),
      )

      reduxHolder.dispatch(
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
