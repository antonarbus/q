import { useRef, type ReactNode } from 'react'
import { BsInfo } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { FormModal } from '@shared/component/FormModal'
import { useUpdateItemInfo } from '@features/info/update-info'
import { router } from '@shared/lib/react-router-dom'
import { useLoadInitValuesIntoInfoModal } from '@features/open-close/open-info-modal'
import { useLoadInfoModalOpenedWithDirectLink } from '@features/open-close/open-info-modal/useLoadInfoModalOpenedWithDirectLink'
import { NameField } from '@shared/component/input-field/NameField'
import { CategoryField } from '@shared/component/input-field/CategoryField'
import { DescriptionField } from '@shared/component/input-field/DescriptionField'
import { InfoField } from '@shared/component/input-field/InfoField'
import { useCategories } from './useCategories'

export const InfoModal = (): ReactNode => {
  const { quotationId, bookmarkId } = useParams()
  const modalRef = useRef<HTMLDivElement>(null)
  const { infoFormValues } = useLoadInitValuesIntoInfoModal()
  useLoadInfoModalOpenedWithDirectLink({ infoFormValues })
  const id = bookmarkId ?? quotationId ?? 'new'
  useUpdateItemInfo({ id, infoFormValues })
  const { categories } = useCategories()

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      headerIcon={<BsInfo />}
      headerText='Info'
      modalRef={modalRef}
      onCloseClick={navigateUp}
      onUnmount={navigateUp}
      paddingContent='50px 40px'
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      width='350px'
    >
      <NameField nameSignal={infoFormValues.nameSignal} />
      <CategoryField
        categorySignal={infoFormValues.categorySignal}
        options={categories}
      />
      <DescriptionField descSignal={infoFormValues.descSignal} />
      <InfoField infoSignal={infoFormValues.infoSignal} />
    </FormModal>
  )
}
