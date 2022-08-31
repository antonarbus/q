import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const businessHours = [9, 17]

const purchase = () => {
  const currentHour = new Date().getHours()
  const [open, close] = businessHours

  if (currentHour > open && currentHour < close) return { message: 'Success' }
  return { message: 'Error' }
}

describe('purchasing flow', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows purchases within business hours', () => {
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)
    expect(purchase()).toEqual({ message: 'Success' })
  })

  it('disallows purchases outside of business hours', () => {
    const date = new Date(2000, 1, 1, 19)
    vi.setSystemTime(date)
    expect(purchase()).toEqual({ message: 'Error' })
  })
})
