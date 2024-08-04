import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { BsInfo } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { getFromStore } from '@entities/quotation'
import { FormModal } from '@shared/components'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { useUpdateItemInfo } from '@features/blocks/update_info'

export const InfoModal = (): React.ReactNode => {
  const modalRef = useRef<HTMLDivElement>(null)

  const { id } = useParams()

  const item = getFromStore({ id: id ?? 'new' })

  if (!item) return null

  const nameSignal = useSignal(item.name)
  const categorySignal = useSignal(item.category)
  const descSignal = useSignal(item.desc)
  const infoSignal = useSignal(item.info)

  useUpdateItemInfo({ id, nameSignal, categorySignal, descSignal, infoSignal })

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
