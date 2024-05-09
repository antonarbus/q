import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar } from '@mui/material'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { BsInfoLg } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import { quotationSlice, type Copyable } from '@entities/quotation'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { CardCustom } from '@shared/components/CardCustom'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const ItemInfoModal = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const item = location.state.item as Copyable | undefined
  const itemIndex = location.state.itemIndex as number | undefined
  const rowIndex = location.state.rowIndex as number | undefined

  const nameSignal = useSignal(item?.name ?? '')
  const categorySignal = useSignal(item?.category ?? '')
  const descSignal = useSignal(item?.desc ?? '')

  useSignalEffect(() => {
    if (!item) return

    dispatch(quotationSlice.actions.updateItemInfoReducer({
      itemIndex,
      rowIndex,
      item: {
        ...item,
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
            <BsInfoLg />
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
