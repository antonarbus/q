import type { RowEditorRefs } from '@entities/quotation/types/BlockItem'
import type { KeyboardEvent } from 'react'

type Props = {
  event: KeyboardEvent
  rowEditorRefs: RowEditorRefs
  rowIndex: number
}

export const tabFromPriceCell = (props: Props): void => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    const isLastRow = props.rowEditorRefs.length === props.rowIndex + 1

    if (isLastRow === true) {
      // do nothing
      // just use default tabbing to the next focusable area
    }

    if (isLastRow === false) {
      props.event.preventDefault()

      props.rowEditorRefs
        .at(props.rowIndex + 1)
        ?.description.current?.commands.selectAll()
    }
  }
}
