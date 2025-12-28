type Props = {
  element: HTMLElement
}

export const fixElementDimensionStyle = (props: Props): void => {
  const width = props.element.clientWidth
  props.element.style.maxWidth = `${String(width)}px`
  props.element.style.minWidth = `${String(width)}px`
  props.element.style.width = `${String(width)}px`
  const height = props.element.clientHeight
  props.element.style.maxHeight = `${String(height)}px`
  props.element.style.minHeight = `${String(height)}px`
  props.element.style.height = `${String(height)}px`
}
