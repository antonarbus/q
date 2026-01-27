import type { UrlParam } from '@back/api/bookmark/deleteBookmarkHandler'
import { useGetQuotationMutation } from '@entity/quotation/api/useGetQuotationMutation'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'

import { IconButton, Tooltip } from '@mui/material'
import { appSlice } from '@shared/appSlice'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { textSlice } from '@shared/lib/tiptap/textSlice'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch } from '@shared/lib/redux'
import type { JSX } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const OpenSaveQuotationModalButton = (props: UrlParam): JSX.Element => {
  const navigate = useNavigate()

  const quotationMutation = useGetQuotationMutation()

  useUpdateEffect(() => {
    if (quotationMutation.isSuccess === true) {
      const persistedScrollX = window.scrollX
      const persistedScrollY = window.scrollY

      dispatch(textSlice.actions.setNotEditable())

      // Restore scroll position after React renders
      requestAnimationFrame(() => {
        window.scrollTo(persistedScrollX, persistedScrollY)
      })

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
