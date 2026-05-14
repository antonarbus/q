// oxlint-disable promise/prefer-await-to-then
import { useSaveQuotationMutation } from '@front/entities/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Button } from '@mui/material'
import { FaRegShareFromSquare } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const ShareQuotationAtBottomButton = (): React.JSX.Element | null => {
  const navigate = useNavigate()
  const isEditorView = useIsEditorView()
  const accessLevel = reduxHolder.useSelector((state) => state.quotation.access.level)
  const saveQuotationMutation = useSaveQuotationMutation()

  useUpdateEffect(() => {
    if (saveQuotationMutation.isSuccess === false) {
      return
    }

    const { id } = saveQuotationMutation.data.quotation
    const link = `${globalThis.location.origin}/${id}`

    window.navigator.clipboard
      .writeText(link)
      .then(() => toast.success(`The link ${link} is copied`))
      .catch(() => toast.success(`Shared! Link: ${link}`))

    reduxHolder.dispatch(
      quotationSlice.actions.loadQuotation({
        quotation: {
          ...reduxHolder.getState().quotation,
          ...saveQuotationMutation.data.quotation,
        },
      }),
    )

    navigate(`/${id}`, { replace: true })
  }, [saveQuotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (saveQuotationMutation.isError === false) {
      return
    }

    toast.error(saveQuotationMutation.error.response?.data.message ?? 'Failed to share')
    saveQuotationMutation.reset()
  }, [saveQuotationMutation.isError])

  if (isEditorView === false || accessLevel === 'everyone') {
    return null
  }

  return (
    <Button
      size='large'
      startIcon={saveQuotationMutation.isPending ? undefined : <FaRegShareFromSquare />}
      variant='contained'
      disabled={saveQuotationMutation.isPending}
      loading={saveQuotationMutation.isPending}
      onClick={(): void => {
        if (reduxHolder.getState().user.email === null) {
          toast.warning('Please log in to share')
          return
        }

        const existingId = reduxHolder.getState().quotation.id
        const id = existingId === 'new' ? generateId() : existingId

        const quotation = {
          ...reduxHolder.getState().quotation,
          id,
          access: { level: 'everyone' as const, userList: [] },
        }

        saveQuotationMutation.mutate({ quotation })
      }}
      sx={{
        width: '200px',
        alignSelf: 'center',
        margin: '10px 10px 20px 10px',
      }}
    >
      {saveQuotationMutation.isPending ? 'Sharing...' : 'Share quotation'}
    </Button>
  )
}
