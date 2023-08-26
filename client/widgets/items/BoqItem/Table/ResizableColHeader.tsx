import type { BoqColWidth, BoqCols } from 'client/shared/types'
import type { ReactNode } from 'react'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { Resizable } from 're-resizable'
import { useState } from 'react'

interface Props {
  index: number
  headerName: keyof BoqCols
  children: ReactNode
  flexGrow?: number
  minWidth: number
  className: string
  makeItemWiderIfHeaderDoesNotFit: () => void
}

export const ResizableColHeader = ({
  index,
  headerName,
  children,
  flexGrow = 1,
  minWidth,
  className,
  makeItemWiderIfHeaderDoesNotFit,
}: Props): JSX.Element | null => {
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  const initColWidth = item.boq.column[headerName].width
  const [colWidth, setColWidth] = useState<BoqColWidth>(initColWidth)

  return (
    <Resizable
      className={className}
      enable={{ right: true }}
      minWidth={minWidth}
      size={{
        width: colWidth ?? 'auto',
        height: 'auto',
      }}
      style={{
        display: !colWidth ? 'flex' : 'block',
        flexGrow: !colWidth ? flexGrow : 0,
        flexShrink: 0,
        width: colWidth ?? 'auto',
      }}
      handleStyles={{
        right: {
          background: '#a7a7a7',
          width: '3px',
          right: '-6px',
          borderRadius: '3px',
        },
      }}
      onResizeStart={(event, direction, element): void => {
        const width = element.clientWidth
        setColWidth(width)
      }}
      onResize={(event, direction, element, delta): void => {
        const width = element.clientWidth
        setColWidth(width)
        const isExpanding = delta.width > 0
        if (!isExpanding) return
        makeItemWiderIfHeaderDoesNotFit()
      }}
      onResizeStop={(event, direction, element): void => {
        const width = element.clientWidth
        dispatch(itemsSlice.actions.saveColWidth({ index, width, headerName }))
        saveItemsLocally()
        dispatch(itemsSlice.actions.tellItemSavedLocally({ index }))
      }}
    >
      {children}
    </Resizable>
  )
}
