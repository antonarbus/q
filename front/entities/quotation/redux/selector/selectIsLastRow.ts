import { getRowsFromStoreByIndex } from '../getter/getRowsFromStoreByIndex'

type Props = {
  blockIndex: number
}

export const selectIsLastRow =
  ({ blockIndex }: Props) =>
  (): boolean => {
    const rows = getRowsFromStoreByIndex({ blockIndex })

    if (rows === undefined) {
      return false
    }

    const isRowAlone = rows.length === 1

    return isRowAlone
  }
