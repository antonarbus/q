/**
 * Check if element is overflown, meaning content is taller or wider than its container and there is a scrollbar or content is trimmed by a container without a scrollbar
 * @descriptions
 * - following properties are used in function
 * - .clientHeight & .clientWidth returns width/height of the content including paddings w/o scrollbar
 * - .scrollHeight & .scrollWidth returns full inner width/height of the content area including the scrolled out parts
 * @returns {boolean} true or false
 */

interface IProps {
  element: HTMLElement
}

export const isOverflown = ({ element }: IProps): boolean => {
  const overflown =
    (element.scrollHeight > element.clientHeight) ||
    (element.scrollWidth > element.clientWidth)
  return overflown
}
