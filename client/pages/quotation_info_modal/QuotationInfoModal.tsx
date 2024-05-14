import { dispatch, getState } from '@lib_instances/store'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { quotationSlice } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { CardCustom } from '@shared/components/CardCustom'
import { InfoTextarea } from './InfoTextarea'

export const QuotationInfoModal = (): JSX.Element => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  // todo: change desc --> info
  const infoSignal = useSignal(getState().quotation.desc ?? '')

  useSignalEffect(() => {
    const { quotation } = getState()

    dispatch(quotationSlice.actions.updateQuotationInfoReducer({
      quotation: {
        ...quotation,
        desc: infoSignal.value,
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
        sx={{
          p: '30px',
        }}
      >
        <InfoTextarea infoSignal={infoSignal}/>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
