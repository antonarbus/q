type Props = {
  text: string
  subString: string
}

export const getTextWithBoldSubStringAsJsx = ({
  text,
  subString,
}: Props): React.ReactNode => {
  if (subString.length === 0) {
    return text
  }

  const matchAllOccurrencesRegExp = new RegExp(`(${subString})`, 'giu')
  const parts = text.split(matchAllOccurrencesRegExp)

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === subString.toLowerCase()

        return (
          <span
            key={`substring-${String(index)}`}
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {isMatch === true ? <b>{part}</b> : part}
          </span>
        )
      })}
    </>
  )
}
