import type { route } from './route'

type SearchParamsInput = {
  shouldSlide?: 'true'
  redirect?: typeof route.save | typeof route.share | typeof route.stripeConnect
  prefilledEmail?: string
  returnUrl?: string
}

type SearchParamsKeys = keyof SearchParamsInput

export const getSearchParam = (key: SearchParamsKeys): string | null =>
  new URLSearchParams(window.location.search).get(key)

export const buildSearchParams = (params: SearchParamsInput): '' | `?${string}` => {
  const searchParams = new URLSearchParams()

  if (params.shouldSlide !== undefined) {
    searchParams.set('shouldSlide', params.shouldSlide)
  }

  if (params.redirect !== undefined) {
    searchParams.set('redirect', params.redirect)
  }

  if (params.prefilledEmail !== undefined) {
    searchParams.set('prefilledEmail', params.prefilledEmail)
  }

  if (params.returnUrl !== undefined) {
    searchParams.set('returnUrl', params.returnUrl)
  }

  const result = searchParams.toString()

  return result ? `?${result}` : ''
}
