import { useTiptap } from '@tiptap/react'
import { TbArrowMerge } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

export const MergeOrSplitCellsButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Merge or split cells'
      onClick={() => {
        editor.chain().focus().mergeOrSplit().run()
      }}
    >
      <TbArrowMerge />
    </MenuButton>
  )
}
