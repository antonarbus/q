import { dispatch } from '@lib_instances/store'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useCallback, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { quotationSlice, type Item } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { CardCustom } from '@shared/components/CardCustom'
import { InfoField } from './InfoField'

export const ItemInfoModal = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const item = location.state.item as Item | undefined
  const itemIndex = location.state.itemIndex as number | undefined
  const rowIndex = location.state.rowIndex as number | undefined

  // todo: change desc --> info
  const infoSignal = useSignal(item?.info ?? '')

  useSignalEffect(() => {
    if (!item) return

    dispatch(quotationSlice.actions.updateItemInfoReducer({
      itemIndex,
      rowIndex,
      item: {
        ...item,
        info: infoSignal.value,
      },
    }))
  })

  const onSlideModalOutComplete = useCallback(() => {
    navigate('..')
  }, [])

  return (
    <BackdropWithSlidableModal
      onSlideModalOutComplete={onSlideModalOutComplete}
    >
      <CardCustom
        reference={cardRef}
        sx={{ p: '30px' }}
      >
        <InfoField infoSignal={infoSignal}/>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
