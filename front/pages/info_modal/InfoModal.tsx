import { useRef } from 'react'
import { BsInfo } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { FormModal } from '@shared/components/FormModal'
import { useUpdateItemInfo } from '@features/info/update_info'
import { instance } from '@shared/instance'
import { useLoadInitValuesIntoInfoModal } from '@features/open_close/open_info_modal'
import { useLoadInfoModalOpenedWithDirectLink } from '@features/open_close/open_info_modal/useLoadInfoModalOpenedWithDirectLink'
import { NameField } from '@shared/components/input_fields/NameField'
import { CategoryField } from '@shared/components/input_fields/CategoryField'
import { DescriptionField } from '@shared/components/input_fields/DescriptionField'
import { InfoField } from '@shared/components/input_fields/InfoField'
import { useCategories } from './useCategories'

export const InfoModal = (): React.ReactNode => {
  const { quotationId, bookmarkId } = useParams()
  const modalRef = useRef<HTMLDivElement>(null)
  const { infoFormValues } = useLoadInitValuesIntoInfoModal()
  useLoadInfoModalOpenedWithDirectLink({ infoFormValues })
  const id = bookmarkId ?? quotationId ?? 'new'
  useUpdateItemInfo({ id, infoFormValues })
  const { categories } = useCategories()

  const navigateUp = (): void => {
    void instance.router.navigate('..')
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
      <CategoryField
        categorySignal={infoFormValues.categorySignal}
        options={categories}
      />
      <DescriptionField descSignal={infoFormValues.descSignal} />
      <InfoField infoSignal={infoFormValues.infoSignal} />
    </FormModal>
  )
}
