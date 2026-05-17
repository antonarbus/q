import { SubscribeButtons } from '@front/features/user/subscribe/SubscribeButtons'
import { FormModal } from '@front/shared/component/FormModal'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { Typography } from '@mui/material'
import { MdLockOutline } from 'react-icons/md'
import { useRef } from 'react'

export const SubscriptionPage = (): React.JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)

  return (
    <FormModal
      headerIcon={<MdLockOutline />}
      headerText='Quota limit reached'
      modalRef={modalRef}
      onCloseClick={(): void => {
        routerHolder.router.navigate('..')
      }}
      onUnmount={(): void => {
        routerHolder.router.navigate('..')
      }}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
      width='350px'
    >
      <Typography sx={{ mb: 3 }}>
        You&apos;ve used all 100 free quotations. Get unlimited access.
      </Typography>
      <SubscribeButtons />
    </FormModal>
  )
}
