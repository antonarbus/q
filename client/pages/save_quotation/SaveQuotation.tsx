import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetItemCategoriesQuery, useSaveItemMutation } from '@entities/item'
import { quotationSlice, useSaveQuotationMutation, type Copyable } from '@entities/quotation'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { navItemId } from '@shared/consts/navItemId'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice, showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const SaveQuotation = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const cardRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(getState().quotation.name ?? '')
  const categorySignal = useSignal(getState().quotation.category ?? '')
  const descSignal = useSignal(getState().quotation.desc ?? '')
  // const { mutate: saveItem, data, isSuccess, isPending, isError, error } = useSaveItemMutation()
  const { mutate: saveQuotation, data, isSuccess, isPending, isError, error } = useSaveQuotationMutation()

  const { refetch: updateCategories } = useGetItemCategoriesQuery()

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  const quotationId = useSelectorTyped(state => state.quotation.id)

  // todo: if item already exists return a msg from the back and show the confirmation to update

  useUpdateEffect(() => {
    if (isPending) {
      showLoadingNavIcon({ navMenuItemIdKey: navItemId.save })
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'inserted') {
        notify({ msg: 'Saved', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'saved') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      void updateCategories()

      setTimeout(() => {
        slideElement({
          element: cardRef.current,
          onSlide: () => {
            navigate(`/${quotationId}`, { replace: true, state: nanoid() })
            showSuccessNavIcon({ navMenuItemIdKey: navItemId.save })
            dispatch(navSlice.actions.disableNavItems({ navItemIdKeys: [navItemId.save] }))
            dispatch(navSlice.actions.removeUnderlineFromTopNav())
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

      navigate('..')
      showErrorNavIcon({ navMenuItemIdKey: navItemId.save })
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
        title='Save quotation'
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

            const id = nanoid(5)

            const quotation = {
              id: quotationId === 'new' ? id : quotationId,
              items: getState().quotation.items,
              name: nameSignal.value,
              category: categorySignal.value,
              desc: descSignal.value,
            }

            dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))
            saveQuotation({ quotation })
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
            {quotationId ? 'SAVE' : 'UPDATE'}
          </ButtonCustom>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
