import { getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetItemCategoriesQuery, useSaveItemMutation } from '@entities/item'
import { type Item } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
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
  const cardRef = useRef<HTMLDivElement>(null)
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
          element: cardRef.current,
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

  return (
    <BackdropWithSlidableModal
      onSlideModalInComplete={() => {
        /* inputRef.current.focus() */
      }}
      onSlideModalOutComplete={() => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title='Save item'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }} >
            <BsBookmarkStar />
          </Avatar>
        }
      >
        <form
          onSubmit={(e: FormEvent): void => {
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
          }}
        >
          <NameInput nameSignal={nameSignal}/>
          <CategoryAutocomplete categorySignal={categorySignal}/>
          <DescriptionTextarea descSignal={descSignal}/>
          <ButtonCustom
            disabled={isDisabled}
            isButtonPending={isPending}
            isButtonSuccess={isSuccess}
            isButtonError={isError}
          >
            SAVE
          </ButtonCustom>
        </form>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
