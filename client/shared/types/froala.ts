interface Props {
  html: string
  itemIndex: number
  rowIndex?: number
}

export type OnFroalaContentChange = (props: Props) => void
