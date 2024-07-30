import { getState, useSelectorTyped } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useLocation, type Location } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { useSaveQuotation } from '@features/quotation/save_quotation'
import { FormModal } from '@shared/components'
import {
  type SharedWithOption,
  sharedWithOption,
} from '@shared/consts/sharedWithOption'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { ShareField } from './ShareField'
import type { OpenSaveQuotationModalNavigateState } from '@features/open_close/open_save_quotation_modal/openSaveQuotationModal'
import { QuotationField } from '../quotation_edit_modal/QuotationField'

export const QuotationSaveModal = (): JSX.Element => {
  const location =
    useLocation() as Location<OpenSaveQuotationModalNavigateState>
  const quotation = getState().quotation
  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(quotation.name ?? '')
  const categorySignal = useSignal(quotation.category ?? '')
  const descSignal = useSignal(quotation.desc ?? '')
  const infoSignal = useSignal(quotation.info ?? '')
  const scrollTop = location.state.scrollTop

  useEffectOnce(() => {
    document.body.scrollTop = scrollTop
  })

  const getOptionValue = (): SharedWithOption => {
    if (quotation.sharedWith?.length === 0) return sharedWithOption.nobody
    if (quotation.sharedWith?.includes('*')) return sharedWithOption.everybody
    return sharedWithOption.persons
  }

  const shareWithOptionSignal = useSignal<SharedWithOption>(getOptionValue())
  const sharedWithSignal = useSignal<string[]>(quotation.sharedWith ?? [])

  const { onSubmit, isPending, isSuccess, isError } = useSaveQuotation({
    modalRef,
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
  })
  const id = useSelectorTyped((state) => state.quotation.id)
  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  const forgotToAddPerson =
    shareWithOptionSignal.value === 'persons' &&
    sharedWithSignal.value.length === 0

  return (
    <FormModal
      modalRef={modalRef}
      width='500px'
      headerText='Save quotation'
      headerIcon={<MdSaveAlt />}
      buttonText={id === 'new' ? 'SAVE' : 'UPDATE'}
      isButtonDisabled={isDisabled || forgotToAddPerson}
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
