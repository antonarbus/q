import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateInfo } from '@features/info'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { CardCustom } from '@shared/components/CardCustom'
import { InfoField } from './InfoField'

export const QuotationInfoModal = (): JSX.Element => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const infoSignal = useSignal(getState().quotation.info ?? '')
  useUpdateInfo({ infoSignal, id: getState().quotation.id })

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
