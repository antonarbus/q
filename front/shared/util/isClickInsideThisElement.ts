type Props = {
  clickedElement: HTMLElement
  thisElement: HTMLElement
}

export const didClickInsideThisElement = ({
  clickedElement,
  thisElement,
}: Props): boolean => {
  const didClickInside = thisElement.contains(clickedElement)

  return didClickInside
}
