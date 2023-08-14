interface IProps {
  html: string
  index: number
  rowIndex?: number
}

export type TOnFroalaContentChange = (props: IProps) => void