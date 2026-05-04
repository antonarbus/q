import {
  useLoadInitValuesIntoShareQuotationModal,
  useLoadShareQuotationModalWithDirectLink,
} from '@front/features/open-close/open-share-quotation-modal'
import { useShareQuotation } from '@front/features/quotation/share-quotation/useShareQuotation'
import { FormModal } from '@front/shared/component/FormModal'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { Box, Typography } from '@mui/material'
import { FaRegShareFromSquare } from 'react-icons/fa6'
import { IoCopyOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { ShareQuotationField } from './share-quotation-field'
import { useIsButtonDisabled } from './useIsButtonDisabled'
import { useShareQuotationFormValues } from './useShareQuotationFormValues'

export const ShareQuotationModal = (): React.JSX.Element => {
  const animatedElement = useAnimatedElement()
  const accessFormValuesSignal = useShareQuotationFormValues()
  useLoadInitValuesIntoShareQuotationModal({ accessFormValuesSignal })
  useLoadShareQuotationModalWithDirectLink({ accessFormValuesSignal })
  const isButtonDisabled = useIsButtonDisabled({ accessFormValuesSignal })
  const quotationId = reduxHolder.useSelector((state) => state.quotation.id)
  const isNewQuotation = quotationId === 'new'

  const shareQuotation = useShareQuotation({
    accessFormValuesSignal,
    slideOut: animatedElement.slideOut,
  })

  const navigateUp = (): void => {
    routerHolder.router.navigate('..')
  }

  const quotationLink = `${globalThis.location.origin}/${quotationId}`

  return (
    <FormModal
      buttonText={isNewQuotation === true ? 'Save and share' : 'Update'}
      headerIcon={<FaRegShareFromSquare />}
      headerText='Share'
      isButtonDisabled={isButtonDisabled}
      isButtonError={shareQuotation.isError}
      isButtonLoading={shareQuotation.isPending}
      isButtonSuccess={shareQuotation.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={shareQuotation.handleSubmit}
      onUnmount={navigateUp}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
      width='500px'
    >
      {isNewQuotation === false && (
        <Box
          onClick={async () => {
            await window.navigator.clipboard
              .writeText(quotationLink)
              .then(() => toast.success('Link copied'))
              .catch(() => toast.error('Failed to copy'))
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.12)',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)',
            },
          }}
        >
          <Typography noWrap={true} sx={{ flexGrow: 1, fontSize: '13px', color: 'text.secondary' }}>
            {quotationLink}
          </Typography>
          <IoCopyOutline style={{ flexShrink: 0, fontSize: '16px', color: 'text.secondary' }} />
        </Box>
      )}
      <ShareQuotationField accessFormValuesSignal={accessFormValuesSignal} />
    </FormModal>
  )
}
