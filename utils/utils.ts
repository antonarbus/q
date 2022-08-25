export const isBoolean = (param) => typeof param === 'boolean'
export const isUndefined = (param) => typeof param === 'undefined'
export const isString = (param) => typeof param === 'string'
export const isNumber = (param) => typeof param === 'number'
export const isDateString = (param) => isNaN(param) && !isNaN(Date.parse(param))
export const isArray = (param) => Array.isArray(param)
export const isObject = (param) => param !== null && param?.constructor?.name === 'Object'
export const hasProperty = (object, property) => object && property in object
