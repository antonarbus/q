import { getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { type Quotation, useGetQuotationCategoriesQuery, useGetQuotationsQuery, useSaveQuotationMutation } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
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

  const cardRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(quotation?.name ?? '')
  const categorySignal = useSignal(quotation?.category ?? '')
  const descSignal = useSignal(quotation?.desc ?? '')

  const { mutate: saveQuotation, data, isSuccess, isPending, isError, error, reset } = useSaveQuotationMutation()
  const { refetch: updateQuotationCategories } = useGetQuotationCategoriesQuery()
  const { refetch: refetchQuotations } = useGetQuotationsQuery()

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({ msg: 'Saved', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      void updateQuotationCategories()
      void refetchQuotations()

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
        title='Edit quotation'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }} >
            <FiEdit3 />
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

            if (!quotation) return

            const quotationWithUpdatedValues = {
              ...quotation,
              name: nameSignal.value,
              category: categorySignal.value,
              desc: descSignal.value,
            }

            saveQuotation({ quotation: quotationWithUpdatedValues })
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
            UPDATE
          </ButtonCustom>
        </form>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
