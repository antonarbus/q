import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { BsInfo } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { getFromStore } from '@entities/quotation'
import { FormModal } from '@shared/components/FormModal'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { useUpdateItemInfo } from '@features/info/update_info'
import { router } from '@lib_instances/router'

export const InfoModal = (): React.ReactNode => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { quotationId, bookmarkId } = useParams()

  const item = getFromStore({ id: bookmarkId ?? quotationId ?? 'new' })

  if (!item) return null

  const nameSignal = useSignal(item.name)
  const categorySignal = useSignal(item.category)
  const descSignal = useSignal(item.desc)
  const infoSignal = useSignal(item.info)

  useUpdateItemInfo({
    id: bookmarkId ?? quotationId ?? 'new',
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
  })

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px'
      headerText='Info'
      headerIcon={<BsInfo />}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={() => {
        void router.navigate('..')
      }}
      onCloseClick={() => {
        void router.navigate('..')
      }}
    >
      <NameField nameSignal={nameSignal} />
      <CategoryField categorySignal={categorySignal} />
      <DescriptionField descSignal={descSignal} />
      <InfoField infoSignal={infoSignal} />
    </FormModal>
  )
}
