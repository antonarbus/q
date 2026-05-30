import { SubscribeButtons } from '@front/features/user/subscribe/SubscribeButtons'
import { openQuotationPageAndLoadPrev } from '@front/features/open-close/open-quotation-page/openQuotationPageAndLoadPrev'
import { FormModal } from '@front/shared/component/FormModal'
import { backToQuotationRef } from '@front/entities/quotation/ref/backToQuotationRef'
import { Box, Typography } from '@mui/material'
import { MdLockOutline } from 'react-icons/md'
import { useRef } from 'react'

export const SubscriptionPage = (): React.JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)

  return (
    <FormModal
      headerIcon={<MdLockOutline />}
      headerText=''
      modalRef={modalRef}
      onCloseClick={(): void => {
        if (backToQuotationRef.current !== null) {
          openQuotationPageAndLoadPrev()
        }
      }}
      onUnmount={(): void => {
        if (backToQuotationRef.current !== null) {
          openQuotationPageAndLoadPrev()
        }
      }}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
      width='350px'
    >
      <Typography sx={{ mb: 3, textAlign: 'center' }}>Quota limit reached</Typography>
      <Box sx={{ textAlign: 'center' }}>
        <SubscribeButtons />
      </Box>
    </FormModal>
  )
}
