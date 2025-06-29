type Props = {
  blob: Blob
  fileName: string
}

export const downloadBlobAsFile = ({ blob, fileName }: Props): void => {
  const fileUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(fileUrl)
}
