import { useRef } from 'react'
import { BsInfo } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { FormModal } from '@shared/components/FormModal'
import { useUpdateItemInfo } from '@features/info/update_info'
import { router } from '@shared/lib/router'
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
