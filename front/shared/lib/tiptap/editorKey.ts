export const blockEditorKey = (props: {
  blockIndex: number
  editorName: string
}): string => `${props.blockIndex}:${props.editorName}`

export const rowEditorKey = (props: {
  blockIndex: number
  rowIndex: number
  cellKey: string
}): string => `${props.blockIndex}:${props.rowIndex}:${props.cellKey}`
