import type { ComponentRef, RefObject } from 'react'

type Props = {
  dropFilesTextRef: RefObject<ComponentRef<'div'> | null>
}

export const showDropFilesTextOnMouseEnter = (props: Props): void => {
  const textElement = props.dropFilesTextRef.current

  if (textElement === null) {
    return
  }

  textElement.style.opacity = '1'
  textElement.style.pointerEvents = 'auto'
}

export const showDropFilesTextOnMouseLeave = (props: Props): void => {
  const textElement = props.dropFilesTextRef.current

  if (textElement === null) {
    return
  }

  textElement.style.opacity = '0'
  textElement.style.pointerEvents = 'none'
}
