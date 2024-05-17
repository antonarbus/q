import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetItemCategoriesQuery, useSaveItemMutation } from '@entities/item'
import { type Item } from '@entities/quotation'
import { FormModal } from '@shared/components'
import { nanoid } from '@shared/lib/nanoid'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'

export const SaveBookmarkModal = (): JSX.Element => {
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
      headerText='Add to bookmarks'
      headerIcon={<MdOutlineStarOutline />}
      buttonText='ADD'
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
