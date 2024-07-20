type Props = {
  element: HTMLElement
}

export const fixElementDimensionStyle = ({ element }: Props): void => {
  const width = element.clientWidth
  element.style.maxWidth = `${String(width)}px`
  element.style.minWidth = `${String(width)}px`
  element.style.width = `${String(width)}px`
  const height = element.clientHeight
  element.style.maxHeight = `${String(height)}px`
  element.style.minHeight = `${String(height)}px`
  element.style.height = `${String(height)}px`
}
