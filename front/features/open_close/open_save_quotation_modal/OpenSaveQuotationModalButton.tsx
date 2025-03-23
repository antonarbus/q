import type { ReqBody } from '@back/api/bookmark/deleteBookmarkRouter'
import { dispatch } from '@shared/lib/redux'
import { IconButton, Tooltip } from '@mui/material'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { quotationSlice, useGetQuotationMutation } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { route } from '@shared/consts/route'
import { toast } from 'sonner'
import type { NavigateState } from '@shared/types/NavigateState'
import { textSlice } from '@shared/lib/froala/textSlice'

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
    if (isSuccess) {
      const quotation = data.quotation

      if (quotation !== undefined) {
        dispatch(textSlice.actions.setNotEditable())
        dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))

        const navigateState: NavigateState = {
          navigatedFrom: `/`,
          navigateTo: `/${route.save}`,
        }

        void navigate(`./${id}`, {
          state: navigateState,
        })
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error(error.response?.data.message)
    }
  }, [isError])

  return (
    <Tooltip
      title='Quick edit'
      placement='bottom'
      enterDelay={500}
      enterNextDelay={500}
    >
      <Link
        to={`./${id}`}
        onClick={(e) => {
          e.preventDefault()
          loadQuotation({ id })
        }}
      >
        <IconButton
          size='small'
          sx={{
            translate: '0px 1px',
          }}
        >
          {!isPending && <AiTwotoneEdit />}
          {isPending && <RotatingLoaderIcon />}
        </IconButton>
      </Link>
    </Tooltip>
  )
}
