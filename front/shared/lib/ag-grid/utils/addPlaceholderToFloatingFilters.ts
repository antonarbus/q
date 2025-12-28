import type { ComponentRef, RefObject } from 'react'

type Props = {
  gridContainerRef: RefObject<ComponentRef<'div'> | null>
}

export const addPlaceholderToFloatingFilters = (props: Props): void => {
  const agGridContainerElement = props.gridContainerRef.current

  if (agGridContainerElement === null) {
    return
  }

  const floatingFilterInputElements = agGridContainerElement.querySelectorAll(
    '.ag-floating-filter input',
  )

  floatingFilterInputElements.forEach((element) => {
    element.setAttribute('placeholder', 'Search...')
  })
}
