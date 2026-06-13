import { SubscribeButton } from '@front/features/user/subscribe/SubscribeButton'
import { FormModal } from '@front/shared/component/FormModal'
import { MdLockOutline } from 'react-icons/md'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const SubscriptionPage = (): React.JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  return (
    <FormModal
      headerIcon={<MdLockOutline />}
      headerText='Subscription'
      modalRef={modalRef}
      onCloseClick={(): void => {
        void navigate('..')
      }}
      onUnmount={(): void => {
        void navigate('..')
      }}
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
