import { dispatch } from '@lib_instances/store'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { quotationSlice, type Item } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { CardCustom } from '@shared/components/CardCustom'
import { InfoTextarea } from './InfoTextarea'

export const ItemInfoModal = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const item = location.state.item as Item | undefined
  const itemIndex = location.state.itemIndex as number | undefined
  const rowIndex = location.state.rowIndex as number | undefined

  const infoSignal = useSignal(item?.desc ?? '')

  useSignalEffect(() => {
    if (!item) return

    dispatch(quotationSlice.actions.updateItemInfoReducer({
      itemIndex,
      rowIndex,
      item: {
        ...item,
        desc: infoSignal.value, // todo: rename desc --> info
      },
    }))
  })

  return (
    <BackdropWithSlidableModal
      onSlideModalOutComplete={() => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        sx={{
          padding: '30px',
        }}
      >
        <InfoTextarea descSignal={infoSignal}/>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
