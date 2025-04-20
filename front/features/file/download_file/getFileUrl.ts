import type { FileInfo } from '@entities/quotation/types'
import { getState } from '@shared/lib/redux'

type Props = {
  fileName: FileInfo['fileName']
}

export const getFileUrl = ({ fileName }: Props): string => {
  const fileUrl = `https://storage.googleapis.com/quotation-app-bucket/${getState().user.email}/files/${fileName}`

  return fileUrl
}
