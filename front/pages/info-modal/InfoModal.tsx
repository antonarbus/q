import { useUpdateItemInfo } from '@front/features/info/update-info/useUpdateItemInfo'
import { useInfoFormValues } from '@front/features/open-close/open-info-modal'
import { useLoadInfoModalOpenedWithDirectLink } from '@front/features/open-close/open-info-modal/useLoadInfoModalOpenedWithDirectLink'
import { FormModal } from '@front/shared/component/FormModal'
import { CategoryField } from '@front/shared/component/input-field/CategoryField'
import { DescriptionField } from '@front/shared/component/input-field/DescriptionField'
import { InfoField } from '@front/shared/component/input-field/InfoField'
import { NameField } from '@front/shared/component/input-field/NameField'
import { routerHolder } from '@front/shared/lib/react-router-dom/router'
import { useRef } from 'react'
import { BsInfo } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { useDistinctCategories } from './useDistinctCategories'

export const InfoModal = (): React.ReactNode => {
  const urlParams = useParams()
  const modalRef = useRef<HTMLDivElement>(null)
  const infoFormValues = useInfoFormValues()
  useLoadInfoModalOpenedWithDirectLink({ infoFormValues })
  const id = urlParams.bookmarkId ?? urlParams.quotationId ?? 'new'
  useUpdateItemInfo({ id, infoFormValues })
  const distinctCategories = useDistinctCategories()

  const navigateUp = (): void => {
    routerHolder.router.navigate('..')
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
      <CategoryField categorySignal={infoFormValues.categorySignal} options={distinctCategories} />
      <DescriptionField descSignal={infoFormValues.descSignal} />
      <InfoField infoSignal={infoFormValues.infoSignal} />
    </FormModal>
  )
}
