/**
    * returns true if clicked inside thisElement and vice-versa
    * @param clickedElement e.target
    * @param thisElement element we check to be clicked within
    */
export function isClickInsideThisElement(clickedElement: HTMLElement, thisElement: HTMLElement) {
  return thisElement.contains(clickedElement)
}
