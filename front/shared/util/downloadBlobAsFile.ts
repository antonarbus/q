type Props = {
  blob: Blob
  fileName: string
}

export const downloadBlobAsFile = (props: Props): void => {
  const fileUrl = URL.createObjectURL(props.blob)
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = props.fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(fileUrl)
}
