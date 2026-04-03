import { CopyModal } from './CopyModal'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const Copy = (): React.JSX.Element | null => {
  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)

  if (isCopyModalVisible === false) {
    return null
  }

  return <CopyModal />
}
