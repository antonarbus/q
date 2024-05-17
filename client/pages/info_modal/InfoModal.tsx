import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateInfo } from '@features/info'
import { getItemByIdFromStore } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { CardCustom } from '@shared/components/CardCustom'
import { InfoField } from './InfoField'

export const InfoModal = (): React.ReactNode => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { id } = useParams()

  if (!id) return null

  const infoSignal = useSignal(getItemByIdFromStore({ id })?.info ?? '')
  useUpdateInfo({ infoSignal, id })

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
