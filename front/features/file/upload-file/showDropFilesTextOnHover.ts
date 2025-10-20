import type { ComponentRef, RefObject } from 'react'

type Props = {
  dropFilesTextRef: RefObject<ComponentRef<'div'> | null>
}

export const showDropFilesTextOnMouseEnter = ({
  dropFilesTextRef,
}: Props): void => {
  const textElement = dropFilesTextRef.current

  if (textElement === null) {
    return
  }

  textElement.style.opacity = '1'
  textElement.style.pointerEvents = 'auto'
}

export const showDropFilesTextOnMouseLeave = ({
  dropFilesTextRef,
}: Props): void => {
  const textElement = dropFilesTextRef.current

  if (textElement === null) {
    return
  }

  textElement.style.opacity = '0'
  textElement.style.pointerEvents = 'none'
}
