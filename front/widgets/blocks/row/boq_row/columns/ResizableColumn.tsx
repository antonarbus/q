import { useSelector } from '@shared/lib/redux'
import { Resizable } from 're-resizable'
import {
  onColumnResize,
  onColumnResizeStart,
  onColumnResizeStop,
} from '@features/blocks/resize'
import { selectColumnWidth } from '@entities/quotation'
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
  const colWidth = useSelector(
    selectColumnWidth({ blockIndex: 0, boqColumnKey }),
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
          width: '3px',
          right: '-1px',
          borderRadius: '3px',
          zIndex: 1,
        },
      }}
      minWidth={minWidth}
      onResize={(event, direction, element, delta): void => {
        onColumnResize({
          headerColumnElement: element,
          blockIndex: 0,
          boqColumnKey,
        })
      }}
      onResizeStart={(event, direction, element): void => {
        onColumnResizeStart({
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
      {children}
    </Resizable>
  )
}
