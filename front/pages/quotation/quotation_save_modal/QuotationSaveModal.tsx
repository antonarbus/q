import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useLocation, type Location } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { useSaveQuotation } from '@features/quotation/save_quotation'
import { FormModal } from '@shared/components'
import type { SharedWithOption } from '@shared/consts/sharedWithOption'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { ShareField } from './ShareField'
import type { OpenSaveQuotationModalNavigateState } from '@features/open_close/open_save_quotation_modal/openSaveQuotationModal'
import { QuotationField } from '../quotation_edit_modal/QuotationField'
import {
  useLoadInitValuesIntoQuotationEditForm,
  useLoadQuotationEditModalOpenedWithDirectLink,
} from '@features/open_close/open_quotation_edit_modal'

export const QuotationSaveModal = (): JSX.Element => {
  const location =
    useLocation() as Location<OpenSaveQuotationModalNavigateState>
  const scrollTop = location.state.scrollTop

  useEffectOnce(() => {
    document.body.scrollTop = scrollTop
  })

  const quotation = getState().quotation

  const modalRef = useRef<HTMLDivElement>(null)

  const nameSignal = useSignal('')
  const categorySignal = useSignal('')
  const descSignal = useSignal('')
  const infoSignal = useSignal('')
  const shareWithOptionSignal = useSignal<SharedWithOption>('nobody')
  const sharedWithSignal = useSignal<string[]>([])

  useLoadInitValuesIntoQuotationEditForm({
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
    shareWithOptionSignal,
  })

  useLoadQuotationEditModalOpenedWithDirectLink({
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
    shareWithOptionSignal,
  })

  const forgotToAddPerson =
    shareWithOptionSignal.value === 'persons' &&
    sharedWithSignal.value.length === 0

  const { onSubmit, isPending, isSuccess, isError } = useSaveQuotation({
    modalRef,
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
  })

  return (
    <FormModal
      modalRef={modalRef}
      width='500px'
      headerText={`${quotation.id === 'new' ? 'Save' : 'Update'} quotation`}
      headerIcon={<MdSaveAlt />}
      buttonText={quotation.id === 'new' ? 'SAVE' : 'UPDATE'}
      isButtonDisabled={
        nameSignal.value === '' ||
        categorySignal.value === '' ||
        forgotToAddPerson
      }
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <NameField nameSignal={nameSignal} />
      <CategoryField categorySignal={categorySignal} />
      <DescriptionField descSignal={descSignal} />
      <InfoField infoSignal={infoSignal} />
      <ShareField
        shareWithOptionSignal={shareWithOptionSignal}
        sharedWithSignal={sharedWithSignal}
      />
      <QuotationField />
    </FormModal>
  )
}
