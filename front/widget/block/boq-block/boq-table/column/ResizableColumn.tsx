import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { selectColumnWidth } from '@entity/quotation/redux/selector/selectColumnWidth'
import {
  onColumnResize,
  onColumnResizeStart,
  onColumnResizeStop,
} from '@feature/blocks/resize/resize-column/onColumnResize'
import { useSelector } from '@shared/lib/redux'
import { Resizable } from 're-resizable'

type Props = {
  children: React.ReactNode
  className: string
  boqColumnKey: BoqColumnKey
  minWidth: number
}

export const ResizableColumn = (props: Props): React.JSX.Element => {
  const block = useBlock()

  const colWidth = useSelector(
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
        },
      }}
      minWidth={props.minWidth}
      onResize={(event, direction, element, delta): void => {
        onColumnResize({
          blockIndex: block.index,
          boqColumnKey: props.boqColumnKey,
          headerColumnElement: element,
        })
      }}
      onResizeStart={(event, direction, element): void => {
        onColumnResizeStart({
          blockIndex: block.index,
          boqColumnKey: props.boqColumnKey,
          headerColumnElement: element,
        })
      }}
      onResizeStop={(event, direction, element): void => {
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
