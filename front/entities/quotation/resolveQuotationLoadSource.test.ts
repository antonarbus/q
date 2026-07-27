import type { Quotation } from '@back/entity/quotation/schema'
import type {
  buildQuotationLoadingText,
  resolveQuotationLoadSourceForBack,
  resolveQuotationLoadSourceFromUrl,
} from './resolveQuotationLoadSource'
import { describe, expect, it, vi } from 'vitest'

type ResolverModule = {
  resolveQuotationLoadSourceFromUrl: typeof resolveQuotationLoadSourceFromUrl
  resolveQuotationLoadSourceForBack: typeof resolveQuotationLoadSourceForBack
  buildQuotationLoadingText: typeof buildQuotationLoadingText
}

vi.mock(import('./storage/draftQuotationStorage'), () => ({
  draftQuotationStorage: {
    load: vi.fn<() => Quotation | null>(() => null),
    save: vi.fn<(quotation: Quotation) => void>(() => undefined),
    clear: vi.fn<() => void>(() => undefined),
  },
}))

vi.mock(import('./backQuotationId'), () => ({
  getBackQuotationId: vi.fn<() => string | null>(() => null),
  setBackQuotationId: vi.fn<(id: string) => void>(() => undefined),
  clearBackQuotationId: vi.fn<() => void>(() => undefined),
}))

// intentional: only `id` is needed by the resolver under test
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const mockDraft = (id: string): Quotation => ({ id }) as unknown as Quotation

const freshModule = (): Promise<ResolverModule> => {
  vi.resetModules()
  return import('./resolveQuotationLoadSource')
}

describe('#resolveQuotationLoadSourceFromUrl', () => {
  it('resolves to template with no draft when the URL has no quotationId (first call)', async () => {
    const { resolveQuotationLoadSourceFromUrl } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(null)

    const result = resolveQuotationLoadSourceFromUrl({ urlQuotationId: undefined })

    expect(result).toStrictEqual({ source: 'template', isModifiedDraft: false })
  }, 1000)

  it("resolves to template with isModifiedDraft when a draft with id 'new' exists", async () => {
    const { resolveQuotationLoadSourceFromUrl } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(mockDraft('new'))

    const result = resolveQuotationLoadSourceFromUrl({ urlQuotationId: undefined })

    expect(result).toStrictEqual({ source: 'template', isModifiedDraft: true })
  }, 1000)

  it("resolves to template WITHOUT isModifiedDraft when a stray draft exists whose id isn't 'new'", async () => {
    const { resolveQuotationLoadSourceFromUrl } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(mockDraft('some-other-id'))

    const result = resolveQuotationLoadSourceFromUrl({ urlQuotationId: undefined })

    expect(result).toStrictEqual({ source: 'template', isModifiedDraft: false })
  }, 1000)

  it('resolves to memory on the first call when the stored draft id matches the URL quotationId', async () => {
    const { resolveQuotationLoadSourceFromUrl } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(mockDraft('abc123'))

    const result = resolveQuotationLoadSourceFromUrl({ urlQuotationId: 'abc123' })

    expect(result).toStrictEqual({ source: 'memory', isModifiedDraft: true })
  }, 1000)

  it('resolves to server on the first call when the stored draft id does not match the URL quotationId', async () => {
    const { resolveQuotationLoadSourceFromUrl } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(mockDraft('different-id'))

    const result = resolveQuotationLoadSourceFromUrl({ urlQuotationId: 'abc123' })

    expect(result).toStrictEqual({ source: 'server', isModifiedDraft: false })
  }, 1000)

  it('resolves to server on the first call when there is no stored draft at all', async () => {
    const { resolveQuotationLoadSourceFromUrl } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(null)

    const result = resolveQuotationLoadSourceFromUrl({ urlQuotationId: 'abc123' })

    expect(result).toStrictEqual({ source: 'server', isModifiedDraft: false })
  }, 1000)

  it('resolves to server on subsequent calls even if the draft id matches — the memory shortcut only applies once, on first mount', async () => {
    const { resolveQuotationLoadSourceFromUrl } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(mockDraft('abc123'))

    resolveQuotationLoadSourceFromUrl({ urlQuotationId: 'abc123' })
    const secondResult = resolveQuotationLoadSourceFromUrl({ urlQuotationId: 'abc123' })

    expect(secondResult).toStrictEqual({ source: 'server', isModifiedDraft: false })
  }, 1000)
})

describe('#resolveQuotationLoadSourceForBack', () => {
  it('resolves to memory with the draft id as the navigation target when a draft is stored', async () => {
    const { resolveQuotationLoadSourceForBack } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(mockDraft('draft-id'))

    const result = resolveQuotationLoadSourceForBack()

    expect(result).toStrictEqual({
      source: 'memory',
      isModifiedDraft: true,
      targetQuotationId: 'draft-id',
    })
  }, 1000)

  it("resolves to memory with a null navigation target when the draft's id is 'new'", async () => {
    const { resolveQuotationLoadSourceForBack } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(mockDraft('new'))

    const result = resolveQuotationLoadSourceForBack()

    expect(result).toStrictEqual({
      source: 'memory',
      isModifiedDraft: true,
      targetQuotationId: null,
    })
  }, 1000)

  it('falls back to the stored back-quotation id and resolves to server when there is no draft', async () => {
    const { resolveQuotationLoadSourceForBack } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    const { getBackQuotationId } = await import('./backQuotationId')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(null)
    vi.mocked(getBackQuotationId).mockReturnValue('back-id')

    const result = resolveQuotationLoadSourceForBack()

    expect(result).toStrictEqual({
      source: 'server',
      isModifiedDraft: false,
      targetQuotationId: 'back-id',
    })
  }, 1000)

  it('resolves to template when there is no draft and no usable back id', async () => {
    const { resolveQuotationLoadSourceForBack } = await freshModule()
    const { draftQuotationStorage } = await import('./storage/draftQuotationStorage')
    const { getBackQuotationId } = await import('./backQuotationId')
    vi.mocked(draftQuotationStorage.load).mockReturnValue(null)
    vi.mocked(getBackQuotationId).mockReturnValue(null)

    const result = resolveQuotationLoadSourceForBack()

    expect(result).toStrictEqual({
      source: 'template',
      isModifiedDraft: false,
      targetQuotationId: null,
    })
  }, 1000)
})

describe('#buildQuotationLoadingText', () => {
  it('describes a fresh template', async () => {
    const { buildQuotationLoadingText } = await freshModule()

    expect(
      buildQuotationLoadingText({
        source: 'template',
        isModifiedDraft: false,
        quotationId: undefined,
      }),
    ).toBe('Loading template...')
  }, 1000)

  it('describes a restored draft template', async () => {
    const { buildQuotationLoadingText } = await freshModule()

    expect(
      buildQuotationLoadingText({
        source: 'template',
        isModifiedDraft: true,
        quotationId: undefined,
      }),
    ).toBe('Loading draft...')
  }, 1000)

  it('describes a modified quotation loaded from memory', async () => {
    const { buildQuotationLoadingText } = await freshModule()

    expect(
      buildQuotationLoadingText({ source: 'memory', isModifiedDraft: true, quotationId: 'abc123' }),
    ).toBe('Loading modified abc123...')
  }, 1000)

  it('describes a server load', async () => {
    const { buildQuotationLoadingText } = await freshModule()

    expect(
      buildQuotationLoadingText({
        source: 'server',
        isModifiedDraft: false,
        quotationId: 'abc123',
      }),
    ).toBe('Loading abc123...')
  }, 1000)
})
