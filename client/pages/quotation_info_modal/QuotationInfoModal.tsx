import { dispatch, getState } from '@lib_instances/store'
import { useSignal, useSignalEffect } from '@preact/signals-react'
import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { quotationSlice } from '@entities/quotation'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { CardCustom } from '@shared/components/CardCustom'
import { InfoField } from './InfoField'

export const QuotationInfoModal = (): JSX.Element => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  // todo: change desc --> info
  const infoSignal = useSignal(getState().quotation.info ?? '')

  useSignalEffect(() => {
    const { quotation } = getState()

    dispatch(quotationSlice.actions.updateQuotationInfoReducer({
      quotation: {
        ...quotation,
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
