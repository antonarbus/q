export const jsonParseOrNull = <ResultType = never>(str: unknown): ResultType | null => {
  try {
    if (typeof str !== 'string') {
      return null
    }

    const parsedJson: ResultType = JSON.parse(str) as ResultType

    return parsedJson
  } catch {
    return null
  }
}
