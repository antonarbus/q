import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { selectColumnWidth } from '@front/entities/quotation/redux/selector/selectColumnWidth'
import { useIsFullAppView } from '@front/entities/quotation/util/useIsFullAppView'
import {
  onColumnResize,
  onColumnResizeStart,
  onColumnResizeStop,
} from '@front/features/blocks/resize-column/onColumnResize'
import { reduxHolder } from '@front/shared/lib/redux'
import { Resizable } from 're-resizable'

type Props = {
  children: React.ReactNode
  className: string
  boqColumnKey: BoqColumnKey
  minWidth: number
}

export const ResizableColumn = (props: Props): React.JSX.Element => {
  const isFullAppView = useIsFullAppView()
  const block = useBlock()

  const colWidth = reduxHolder.useSelector(
    selectColumnWidth({
      blockIndex: block.index,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  return (
    <Resizable
      className={props.className}
      css={{
        flexShrink: '1 !important',
      }}
      enable={{
        right: true,
      }}
      handleStyles={{
        right: {
          background: '#d0cfcf',
          borderRadius: '3px',
          right: '0px',
          width: '3px',
          pointerEvents: isFullAppView ? 'auto' : 'none',
          cursor: isFullAppView ? 'col-resize' : 'default',
        },
      }}
      minWidth={props.minWidth}
      onResize={(_event, _direction, element, _delta): void => {
        onColumnResize({
          blockIndex: block.index,
          boqColumnKey: props.boqColumnKey,
          headerColumnElement: element,
        })
      }}
      onResizeStart={(_event, _direction, element): void => {
        onColumnResizeStart({
          blockIndex: block.index,
          boqColumnKey: props.boqColumnKey,
          headerColumnElement: element,
        })
      }}
      onResizeStop={(_event, _direction, element): void => {
        onColumnResizeStop({
          blockIndex: block.index,
          boqColumnKey: props.boqColumnKey,
          headerColumnElement: element,
        })
      }}
      size={{
        height: 'auto',
        width: colWidth,
      }}
      style={{
        display: 'block',
        flexGrow: 0,
        maxWidth: colWidth,
        width: colWidth,
      }}
    >
      {props.children}
    </Resizable>
  )
}
