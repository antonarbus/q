type Props = {
  dropFilesTextRef: React.RefObject<HTMLDivElement>
}

export const showDropFilesTextOnMouseEnter = ({
  dropFilesTextRef,
}: Props): void => {
  const textElement = dropFilesTextRef.current
  if (!textElement) return
  textElement.style.visibility = 'visible'
  textElement.style.opacity = '1'
}

export const showDropFilesTextOnMouseLeave = ({
  dropFilesTextRef,
}: Props): void => {
  const textElement = dropFilesTextRef.current
  if (!textElement) return
  textElement.style.visibility = 'hidden'
  textElement.style.opacity = '0'
}
