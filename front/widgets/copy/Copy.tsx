import { CopyModal } from './CopyModal'
import { useSelector } from '@front/shared/lib/redux'

export const Copy = (): React.JSX.Element | null => {
  const isCopyModalVisible = useSelector((state) => state.copy.isVisible)

  if (isCopyModalVisible === false) {
    return null
  }

  return <CopyModal />
}
