import { dispatch, getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useEditQuotation } from '@features/quotation/edit_quotation'
import { FormModal } from '@shared/components'
import {
  type SharedWithOption,
  sharedWithOption,
} from '@shared/consts/sharedWithOption'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { QuotationField } from './QuotationField'
import { ShareField } from './ShareField'
import { useParams } from 'react-router-dom'
import {
  getWhoQuotationSharedWithOption,
  quotationSlice,
  useGetQuotationMutation,
} from '@entities/quotation'
import { useEffectOnce, useUpdateEffect } from 'react-use'

export const QuotationEditModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)

  const quotation = getState().quotation

  const nameSignal = useSignal(quotation.name ?? '')
  const categorySignal = useSignal(quotation.category ?? '')
  const descSignal = useSignal(quotation.desc ?? '')
  const infoSignal = useSignal(quotation.info ?? '')

  const shareWithOptionSignal = useSignal<SharedWithOption>(
    getWhoQuotationSharedWithOption({ quotation }),
  )
  const sharedWithSignal = useSignal<string[]>(quotation.sharedWith ?? [])

  const { onSubmit, isPending, isSuccess, isError } = useEditQuotation({
    modalRef,
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
  })

  const { id } = useParams()

  const {
    mutate: loadQuotation,
    isSuccess: isLoadQuotationSuccess,
    data,
  } = useGetQuotationMutation()

  useEffectOnce(() => {
    if (!id) return
    loadQuotation({ id })
  })

  useUpdateEffect(() => {
    if (!data?.quotation) return

    dispatch(
      quotationSlice.actions.loadQuotationReducer({
        quotation: data.quotation,
      }),
    )

    nameSignal.value = data.quotation.name ?? ''
    categorySignal.value = data.quotation.category ?? ''
    descSignal.value = data.quotation.desc ?? ''
    infoSignal.value = data.quotation.info ?? ''

    shareWithOptionSignal.value = getWhoQuotationSharedWithOption({
      quotation: data.quotation,
    })

    sharedWithSignal.value = quotation.sharedWith ?? []
  }, [isLoadQuotationSuccess])

  return (
    <FormModal
      width='500px'
      headerIcon={<FiEdit3 />}
      headerText='Edit quotation'
      buttonText='UPDATE'
      isButtonDisabled={nameSignal.value === '' || categorySignal.value === ''}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      modalRef={modalRef}
      onCloseSlideModalOutAndNavigateUp={true}
      onSubmit={onSubmit}
    >
      <NameField nameSignal={nameSignal} />
      <CategoryField categorySignal={categorySignal} />
      <DescriptionField descSignal={descSignal} />
      <InfoField infoSignal={infoSignal} />
      <ShareField
        shareWithOptionSignal={shareWithOptionSignal}
        sharedWithSignal={sharedWithSignal}
      />
      <QuotationField blocks={quotation.blocks} />
    </FormModal>
  )
}
