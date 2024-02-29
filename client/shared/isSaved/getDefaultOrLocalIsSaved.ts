import { localStorageKey } from '@shared/consts/localStorageKey'
import { jsonParseSafe } from '@shared/lib/jsonParseSafe'

export const getDefaultOrLocalIsSaved = (): boolean => {
  const isSavedFromLocalStorage = localStorage.getItem(localStorageKey.isSaved)

  if (isSavedFromLocalStorage === null) {
    localStorage.setItem(localStorageKey.isSaved, JSON.stringify(true))
    return true
  }

  const isSaved = jsonParseSafe<boolean>(isSavedFromLocalStorage)

  if (isSaved === undefined) {
    localStorage.setItem(localStorageKey.isSaved, JSON.stringify(true))
    return true
  }

  return isSaved
}
