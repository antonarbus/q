type Props = {
  fileName: string
}

export const getFileUrl = ({ fileName }: Props): string => {
  const fileUrl = `https://storage.googleapis.com/quotation-app-bucket/files/${fileName}`

  return fileUrl
}
