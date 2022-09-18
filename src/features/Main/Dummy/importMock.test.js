import { afterEach, beforeEach, beforeAll, describe, expect, it, vi } from 'vitest'

beforeAll(() => {
  vi.resetModules()
})

it('import module', async () => {
  const mod = await import('./someFunc')
  console.log(mod)
  const result = mod.someFunc(1, 2)
  expect(result).toBe(3)
})
