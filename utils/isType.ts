export const isBoolean = (value: any) => typeof value === 'boolean'
export const isUndefined = (value: any) => typeof value === 'undefined'
export const isString = (value: any) => typeof value === 'string'
export const isNumber = (value: any) => typeof value === 'number'
export const isDateString = (value: any) =>
  isNaN(value) && !isNaN(Date.parse(value))
export const isArray = (value: any) => Array.isArray(value)
export const isObject = (value: any) =>
  value !== null && value?.constructor?.name === 'Object'
export const hasProperty = (object: object, property: string) =>
  object && property in object
