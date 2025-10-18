import type { ReactNode } from 'react'

type Props = {
  text: string
  subString: string
}

export const getTextWithBoldSubStringAsJsx = ({
  text,
  subString,
}: Props): ReactNode => {
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
          <span key={`substring-${String(index)}`}>
            {isMatch === true ? (
              <b style={{ fontWeight: 600 }}>{part}</b>
            ) : (
              part
            )}
          </span>
        )
      })}
    </>
  )
}
