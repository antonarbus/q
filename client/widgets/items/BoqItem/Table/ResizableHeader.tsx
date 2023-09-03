import type { BoqCols } from 'client/shared/types'
import type { ReactNode, RefObject } from 'react'
import { itemsSlice, selectColumnWidth } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { Resizable } from 're-resizable'
import { useSelectorTyped } from 'client/shared/hooks'
import { isOverflown } from 'client/shared/lib/isOverflown'

interface Props {
  children: ReactNode
  className: string
  flexGrow?: number
  headerName: keyof BoqCols
  index: number
  minWidth: number
}

export const ResizableHeader = ({
  children,
  className,
  flexGrow,
  headerName,
  index,
  minWidth,
}: Props): JSX.Element | null => {
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  const colWidth = useSelectorTyped(selectColumnWidth({ index, headerName }))
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
        flexShrink: 0,
        width: isColWidthSetManually ? colWidth : 'auto',
        maxWidth: isColWidthSetManually ? colWidth : 'auto',
      }}
      handleStyles={{
        right: {
          background: '#a7a7a7',
          width: '3px',
          right: '0px',
          borderRadius: '3px',
        },
      }}
      onResizeStart={(event, direction, element): void => {
        const width = element.clientWidth
        dispatch(itemsSlice.actions.saveColWidth({ index, width, headerName }))
      }}
      onResize={(event, direction, element, delta): void => {
        const width = element.clientWidth
        dispatch(itemsSlice.actions.saveColWidth({ index, width, headerName }))
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
