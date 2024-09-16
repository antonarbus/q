import { useSelectorTyped } from '@lib_instances/store'

export const useIsCopyModalVisible = (): boolean => {
  const isCopyModalVisible = useSelectorTyped((state) => state.copy.isVisible)

  return isCopyModalVisible
}
