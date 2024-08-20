import { useSelectorTyped } from '@lib_instances/store'
import { Resizable } from 're-resizable'
import {
  onColumnResize,
  onColumnResizeStart,
  onColumnResizeStop,
} from '@features/blocks/resize'
import { selectColumnWidth, type ColumnKey } from '@entities/quotation'

type Props = {
  children: React.ReactNode
  className: string
  flexGrow?: number
  boqColumnKey: ColumnKey
  minWidth: number
}

export const ResizableColumn = ({
  children,
  className,
  flexGrow,
  boqColumnKey,
  minWidth,
}: Props): JSX.Element => {
  const colWidth = useSelectorTyped(
    selectColumnWidth({ blockIndex: 0, boqColumnKey }),
  )

  return (
    <Resizable
      className={className}
      enable={{
        right: true,
      }}
      minWidth={minWidth}
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
      css={{
        flexShrink: '1 !important',
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
      onResizeStart={(event, direction, element): void => {
        onColumnResizeStart({
          headerColumnElement: element,
          blockIndex: 0,
          boqColumnKey,
        })
      }}
      onResize={(event, direction, element, delta): void => {
        onColumnResize({
          headerColumnElement: element,
          blockIndex: 0,
          boqColumnKey,
        })
      }}
      onResizeStop={(event, direction, element): void => {
        onColumnResizeStop({
          headerColumnElement: element,
          blockIndex: 0,
          boqColumnKey,
        })
      }}
    >
      {children}
    </Resizable>
  )
}
