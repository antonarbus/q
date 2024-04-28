import { theme } from '@lib_instances/theme'
import { Avatar } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useGetItemsQuery, useSaveItemMutation } from '@entities/item'
import { type Copyable } from '@entities/quotation'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { nanoid } from '@shared/lib/nanoid'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const SaveItem = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const cardRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal('')
  const categorySignal = useSignal('')
  const descSignal = useSignal('')
  const { mutate: saveItem, data, isSuccess, isPending, isError, error } = useSaveItemMutation()
  const { data: itemsRes, refetch: fetchItems } = useGetItemsQuery()

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  useEffectOnce(() => {
    void fetchItems()
  })

  const buttonTextSignal = useSignal('SAVE')

  useSignalEffect(() => {
    const isItemWithSameNameAndCategory = (itemsRes?.documents ?? [])
      .some(item => item.name === nameSignal.value && item.category === categorySignal.value)

    buttonTextSignal.value = isItemWithSameNameAndCategory ? 'UPDATE' : 'SAVE'
  })

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'inserted') {
        notify({ msg: 'Added', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      setTimeout(() => {
        slideElement({
          element: cardRef.current,
          onSlide: () => {
            navigate('..', { replace: true, state: nanoid() })
          },
        })
      }, 1500)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'not logged in') {
        notify({ msg: 'Not logged in', type: 'warn', theme: 'dark', position: 'bottom-center' })
      } else if (error.response?.data.message === 'not saved') {
        notify({ msg: 'Not saved', type: 'warn', theme: 'dark', position: 'bottom-center' })
      } else if (error.response?.data.message === 'category is not provided') {
        notify({ msg: 'Category is not provided', type: 'warn', theme: 'dark', position: 'bottom-center' })
      } else if (error.response?.data.message === 'name is not provided') {
        notify({ msg: 'Name is not provided', type: 'warn', theme: 'dark', position: 'bottom-center' })
      } else {
        notify({ msg: 'Internal error', type: 'error', theme: 'dark', position: 'bottom-center' })
      }
    }
  }, [isError])

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => {
        /* inputRef.current.focus() */
      }}
      onSlideOut={() => {
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

            const itemToSave = location.state.itemToSave as Copyable | undefined

            if (!itemToSave) return

            const item = {
              ...itemToSave,
              name: nameSignal.value,
              category: categorySignal.value,
              desc: descSignal.value,
            }

            saveItem({ item })
          }}
        >
          <NameInput nameSignal={nameSignal}/>
          <CategoryAutocomplete categorySignal={categorySignal}/>
          <DescriptionTextarea descSignal={descSignal}/>
          <ButtonCustom
            disabled={isDisabled}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
          >
            {buttonTextSignal}
          </ButtonCustom>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
