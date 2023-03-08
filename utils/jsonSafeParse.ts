export function jsonSafeParse(str: any) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return undefined
  }
}
