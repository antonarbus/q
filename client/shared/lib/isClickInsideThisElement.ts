type Props = {
  clickedElement: HTMLElement
  thisElement: HTMLElement
}

export const didClickInsideThisElement = ({ clickedElement, thisElement }: Props): boolean => {
  return thisElement.contains(clickedElement)
}
