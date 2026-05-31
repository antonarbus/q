import { SubscribeButton } from '@front/features/user/subscribe/SubscribeButton'
import { openQuotationPageAndLoadPrev } from '@front/features/open-close/open-quotation-page/openQuotationPageAndLoadPrev'
import { backQuotationStorage } from '@front/entities/quotation/storage/backQuotationStorage'
import { FormModal } from '@front/shared/component/FormModal'
import { MdLockOutline } from 'react-icons/md'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const SubscriptionPage = (): React.JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleClose = (): void => {
    if (backQuotationStorage.load() === null) {
      navigate('..')
    } else {
      openQuotationPageAndLoadPrev()
    }
  }

  return (
    <FormModal
      headerIcon={<MdLockOutline />}
      headerText='Subscription'
      modalRef={modalRef}
      onCloseClick={handleClose}
      onUnmount={handleClose}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
      width='350px'
    >
      <p style={{ textAlign: 'center' }}>Quota limit reached</p>
      <p style={{ textAlign: 'center' }}>
        <SubscribeButton />
      </p>
    </FormModal>
  )
}
