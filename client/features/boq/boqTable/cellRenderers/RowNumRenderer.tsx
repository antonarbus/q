type Props = {
  value: number
}

//! not in use, valueGetter is used instead, may delete
export const RowNumRenderer = ({ value }: Props) => {
  return (
    <span
      css={{
        fontSize: 10,
        color: 'grey'
      }}
    >
      { value }
    </span>
  )
}
