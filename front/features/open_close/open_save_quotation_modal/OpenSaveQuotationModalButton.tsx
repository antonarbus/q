import type { ReqBody } from '@back/api/bookmark/deleteBookmarkHandler'
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
    if (isSuccess === true) {
      dispatch(textSlice.actions.setNotEditable())

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: data.quotation,
        }),
      )

      const navigateState: NavigateState = {
        navigatedFrom: `/`,
        navigateTo: `/${route.save}`,
      }

      void navigate(`./${id}`, {
        state: navigateState,
      })
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
