import { useSelectorTyped } from '@lib_instances/store'

export const useIsCopyContainer = (): boolean => {
  const isCopyContainer = useSelectorTyped(
    (state) => state.copy.isCopyContainer,
  )

  return isCopyContainer
}
