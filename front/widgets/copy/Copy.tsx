import { CopyModal } from './CopyModal'
import { useIsCopyModalVisible } from '@entities/copy'
import type { JSX } from 'react'

export const Copy = (): JSX.Element | null => {
  const isCopyModalVisible = useIsCopyModalVisible()

  if (isCopyModalVisible === false) {
    return null
  }

  return <CopyModal />
}
