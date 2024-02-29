import { localStorageKey } from '@shared/consts/localStorageKey'
import { isSavedSignal } from './isSavedSignal'

export const markAsSaved = (): void => {
  isSavedSignal.value = true
  localStorage.setItem(localStorageKey.isSaved, JSON.stringify(true))
}
