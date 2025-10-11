import type { FroalaEditor } from '@shared/lib/froala/froala'

type Props = {
  editor: FroalaEditor
}

export const triggerFroalaContentChange = ({ editor }: Props): void => {
  editor.undo.saveStep()
}
