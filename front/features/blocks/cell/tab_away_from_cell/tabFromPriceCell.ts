import type { RowEditorRefs } from '@entities/quotation'

type Props = {
  e: React.KeyboardEvent
  boqRowEditorRefs: RowEditorRefs
  rowIndex: number
}

export const tabFromPriceCell = (props: Props): void => {
  const isTabKey = props.e.key === 'Tab'

  if (isTabKey === true) {
    const isLastRow = props.boqRowEditorRefs.length === props.rowIndex + 1

    if (isLastRow === true) {
      // do nothing
      // just use default tabbing to the next focusable area
    }

    if (isLastRow === false) {
      props.e.preventDefault()

      props.boqRowEditorRefs
        .at(props.rowIndex + 1)
        ?.description.current?.commands.selectAll()
    }
  }
}
