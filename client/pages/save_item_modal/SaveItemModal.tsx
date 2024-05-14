import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useCallback, useRef } from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetItemCategoriesQuery, useSaveItemMutation } from '@entities/item'
import { type Item } from '@entities/quotation'
import { FormModal } from '@shared/components'
import { nanoid } from '@shared/lib/nanoid'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const SaveItemModal = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const item = location.state.item as Item | undefined
  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(item?.name ?? '')
  const categorySignal = useSignal(item?.category ?? '')
  const descSignal = useSignal(item?.desc ?? '')
  const { mutate: saveItem, data, isSuccess, isPending, isError, error, reset } = useSaveItemMutation()
  const { refetch: updateCategories } = useGetItemCategoriesQuery()

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({ msg: 'Saved', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      void updateCategories()

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

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    const email = getState().user.email

    if (!email) {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      return
    }

    if (!item) return

    const itemWithUpdatedValues = {
      ...item,
      name: nameSignal.value,
      category: categorySignal.value,
      desc: descSignal.value,
    }

    saveItem({ item: itemWithUpdatedValues })
  }

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px'
      headerText='Save item'
      headerIcon={<BsBookmarkStar />}
      buttonText='SAVE'
      isButtonDisabled={isDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSlideModalOutComplete={onSlideModalOutComplete}
      onSubmit={onSubmit}
      onCloseClick={onCloseClick}
    >
      <NameInput nameSignal={nameSignal}/>
      <CategoryAutocomplete categorySignal={categorySignal}/>
      <DescriptionTextarea descSignal={descSignal}/>
    </FormModal>
  )
}
