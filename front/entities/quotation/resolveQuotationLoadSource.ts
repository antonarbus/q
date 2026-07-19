import type { QuotationLoadSource } from '@front/shared/appSlice'
import { getBackQuotationId } from './backQuotationId'
import { draftQuotationStorage } from './storage/draftQuotationStorage'

export type QuotationLoadResolution = {
  source: QuotationLoadSource
  isModifiedDraft: boolean
}

// True only until the very first resolution in this browser tab;
// stays false across SPA navigations. Correctness depends on
// this module being consulted from exactly one "first mount" call site — true today
// (LoadQuotation mounts once at the router level).
let isPageLoad = true

type Props = {
  urlQuotationId: string | undefined
}

/**
 * Resolves where to load the quotation from, given the current URL. Used on first mount,
 * and again (once urlQuotationId is fresh) after browser back/forward.
 */
export const resolveQuotationLoadSourceFromUrl = (props: Props): QuotationLoadResolution => {
  const wasPageLoad = isPageLoad
  isPageLoad = false

  if (props.urlQuotationId === undefined) {
    const draft = draftQuotationStorage.load()
    return { source: 'template', isModifiedDraft: draft?.id === 'new' }
  }

  if (wasPageLoad && draftQuotationStorage.load()?.id === props.urlQuotationId) {
    return { source: 'memory', isModifiedDraft: true }
  }

  return { source: 'server', isModifiedDraft: false }
}

/**
 * Resolves where to load the quotation from when the user clicks "Back", plus the
 * quotation id to navigate to (decided the same way regardless of which source it resolves to).
 */
export const resolveQuotationLoadSourceForBack = (): QuotationLoadResolution & {
  targetQuotationId: string | null
} => {
  const draftId = draftQuotationStorage.load()?.id
  const backId = getBackQuotationId()
  const targetId = draftId ?? backId ?? null
  const hasTargetId = targetId !== null && targetId !== '' && targetId !== 'new'
  const targetQuotationId = hasTargetId ? targetId : null

  if (draftId !== undefined) {
    return { source: 'memory', isModifiedDraft: true, targetQuotationId }
  }

  if (hasTargetId) {
    return { source: 'server', isModifiedDraft: false, targetQuotationId }
  }

  return { source: 'template', isModifiedDraft: false, targetQuotationId }
}

export const buildQuotationLoadingText = (params: {
  source: QuotationLoadSource
  isModifiedDraft: boolean
  quotationId: string | undefined
}): string => {
  if (params.source === 'template') {
    return params.isModifiedDraft ? 'Loading draft...' : 'Loading template...'
  }

  if (params.source === 'memory') {
    return `Loading modified ${params.quotationId ?? ''}...`
  }

  return `Loading ${params.quotationId ?? ''}...`
}
