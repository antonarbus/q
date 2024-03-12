export const isBoolean = (value: unknown): boolean => typeof value === 'boolean'
export const isUndefined = (value: unknown): boolean => typeof value === 'undefined'
export const isString = (value: unknown): boolean => typeof value === 'string'
export const isNumber = (value: unknown): boolean => typeof value === 'number'
export const isDateString = (value: unknown): boolean => {
  if (typeof value !== 'string') return false
  return !isNaN(Date.parse(value))
}
export const isArray = (value: unknown): boolean => Array.isArray(value)
export const isObject = (value: unknown): boolean => {
  if (typeof value !== 'object') return false
  return value !== null && value.constructor.name === 'Object'
}
export const hasProperty = (object: unknown, property: string): boolean => {
  if (typeof object !== 'object') return false
  if (object === null) return false
  return property in object
}
