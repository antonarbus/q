import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useCallback, useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { type Quotation, useGetQuotationCategoriesQuery, useGetQuotationsQuery, useSaveQuotationMutation } from '@entities/quotation'
import { FormModal } from '@shared/components'
import { nanoid } from '@shared/lib/nanoid'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const EditQuotationModal = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const quotation = location.state.quotation as Quotation | undefined

  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(quotation?.name ?? '')
  const categorySignal = useSignal(quotation?.category ?? '')
  const descSignal = useSignal(quotation?.desc ?? '')

  const { mutate: saveQuotation, data, isSuccess, isPending, isError, error, reset } = useSaveQuotationMutation()
  const { refetch: updateQuotationCategories } = useGetQuotationCategoriesQuery()
  const { refetch: fetchQuotations } = useGetQuotationsQuery()

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({ msg: 'Saved', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      void updateQuotationCategories()
      void fetchQuotations()

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate('..', { replace: true, state: nanoid() })
          },
        })
      }, 1000)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'dark', position: 'bottom-center' })
      reset()
    }
  }, [isError])

  const onSlideModalOutComplete = useCallback(() => {
    navigate('..')
  }, [])

  const onCloseClick = useCallback(() => {
    slideElement({
      element: modalRef.current,
      onSlideElementComplete: () => {
        navigate('..')
      },
    })
  }, [])

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    const email = getState().user.email

    if (!email) {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      return
    }

    if (!quotation) return

    const quotationWithUpdatedValues = {
      ...quotation,
      name: nameSignal.value,
      category: categorySignal.value,
      desc: descSignal.value,
    }

    saveQuotation({ quotation: quotationWithUpdatedValues })
  }, [])

  return (
    <FormModal
      width='500px'
      headerIcon={<FiEdit3 />}
      headerText='Edit quotation'
      buttonText='UPDATE'
      isButtonDisabled={isDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      modalRef={modalRef}
      onCloseClick={onCloseClick}
      onSlideModalOutComplete={onSlideModalOutComplete}
      onSubmit={onSubmit}
    >
      <NameInput nameSignal={nameSignal}/>
      <CategoryAutocomplete categorySignal={categorySignal}/>
      <DescriptionTextarea descSignal={descSignal} />

      {/* todo: make similar card for quotation as for item */}
      {/* <FirstItem /> */}
    </FormModal>
  )
}
