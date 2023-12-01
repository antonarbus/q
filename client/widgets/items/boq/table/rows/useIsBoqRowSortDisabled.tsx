import { selectIsLastBoqRow } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'

type Props = {
  itemIndex: number
}

export const useIsBoqRowSortDisabled = ({ itemIndex }: Props): boolean => {
  const isCopyContainer = useSelectorTyped(state => state.copy.isCopyContainer)
  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isBoqRowSortDisabled = isCopyContainer || isLastBoqRow
  return isBoqRowSortDisabled
}
