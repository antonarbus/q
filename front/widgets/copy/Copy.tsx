import { CopyModal } from './CopyModal'
import { reduxHolder } from '@front/shared/lib/redux'

export const Copy = (): React.JSX.Element | null => {
  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)

  if (isCopyModalVisible === false) {
    return null
  }

  return <CopyModal />
}
