type Props = {
  text: string
  boldText: string
}

export const getJsxWithBoldSubstr = ({
  text,
  boldText,
}: Props): (string | React.JSX.Element)[] => {
  const regExp = new RegExp(`(${boldText})`, 'giu')

  return text
    .split(regExp)
    .map((str, index) =>
      regExp.test(str) ? <b key={`char-${String(index)}`}>{str}</b> : str,
    )
}
