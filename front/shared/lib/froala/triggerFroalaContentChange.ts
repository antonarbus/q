import type { FroalaEditor } from '@shared/types/froala'

type Props = {
  editor: FroalaEditor
}

export const triggerFroalaContentChange = ({ editor }: Props): void => {
  editor.undo.saveStep()
}
