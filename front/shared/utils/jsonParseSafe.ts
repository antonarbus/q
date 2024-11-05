export const jsonParseSafe = <T>(str: unknown): T | undefined => {
  try {
    if (typeof str !== 'string') return undefined
    const parsedJson = JSON.parse(str) as T

    return parsedJson
  } catch {
    return undefined
  }
}
