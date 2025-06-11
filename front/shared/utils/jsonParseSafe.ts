export const jsonParseSafe = <T>(str: unknown): T | undefined => {
  try {
    if (typeof str !== 'string') {
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const parsedJson = JSON.parse(str) as T

    return parsedJson
  } catch {
    return undefined
  }
}
