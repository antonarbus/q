import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateInfo } from '@features/info'
import { type Item } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { CardCustom } from '@shared/components/CardCustom'
import { InfoField } from './InfoField'

export const ItemInfoModal = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const item = location.state.item as Item | undefined

  const infoSignal = useSignal(item?.info ?? '')
  useUpdateInfo({ infoSignal, id: item?.id ?? '' })

  return (
    <BackdropWithSlidableModal
      onSlideModalOutComplete={() => {
        navigate('..')
      }}
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
