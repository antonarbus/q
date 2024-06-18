import type FroalaEditor from 'froala-editor'

type Props = {
  editor: FroalaEditor
}

export const triggerFroalaContentChange = ({ editor }: Props): void => {
  editor.undo.saveStep()
}
