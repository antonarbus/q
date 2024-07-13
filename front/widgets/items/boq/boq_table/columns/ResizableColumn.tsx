import { useSelectorTyped } from '@lib_instances/store'
import { Resizable } from 're-resizable'
import type { ReactNode } from 'react'
import {
  onColumnResize,
  onColumnResizeStart,
  onColumnResizeStop,
} from '@features/items/resize'
import {
  selectColumnWidth,
  useItem,
  type BoqColumnKey,
} from '@entities/quotation'

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
  const { itemIndex } = useItem()
  const colWidth = useSelectorTyped(
    selectColumnWidth({ itemIndex, boqColumnKey }),
  )
  const isColWidthSetManually = colWidth !== undefined

  return (
    <Resizable
      className={className}
      enable={{
        right: true,
      }}
      minWidth={minWidth}
      size={{
        width: isColWidthSetManually ? colWidth : 'auto',
        height: 'auto',
      }}
      style={{
        display: isColWidthSetManually ? 'block' : 'flex',
        flexGrow: isColWidthSetManually ? 0 : flexGrow,
        width: isColWidthSetManually ? colWidth : 'auto',
        maxWidth: isColWidthSetManually ? colWidth : 'auto',
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
          itemIndex,
          boqColumnKey,
        })
      }}
      onResize={(event, direction, element, delta): void => {
        onColumnResize({
          headerColumnElement: element,
          itemIndex,
          boqColumnKey,
        })
      }}
      onResizeStop={(event, direction, element): void => {
        onColumnResizeStop({
          headerColumnElement: element,
          itemIndex,
          boqColumnKey,
        })
      }}
    >
      {children}
    </Resizable>
  )
}
