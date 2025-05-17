import { useSelector } from '@shared/lib/redux'
import { Resizable } from 're-resizable'
import {
  onColumnResize,
  onColumnResizeStart,
  onColumnResizeStop,
} from '@features/blocks/resize'
import { selectColumnWidth, useBlock } from '@entities/quotation'
import type { BoqColumnKey } from '@entities/quotation/consts/boqColumnKey'

type Props = {
  children: React.ReactNode
  className: string
  flexGrow?: number
  boqColumnKey: BoqColumnKey
  minWidth: number
}

export const ResizableColumn = ({
  children,
  className,
  flexGrow,
  boqColumnKey,
  minWidth,
}: Props): React.JSX.Element => {
  const { blockIndex } = useBlock()

  const colWidth = useSelector(selectColumnWidth({ blockIndex, boqColumnKey }))

  return (
    <Resizable
      className={className}
      enable={{
        right: true,
      }}
      minWidth={minWidth}
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
      css={{
        flexShrink: '1 !important',
      }}
      handleStyles={{
        right: {
          background: '#ebe9e9',
          borderRadius: '3px',
          right: '-1px',
          width: '3px',
          zIndex: 1,
        },
      }}
      onResizeStart={(event, direction, element): void => {
        onColumnResizeStart({
          blockIndex,
          boqColumnKey,
          headerColumnElement: element,
        })
      }}
      onResize={(event, direction, element, delta): void => {
        onColumnResize({
          blockIndex,
          boqColumnKey,
          headerColumnElement: element,
        })
      }}
      onResizeStop={(event, direction, element): void => {
        onColumnResizeStop({
          blockIndex,
          boqColumnKey,
          headerColumnElement: element,
        })
      }}
    >
      {children}
    </Resizable>
  )
}
