import { useStripeAccountStatusQuery } from '@front/entities/payment/api/useStripeAccountStatusQuery'
import { selectPaymentBlockByBlockIndex } from '@front/entities/quotation/redux/selector/selectPaymentBlockByBlockIndex'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'
import { buildSearchParams } from '@front/shared/lib/react-router-dom/searchParams'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'

type Props = {
  setAmountError: (val: boolean) => void
}

type Res = () => Promise<boolean>

export const useValidatePaymentAmount = (props: Props): Res => {
  const block = useBlock()
  const stripeStatusQuery = useStripeAccountStatusQuery()

  const paymentBlock = reduxHolder.useSelector(
    selectPaymentBlockByBlockIndex({ blockIndex: block.index }),
  )

  const validate = async (): Promise<boolean> => {
    if (stripeStatusQuery.data?.connected !== true) {
      if (reduxHolder.getState().user.email === null) {
        void routerHolder.router.navigate(
          `./${route.login}${buildSearchParams({
            redirect: route.stripeConnect,
            shouldSlide: 'true',
          })}`,
        )

        return false
      }

      void routerHolder.router.navigate(`./${route.stripeConnect}`)

      return false
    }

    if (!paymentBlock || paymentBlock.payment.amount <= 0) {
      props.setAmountError(true)

      return false
    }

    const amountNum = paymentBlock.payment.amount / 100
    const { blocks } = reduxHolder.getState().quotation

    const quotationTotal = blocks.reduce((sum, thisBlock) => {
      if (thisBlock.type === 'boq') {
        return sum + thisBlock.boq.header.subTotalPrice.value
      }

      return sum
    }, 0)

    if (quotationTotal > 0 && Math.abs(quotationTotal - amountNum) > 0.01) {
      const confirmed = await confirmWithDialog({
        title: 'Amount mismatch',
        description: `Payment amount (${amountNum.toFixed(2)}) doesn't match the quotation total (${quotationTotal.toFixed(2)}). Proceed anyway?`,
        confirmButtonText: 'Proceed',
      })

      if (confirmed === false) {
        return false
      }
    }

    return true
  }

  return validate
}
