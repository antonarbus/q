import { expect, test } from 'vitest'
import { getStringWithNewFormattedNumber } from './getStringWithNewFormattedNumber'

test('#getStringWithNewFormattedNumber - replaces simple number in HTML', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>140 <span>USD</span></p>',
    newNumber: 1230,
  })

  expect(result).toBe('<p>1\u202f230 <span>USD</span></p>')
})

test('#getStringWithNewFormattedNumber - replaces decimal number with comma', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>123,45 EUR</p>',
    newNumber: 678.9,
  })

  expect(result).toBe('<p>678,9 EUR</p>')
})

test('#getStringWithNewFormattedNumber - replaces decimal number with period', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>123.45 USD</p>',
    newNumber: 678.9,
  })

  expect(result).toBe('<p>678,9 USD</p>')
})

test('#getStringWithNewFormattedNumber - handles number with spaces between digits', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>1 230 <span>USD</span></p>',
    newNumber: 5000,
  })

  expect(result).toBe('<p>5\u202f000 <span>USD</span></p>')
})

test('#getStringWithNewFormattedNumber - replaces only first number', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>100 items cost 200 USD</p>',
    newNumber: 999,
  })

  expect(result).toBe('<p>999 items cost 200 USD</p>')
})

test('#getStringWithNewFormattedNumber - handles integer replacement', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p style="text-align: center;">500</p>',
    newNumber: 1500,
  })

  expect(result).toBe('<p style="text-align: center;">1\u202f500</p>')
})

test('#getStringWithNewFormattedNumber - formats large numbers with spaces', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<div>1000000</div>',
    newNumber: 1000000,
  })

  expect(result).toBe('<div>1\u202f000\u202f000</div>')
})

test('#getStringWithNewFormattedNumber - handles decimal formatting', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>100</p>',
    newNumber: 123.456789,
  })

  expect(result).toBe('<p>123,456789</p>')
})

test('#getStringWithNewFormattedNumber - replaces number regardless of stored value mismatch', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>140 <span>USD</span></p>',
    newNumber: 1230,
  })

  expect(result).toBe('<p>1\u202f230 <span>USD</span></p>')
})

test('#getStringWithNewFormattedNumber - handles zero', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>500</p>',
    newNumber: 0,
  })

  expect(result).toBe('<p>0</p>')
})

test('#getStringWithNewFormattedNumber - accepts string number as input', () => {
  const result = getStringWithNewFormattedNumber({
    string: '<p>100</p>',
    newNumber: '250',
  })

  expect(result).toBe('<p>250</p>')
})

test('#getStringWithNewFormattedNumber - handles complex HTML structure', () => {
  const result = getStringWithNewFormattedNumber({
    string:
      '<div class="price"><strong>99.99</strong> <span class="currency">EUR</span></div>',
    newNumber: 150.5,
  })

  expect(result).toBe(
    '<div class="price"><strong>150,5</strong> <span class="currency">EUR</span></div>',
  )
})
