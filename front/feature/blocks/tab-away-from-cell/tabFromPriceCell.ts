import type { RowEditorRefs } from '@entity/quotation/ref/rowEditorRefs'

type Props = {
  event: KeyboardEvent
  rowEditorRefs: RowEditorRefs
  rowIndex: number
}

export const tabFromPriceCell = (props: Props): boolean => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    const isLastRow = props.rowEditorRefs.length === props.rowIndex + 1

    if (isLastRow === true) {
      return false
    }

    if (isLastRow === false) {
      props.event.preventDefault()

      props.rowEditorRefs
        .at(props.rowIndex + 1)
        ?.description.current?.chain()
        .focus()
        .selectAll()
        .run()

      return true
    }

    return false
  }

  return false
}
