import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { quotationSlice, useGetQuotationCategoriesQuery, useSaveQuotationMutation } from '@entities/quotation'
import { FormModal } from '@shared/components'
import { navItemId } from '@shared/consts/navItemId'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice, showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'

export const SaveQuotationModal = (): JSX.Element => {
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(getState().quotation.name ?? '')
  const categorySignal = useSignal(getState().quotation.category ?? '')
  const descSignal = useSignal(getState().quotation.desc ?? '')
  const { mutate: saveQuotation, data, isSuccess, isPending, isError, error, reset } = useSaveQuotationMutation()
  const { refetch: updateCategories } = useGetQuotationCategoriesQuery()

  const id = useSelectorTyped(state => state.quotation.id)
  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  useUpdateEffect(() => {
    if (isPending) {
      showLoadingNavIcon({ navMenuItemIdKey: navItemId.save })
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({ msg: 'Saved', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      void updateCategories()

      if (data.quotation) {
        dispatch(quotationSlice.actions.loadQuotationReducer({ quotation: data.quotation }))
      }

      showSuccessNavIcon({ navMenuItemIdKey: navItemId.save })
      dispatch(navSlice.actions.disableNavItems({ navItemIdKeys: [navItemId.save] }))
      dispatch(navSlice.actions.removeUnderlineFromTopNav())

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate(`/${data.quotation?.id ?? 'no id set'}`, { replace: true, state: nanoid() })
          },
        })
      }, 1000)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'dark', position: 'bottom-center' })
      showErrorNavIcon({ navMenuItemIdKey: navItemId.save })
      reset()
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    const email = getState().user.email

    if (!email) {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      return
    }

    const existingId = getState().quotation.id
    const id = existingId === 'new' ? nanoid(5) : existingId

    const quotation = {
      ...getState().quotation,
      id,
      name: nameSignal.value,
      category: categorySignal.value,
      desc: descSignal.value,
      items: getState().quotation.items,
    }

    saveQuotation({ quotation })
  }

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px'
      headerText='Save quotation'
      headerIcon={<MdSaveAlt />}
      buttonText={id === 'new' ? 'SAVE' : 'UPDATE'}
      isButtonDisabled={isDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <NameField nameSignal={nameSignal}/>
      <CategoryField categorySignal={categorySignal}/>
      <DescriptionField descSignal={descSignal}/>
    </FormModal>
  )
}
