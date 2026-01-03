export const jsonParseOrNull = <T = unknown>(str: unknown): T | null => {
  try {
    if (typeof str !== 'string') {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const parsedJson: T = JSON.parse(str) as T

    return parsedJson
  } catch {
    return null
  }
}
