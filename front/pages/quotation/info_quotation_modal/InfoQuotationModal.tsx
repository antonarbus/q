import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { BsInfo } from 'react-icons/bs'
import { useUpdateQuotationInfo } from '@features/quotation/update_quotation_info/useUpdateQuotationInfo'
import { FormModal } from '@shared/components'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'

export const InfoQuotationModal = (): React.ReactNode => {
  const modalRef = useRef<HTMLDivElement>(null)

  const quotation = getState().quotation

  const nameSignal = useSignal(quotation.name)
  const categorySignal = useSignal(quotation.category)
  const descSignal = useSignal(quotation.desc)
  const infoSignal = useSignal(quotation.info)

  useUpdateQuotationInfo({ nameSignal, categorySignal, descSignal, infoSignal })

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px'
      headerText='Info'
      headerIcon={<BsInfo />}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <NameField nameSignal={nameSignal} />
      <CategoryField categorySignal={categorySignal} />
      <DescriptionField descSignal={descSignal} />
      <InfoField infoSignal={infoSignal} />
    </FormModal>
  )
}
