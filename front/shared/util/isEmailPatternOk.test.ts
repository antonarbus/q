import { expect, test } from 'vitest'
import { isEmailPatternOk } from './isEmailPatternOk'

test('#isEmailPatternOk', () => {
  expect(isEmailPatternOk('anton.arubs@gmail.com')).toBe(true)
  expect(isEmailPatternOk('anton.arubsgmail.com')).toBe(false)
  expect(isEmailPatternOk('anton arubsgmail.com')).toBe(false)
  expect(isEmailPatternOk('anton.arubs@gmail')).toBe(false)
})
