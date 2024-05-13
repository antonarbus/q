import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { quotationSlice, useGetQuotationCategoriesQuery, useSaveQuotationMutation } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
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

export const SaveQuotationModal = (): JSX.Element => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
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
          element: cardRef.current,
          onSlideElementComplete: () => {
            navigate(`/${id}`, { replace: true, state: nanoid() })
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
            {id === 'new' ? 'SAVE' : 'UPDATE'}
          </ButtonCustom>
        </form>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
