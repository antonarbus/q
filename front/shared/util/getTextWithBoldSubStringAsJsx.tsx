import type { ReactNode } from 'react'

type Props = {
  text: string
  subString: string
}

export const getTextWithBoldSubStringAsJsx = (props: Props): ReactNode => {
  if (props.subString.length === 0) {
    return props.text
  }

  const matchAllOccurrencesRegExp = new RegExp(`(${props.subString})`, 'giu')
  const parts = props.text.split(matchAllOccurrencesRegExp)

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === props.subString.toLowerCase()

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
