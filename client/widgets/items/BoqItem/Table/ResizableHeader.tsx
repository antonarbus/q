import type { BoqCols } from 'client/shared/types'
import type { ReactNode, RefObject } from 'react'
import { itemsSlice, selectColumnWidth } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { Resizable } from 're-resizable'
import { useSelectorTyped } from 'client/shared/hooks'
import { isOverflown } from 'client/shared/lib/isOverflown'

interface Props {
  index: number
  headerName: keyof BoqCols
  children: ReactNode
  flexGrow?: number
  minWidth: number
  className: string
  headerRef: RefObject<HTMLDivElement>
}

export const ResizableHeader = ({
  index,
  headerName,
  children,
  flexGrow = 1,
  minWidth,
  className,
  headerRef,
}: Props): JSX.Element | null => {
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  const colWidth = useSelectorTyped(selectColumnWidth({ index, headerName }))
  const isColWidthSetManually = colWidth !== undefined

  const makeItemWiderIfHeaderDoesNotFit = (): void => {
    if (!headerRef.current) return
    const isHeaderOverflown = isOverflown({ element: headerRef.current })
    if (isHeaderOverflown) {
      dispatch(itemsSlice.actions.makeItemBitWider({ index }))
    }
  }

  return (
    <Resizable
      className={className}
      enable={{ right: true }}
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
        dispatch(itemsSlice.actions.saveColWidth({ index, width, headerName }))
      }}
      onResize={(event, direction, element, delta): void => {
        const width = element.clientWidth
        dispatch(itemsSlice.actions.saveColWidth({ index, width, headerName }))
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
