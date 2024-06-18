type Props = {
  element: HTMLElement
}

export const fixElementDimensionStyle = ({ element }: Props): void => {
  const width = element.clientWidth
  element.style.maxWidth = width + 'px'
  element.style.minWidth = width + 'px'
  element.style.width = width + 'px'
  const height = element.clientHeight
  element.style.maxHeight = height + 'px'
  element.style.minHeight = height + 'px'
  element.style.height = height + 'px'
}
