import { type BoqRowEditorRefs } from '@entities/quotation'

type Props = {
  e: KeyboardEvent
  boqRowEditorRefs: BoqRowEditorRefs
  rowIndex: number
}

export const tabFromPriceCell = ({
  e,
  boqRowEditorRefs,
  rowIndex,
}: Props): void => {
  const isTabKey = e.key === 'Tab'

  if (isTabKey) {
    const isLastRow = boqRowEditorRefs.length === rowIndex + 1

    if (isLastRow) {
      // do nothing
      // just use default tabbing to the next focusable area
    }

    if (!isLastRow) {
      e.preventDefault()
      boqRowEditorRefs
        .at(rowIndex + 1)
        ?.description.current?.commands.selectAll()
    }
  }
}
