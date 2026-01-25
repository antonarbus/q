import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useSelector } from '@shared/lib/redux'

export const useIsEditorActive = (): boolean => {
  const block = useBlock()

  const isBlockFroala = useSelector(
    (state) => state.quotation.blocks[block.index]?.isFroala ?? true,
  )

  const isEditable = useSelector((state) => state.text.isEditable)

  const isEditorActive = isEditable && isBlockFroala

  return isEditorActive
}
