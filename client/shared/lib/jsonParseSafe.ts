export const jsonParseSafe = <T>(str: string): T | undefined => {
  try {
    const parsedJson: T = JSON.parse(str) as T
    return parsedJson
  } catch {
    return undefined
  }
}
