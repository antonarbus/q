import type { BoqColWidth, BoqCols } from 'client/shared/types'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { Resizable } from 're-resizable'

interface Props {
  index: number
  headerName: keyof BoqCols
  children: ReactNode
  flexGrow?: number
  minWidth: number
  className: string
  makeItemWiderIfHeaderDoesNotFit: () => void
  descriptionColWidth: BoqColWidth
  setDescriptionColWidth: Dispatch<SetStateAction<BoqColWidth>>
}

export const ResizableColHeader = ({
  index,
  headerName,
  children,
  flexGrow = 1,
  minWidth,
  className,
  makeItemWiderIfHeaderDoesNotFit,
  descriptionColWidth,
  setDescriptionColWidth,
}: Props): JSX.Element | null => {
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Resizable
      className={className}
      enable={{ right: true }}
      minWidth={minWidth}
      size={{
        width: descriptionColWidth ?? 'auto',
        height: 'auto',
      }}
      style={{
        display: !descriptionColWidth ? 'flex' : 'block',
        flexGrow: !descriptionColWidth ? flexGrow : 0,
        flexShrink: 0,
        width: descriptionColWidth ?? 'auto',
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
        // dispatch(itemsSlice.actions.saveColWidth({ index, width, headerName }))
        setDescriptionColWidth(width)
      }}
      onResize={(event, direction, element, delta): void => {
        const width = element.clientWidth
        // dispatch(itemsSlice.actions.saveColWidth({ index, width, headerName }))
        setDescriptionColWidth(width)
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
