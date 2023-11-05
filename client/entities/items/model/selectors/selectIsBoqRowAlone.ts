import type { RootState } from 'client/shared/types'

type Props = {
  boqRowId: string
}

export const selectIsBoqRowAlone = ({ boqRowId }: Props) => (state: RootState): boolean => {
  let boqRowIsAlone = false

  state.items.forEach((item) => {
    if (item.type !== 'boq') return

    const boqRows = item.boq.rows.filter(boqRow => boqRow.type === 'boq row')

    boqRows.forEach((boqRow) => {
      if (boqRow.id === boqRowId) {
        const isBoqRowAlone = boqRows.length === 1

        if (isBoqRowAlone) {
          boqRowIsAlone = true
        }
      }
    })
  })

  return boqRowIsAlone
}
