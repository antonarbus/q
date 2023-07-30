// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonSafeParse(str: unknown): any {
  if (typeof str !== 'string') return undefined

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedJson = JSON.parse(str)
    return parsedJson
  } catch (e) {
    return undefined
  }
}
