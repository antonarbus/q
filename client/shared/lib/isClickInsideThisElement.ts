interface IProps {
  clickedElement: HTMLElement
  thisElement: HTMLElement
}

export const didClickInsideThisElement = ({
  clickedElement,
  thisElement,
}: IProps): boolean => {
  return thisElement.contains(clickedElement)
}

