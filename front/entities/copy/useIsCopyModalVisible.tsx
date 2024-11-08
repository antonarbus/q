import { useSelector } from '@shared/lib/redux'

export const useIsCopyModalVisible = (): boolean => {
  const isCopyModalVisible = useSelector((state) => state.copy.isVisible)

  return isCopyModalVisible
}
