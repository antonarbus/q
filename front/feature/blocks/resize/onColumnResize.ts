import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { getBoqColumnFromStore } from '@entity/quotation/redux/getter/getBoqColumnFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { cls } from '@shared/cls'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { dispatch } from '@shared/lib/redux'
import { lockScrollOnce } from '@shared/lib/lockScrollOnce'

type Props = {
  headerColumnElement: HTMLElement
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const onColumnResizeStart = (props: Props): void => {
  const width = props.headerColumnElement.clientWidth

  lockScrollOnce()

  dispatch(textSlice.actions.setNotEditable())

  dispatch(
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  dispatch(
    quotationSlice.actions.hideBoqItemPins({
      blockIndex: props.blockIndex,
    }),
  )
}

export const onColumnResize = (props: Props): void => {
  const width = props.headerColumnElement.clientWidth

  const column = getBoqColumnFromStore({
    blockIndex: props.blockIndex,
    boqColumnKey: props.boqColumnKey,
  })

  if (column === undefined) {
    return
  }

  const didWidthChange = column.width !== width

  if (didWidthChange === false) {
    return
  }

  dispatch(
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width,
      boqColumnKey: props.boqColumnKey,
    }),
  )
}

export const onColumnResizeStop = (props: Props): void => {
  const columnWidth = props.headerColumnElement.clientWidth

  lockScrollOnce()

  dispatch(
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width: columnWidth,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  const itemWidth = props.headerColumnElement.closest(
    `.${cls.paper}`,
  )?.clientWidth

  dispatch(
    quotationSlice.actions.updateBlockWidth({
      blockIndex: props.blockIndex,
      width: itemWidth ?? 0,
    }),
  )

  dispatch(textSlice.actions.setEditable())
}
