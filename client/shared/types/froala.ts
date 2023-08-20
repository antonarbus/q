interface Props {
  html: string
  index: number
  rowIndex?: number
}

export type OnFroalaContentChange = (props: Props) => void
