import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { selectColumnWidth } from '@entity/quotation/redux/selector/selectColumnWidth'
import {
  onColumnResize,
  onColumnResizeStart,
  onColumnResizeStop,
} from '@feature/blocks/resize'
import { useSelector } from '@shared/lib/redux'
import { Resizable } from 're-resizable'

type Props = {
  children: React.ReactNode
  className: string
  boqColumnKey: BoqColumnKey
  minWidth: number
}

export const ResizableColumn = (props: Props): React.JSX.Element => {
  const colWidth = useSelector(
    selectColumnWidth({ blockIndex: 0, boqColumnKey: props.boqColumnKey }),
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
        },
      }}
      minWidth={props.minWidth}
      onResize={(_event, _direction, element, _delta): void => {
        onColumnResize({
          headerColumnElement: element,
          blockIndex: 0,
          boqColumnKey: props.boqColumnKey,
        })
      }}
      onResizeStart={(_event, _direction, element): void => {
        onColumnResizeStart({
          headerColumnElement: element,
          blockIndex: 0,
          boqColumnKey: props.boqColumnKey,
        })
      }}
      onResizeStop={(_event, _direction, element): void => {
        onColumnResizeStop({
          headerColumnElement: element,
          blockIndex: 0,
          boqColumnKey: props.boqColumnKey,
        })
      }}
      size={{
        width: colWidth,
        height: 'auto',
      }}
      style={{
        display: 'block',
        flexGrow: 0,
        width: colWidth,
        maxWidth: colWidth,
      }}
    >
      {props.children}
    </Resizable>
  )
}
