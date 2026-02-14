import { useIsCopyModalVisible } from '@entity/copy/useIsCopyModalVisible'
import { CopyModal } from './CopyModal'

export const Copy = (): React.JSX.Element | null => {
  const isCopyModalVisible = useIsCopyModalVisible()

  if (isCopyModalVisible === false) {
    return null
  }

  return <CopyModal />
}
