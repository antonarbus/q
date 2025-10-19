import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
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
}: Props): JSX.Element => {
  const block = useBlock()

  const colWidth = useSelector(
    selectColumnWidth({ blockIndex: block.index, boqColumnKey }),
  )

  return (
    <Resizable
      className={className}
      css={{
        flexShrink: '1 !important',
      }}
      enable={{
        right: true,
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
      minWidth={minWidth}
      onResize={(event, direction, element, delta): void => {
        onColumnResize({
          blockIndex: block.index,
          boqColumnKey,
          headerColumnElement: element,
        })
      }}
      onResizeStart={(event, direction, element): void => {
        onColumnResizeStart({
          blockIndex: block.index,
          boqColumnKey,
          headerColumnElement: element,
        })
      }}
      onResizeStop={(event, direction, element): void => {
        onColumnResizeStop({
          blockIndex: block.index,
          boqColumnKey,
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
      {children}
    </Resizable>
  )
}
