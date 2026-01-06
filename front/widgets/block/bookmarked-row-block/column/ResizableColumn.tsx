import type { BoqColumnKey } from '@back/entities/quotation/schemas'
import { selectColumnWidth } from '@entities/quotation/redux/selector/selectColumnWidth'
import {
  onColumnResize,
  onColumnResizeStart,
  onColumnResizeStop,
} from '@features/blocks/resize'
import { useSelector } from '@shared/lib/redux'
import { Resizable } from 're-resizable'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className: string
  boqColumnKey: BoqColumnKey
  minWidth: number
}

export const ResizableColumn = (props: Props): JSX.Element => {
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
          background: '#ebe9e9',
          width: '3px',
          right: '-1px',
          borderRadius: '3px',
          zIndex: 1,
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
