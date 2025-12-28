type Props = {
  clickedElement: HTMLElement
  thisElement: HTMLElement
}

export const didClickInsideThisElement = (props: Props): boolean => {
  const didClickInside = props.thisElement.contains(props.clickedElement)

  return didClickInside
}
