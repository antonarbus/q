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

  textElement.style.visibility = 'visible'
  textElement.style.opacity = '1'
}

export const showDropFilesTextOnMouseLeave = ({
  dropFilesTextRef,
}: Props): void => {
  const textElement = dropFilesTextRef.current

  if (textElement === null) {
    return
  }

  textElement.style.visibility = 'hidden'
  textElement.style.opacity = '0'
}
