import { CopyModal } from './CopyModal'
import { useIsCopyModalVisible } from '@entities/copy'

export const Copy = (): React.JSX.Element | null => {
  const isCopyModalVisible = useIsCopyModalVisible()

  if (isCopyModalVisible === false) {
    return null
  }

  return <CopyModal />
}
