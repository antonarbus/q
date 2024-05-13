import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useCallback, useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { FirstItem } from '@widgets/items/FirstItem'
import { useGetItemCategoriesQuery, useGetItemsQuery, useSaveItemMutation } from '@entities/item'
import { FormModal } from '@shared/components'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const EditItemModal = (): JSX.Element => {
  const navigate = useNavigate()
  const item = getState().quotation.items.at(0)
  const modalRef = useRef<HTMLDivElement>(null)

  const nameSignal = useSignal(item?.name ?? '')
  const categorySignal = useSignal(item?.category ?? '')
  const descSignal = useSignal(item?.desc ?? '')

  const { mutate: saveItem, data, isSuccess, isPending, isError, error, reset } = useSaveItemMutation()
  const { refetch: updateItemCategories } = useGetItemCategoriesQuery()
  const { refetch: updateItems } = useGetItemsQuery()

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({ msg: 'Saved', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      void updateItemCategories()
      void updateItems()

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate('..')
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

  const onCloseClick = useCallback(() => {
    slideElement({
      element: modalRef.current,
      onSlideElementComplete: () => {
        navigate('..')
      },
    })
  }, [])

  const onSlideModalOutComplete = useCallback(() => {
    navigate('..')
  }, [])

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    const email = getState().user.email

    if (!email) {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      return
    }

    const item = getState().quotation.items.at(0)

    if (!item) {
      notify({ msg: 'No item loaded', type: 'warn', theme: 'light' })
      return
    }

    // todo: also need to save preview and dimensions

    const itemWithUpdatedValues = {
      ...item,
      name: nameSignal.value,
      category: categorySignal.value,
      desc: descSignal.value,
    }

    saveItem({ item: itemWithUpdatedValues })
  }, [])

  return (
    <FormModal
      width='500px'
      headerIcon={<FiEdit3 />}
      headerText='Edit item'
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
      <FirstItem />
    </FormModal>
  )
}
