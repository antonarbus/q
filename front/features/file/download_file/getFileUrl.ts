type Props = {
  fileId: string
}

export const getFileUrl = ({ fileId }: Props): string => {
  const fileUrl = `https://storage.googleapis.com/quotation-app-bucket/files/${fileId}`

  return fileUrl
}
