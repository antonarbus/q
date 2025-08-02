import type { ColDef, SuppressKeyboardEventParams } from 'ag-grid-community'

type Props<Item extends Record<string, unknown>> = ColDef<Item> & {
  openItem?: (event: SuppressKeyboardEventParams<Item>) => void
}

/**
 * Basic column settings.
 */
export const getSharedColDef = <Item extends Record<string, unknown>>(
  props: Props<Item> = {},
): ColDef<Item> => {
  return {
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    unSortIcon: true,
    sortable: true,
    resizable: true,
    cellClass: 'cursor-pointer',
    flex: 1,
    minWidth: 180,
    suppressKeyboardEvent: (
      params: SuppressKeyboardEventParams<Item>,
    ): boolean => {
      const suppressEvent = true
      const isEnterKey = params.event.key === 'Enter'

      if (isEnterKey) {
        props.openItem?.(params)
        return suppressEvent
      }

      return !suppressEvent
    },
    ...props,
  }
}
