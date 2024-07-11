type Props = {
  text: string
  boldText: string
}

export const getJsxWithBoldSubstr = ({
  text,
  boldText,
}: Props): (string | JSX.Element)[] => {
  const regExp = new RegExp(`(${boldText})`, 'gi')
  return text
    .split(regExp)
    .map((str, index) =>
      regExp.test(str) ? <b key={`char-${index}`}>{str}</b> : str,
    )
}
