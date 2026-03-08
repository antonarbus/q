import { useSelector } from '@shared/lib/redux'

// todo: remove
export const useIsCopyModalVisible = (): boolean => {
  const isCopyModalVisible = useSelector((state) => state.copy.isVisible)

  return isCopyModalVisible
}
