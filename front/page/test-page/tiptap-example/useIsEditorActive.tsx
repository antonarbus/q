import { useSelector } from '@shared/lib/redux'

export const useIsEditorActive = (): boolean => {
  const isEditable = useSelector((state) => state.text.isEditable)

  return isEditable
}
