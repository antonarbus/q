// oxlint-disable promise/prefer-await-to-then
import { useSaveQuotationMutation } from '@front/entities/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { PiShareFatBold } from 'react-icons/pi'

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
    <Tooltip title='Share'>
      <IconButton
        size='medium'
        disabled={saveQuotationMutation.isPending}
        sx={{
          marginBottom: '20px',
          color: 'white',
          bgcolor: 'rgb(117, 117, 117)',
          alignSelf: 'center',
          '&:hover': {
            bgcolor: 'rgb(81, 81, 81)',
          },
          '&.Mui-disabled': {
            bgcolor: 'rgba(0,0,0,0.04)',
          },
        }}
        onClick={async (): Promise<void> => {
          if (reduxHolder.getState().user.email === null) {
            toast.warning('Please log in to share')
            return
          }

          const unpaidPaymentBlocks = reduxHolder
            .getState()
            .quotation.blocks.filter(
              (block) => block.type === 'payment' && block.payment.stripePaymentLinkUrl === null,
            )

          if (unpaidPaymentBlocks.length > 0) {
            const confirmed = await confirmWithDialog({
              title: 'Payment link not generated',
              description:
                'Payment link is not configured and will be removed. Do you want to proceed?',
              confirmButtonText: 'Share anyway',
              rejectButtonText: 'Cancel',
            })

            if (confirmed === false) {
              return
            }

            for (const block of unpaidPaymentBlocks) {
              reduxHolder.dispatch(quotationSlice.actions.deleteBlock({ id: block.id }))
            }
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
      >
        {saveQuotationMutation.isPending ? <RotatingLoaderIcon /> : <PiShareFatBold />}
      </IconButton>
    </Tooltip>
  )
}
