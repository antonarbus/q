import { useRef } from 'react'
import { BsInfo } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { FormModal } from '@shared/components/FormModal'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { useUpdateItemInfo } from '@features/info/update_info'
import { router } from '@lib_instances/router'
import { useLoadInitValuesIntoInfoModal } from '@features/open_close/open_info_modal'
import { useLoadInfoModalOpenedWithDirectLink } from '@features/open_close/open_info_modal/useLoadInfoModalOpenedWithDirectLink'

export const InfoModal = (): React.ReactNode => {
  const { quotationId, bookmarkId } = useParams()
  const modalRef = useRef<HTMLDivElement>(null)
  const { infoFormValues } = useLoadInitValuesIntoInfoModal()
  useLoadInfoModalOpenedWithDirectLink({ infoFormValues })
  const id = bookmarkId ?? quotationId ?? 'new'
  useUpdateItemInfo({ id, infoFormValues })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px'
      headerText='Info'
      headerIcon={<BsInfo />}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={navigateUp}
      onCloseClick={navigateUp}
    >
      <NameField nameSignal={infoFormValues.nameSignal} />
      <CategoryField categorySignal={infoFormValues.categorySignal} />
      <DescriptionField descSignal={infoFormValues.descSignal} />
      <InfoField infoSignal={infoFormValues.infoSignal} />
    </FormModal>
  )
}
