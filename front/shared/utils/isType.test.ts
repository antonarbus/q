import { expect, test } from 'vitest'
import { isBoolean, isUndefined, isString, isNumber } from './isType'

test('#isBoolean', () => {
  expect(isBoolean(true)).toBe(true)
  expect(isBoolean(false)).toBe(true)
  expect(isBoolean('true')).toBe(false)
  expect(isBoolean(5)).toBe(false)
})

test('#isUndefined', () => {
  expect(isUndefined(undefined)).toBe(true)
  expect(isUndefined(null)).toBe(false)
  expect(isUndefined('null')).toBe(false)
  expect(isUndefined(5)).toBe(false)
  expect(isUndefined(true)).toBe(false)
})

test('#isString', () => {
  expect(isString('string')).toBe(true)
  expect(isString(undefined)).toBe(false)
  expect(isString(null)).toBe(false)
  expect(isString(5)).toBe(false)
  expect(isString(true)).toBe(false)
})

test('#isNumber', () => {
  expect(isNumber(5)).toBe(true)
  expect(isNumber('5')).toBe(false)
  expect(isNumber(undefined)).toBe(false)
  expect(isNumber(null)).toBe(false)
  expect(isNumber(true)).toBe(false)
})
