import type { FroalaEditor } from '@shared/type/froala'

type Props = {
  editor: FroalaEditor
}

export const triggerFroalaContentChange = ({ editor }: Props): void => {
  editor.undo.saveStep()
}
