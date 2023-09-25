import type { BoqCols } from 'client/shared/types'
import type { ReactNode } from 'react'
import { itemsSlice, selectColumnWidth } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { Resizable } from 're-resizable'
import { useSelectorTyped } from 'client/shared/hooks'

type Props = {
  children: ReactNode
  className: string
  flexGrow?: number
  headerName: keyof BoqCols
  itemIndex: number
  minWidth: number
}

export const ResizableColHeader = ({
  children,
  className,
  flexGrow,
  headerName,
  itemIndex,
  minWidth,
}: Props): JSX.Element => {
  const colWidth = useSelectorTyped(selectColumnWidth({ itemIndex, headerName }))
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
        dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width, headerName }))
      }}
      onResize={(event, direction, element, delta): void => {
        const width = element.clientWidth
        dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width, headerName }))
      }}
      onResizeStop={(event, direction, element): void => {
        const width = element.clientWidth
        dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width, headerName }))
        saveItemsLocally()
        dispatch(itemsSlice.actions.tellItemSavedLocally({ itemIndex }))
      }}
    >
      {children}
    </Resizable>
  )
}
