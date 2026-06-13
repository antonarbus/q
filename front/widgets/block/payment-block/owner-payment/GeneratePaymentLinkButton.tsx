import { selectPaymentBlockByBlockIndex } from '@front/entities/quotation/redux/selector/selectPaymentBlockByBlockIndex'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { saveExistingQuotation } from '@front/features/quotation/save-quotation/saveExistingQuotation'
import { useCreatePaymentLink } from '@front/features/blocks/create-payment-link/useCreatePaymentLink'
import { useValidatePaymentAmount } from '@front/features/blocks/validate-payment-amount/useValidatePaymentAmount'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Button } from '@mui/material'
import { useOwnerPayment } from './OwnerPaymentProvider'
import type { FC } from 'react'

export const GeneratePaymentLinkButton: FC = () => {
  const block = useBlock()
  const { setAmountError } = useOwnerPayment()

  const paymentBlock = reduxHolder.useSelector(
    selectPaymentBlockByBlockIndex({ blockIndex: block.index }),
  )
  const quotationId = reduxHolder.useSelector((state) => state.quotation.id)

  const validatePaymentAmount = useValidatePaymentAmount({ setAmountError })
  const createPaymentLink = useCreatePaymentLink()

  if (paymentBlock?.payment.stripePaymentLinkUrl !== null) {
    return null
  }

  return (
    <Button
      disabled={createPaymentLink.isPending}
      size='large'
      variant='contained'
      onClick={() =>
        void (async (): Promise<void> => {
          const isValid = await validatePaymentAmount()

          if (!isValid) {
            return
          }

          const isQuotationSaved = quotationId.length > 0 && quotationId !== 'new'

          if (!isQuotationSaved) {
            const confirmed = await confirmWithDialog({
              title: 'Save quotation first',
              description: 'The quotation needs to be saved before generating a payment link.',
              confirmButtonText: 'Save & Generate',
            })

            if (!confirmed) {
              return
            }

            await saveExistingQuotation()
          }

          await createPaymentLink.refetch()
        })()
      }
    >
      {createPaymentLink.isPending ? 'Generating...' : 'Generate Payment Link'}
    </Button>
  )
}
