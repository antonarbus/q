import { describe, expect, it } from 'vitest'
import { getStringWithNewFormattedNumber } from './getStringWithNewFormattedNumber'

describe('#getStringWithNewFormattedNumber', () => {
  it('replaces simple number in HTML', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>140 <span>USD</span></p>',
      newNumber: 1230,
    })

    expect(result).toBe('<p>1\u202F230 <span>USD</span></p>')
  }, 1000)

  it('replaces decimal number with comma', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>123,45 EUR</p>',
      newNumber: 678.9,
    })

    expect(result).toBe('<p>678,9 EUR</p>')
  }, 1000)

  it('replaces decimal number with period', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>123.45 USD</p>',
      newNumber: 678.9,
    })

    expect(result).toBe('<p>678,9 USD</p>')
  }, 1000)

  it('handles number with spaces between digits', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>1 230 <span>USD</span></p>',
      newNumber: 5000,
    })

    expect(result).toBe('<p>5\u202F000 <span>USD</span></p>')
  }, 1000)

  it('replaces only first number', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>100 items cost 200 USD</p>',
      newNumber: 999,
    })

    expect(result).toBe('<p>999 items cost 200 USD</p>')
  }, 1000)

  it('handles integer replacement', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p style="text-align: center;">500</p>',
      newNumber: 1500,
    })

    expect(result).toBe('<p style="text-align: center;">1\u202F500</p>')
  }, 1000)

  it('formats large numbers with spaces', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<div>1000000</div>',
      newNumber: 1_000_000,
    })

    expect(result).toBe('<div>1\u202F000\u202F000</div>')
  }, 1000)

  it('handles decimal formatting', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>100</p>',
      newNumber: 123.456_789,
    })

    expect(result).toBe('<p>123,456789</p>')
  }, 1000)

  it('replaces number regardless of stored value mismatch', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>140 <span>USD</span></p>',
      newNumber: 1230,
    })

    expect(result).toBe('<p>1\u202F230 <span>USD</span></p>')
  }, 1000)

  it('handles zero', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>500</p>',
      newNumber: 0,
    })

    expect(result).toBe('<p>0</p>')
  }, 1000)

  it('accepts string number as input', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<p>100</p>',
      newNumber: '250',
    })

    expect(result).toBe('<p>250</p>')
  }, 1000)

  it('handles complex HTML structure', () => {
    const result = getStringWithNewFormattedNumber({
      string: '<div class="price"><strong>99.99</strong> <span class="currency">EUR</span></div>',
      newNumber: 150.5,
    })

    expect(result).toBe(
      '<div class="price"><strong>150,5</strong> <span class="currency">EUR</span></div>',
    )
  }, 1000)
})
