import { dispatch, getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { quotationSlice } from '@entities/quotation'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { CardCustom } from '@shared/components/CardCustom'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const QuotationInfoModal = (): JSX.Element => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(getState().quotation.name ?? '')
  const categorySignal = useSignal(getState().quotation.category ?? '')
  const descSignal = useSignal(getState().quotation.desc ?? '')

  useSignalEffect(() => {
    const { quotation } = getState()

    dispatch(quotationSlice.actions.updateQuotationInfoReducer({
      quotation: {
        ...quotation,
        name: nameSignal.value,
        category: categorySignal.value,
        desc: descSignal.value,
      },
    }))
  })

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
        title='Info'
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }} >
            <BsBookmarkStar />
          </Avatar>
        }
      >
        <form>
          <NameInput nameSignal={nameSignal}/>
          <CategoryAutocomplete categorySignal={categorySignal}/>
          <DescriptionTextarea descSignal={descSignal}/>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
