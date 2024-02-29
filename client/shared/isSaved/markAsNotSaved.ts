import { localStorageKey } from '@shared/consts/localStorageKey'
import { isSavedSignal } from './isSavedSignal'

export const markAsNotSaved = (): void => {
  isSavedSignal.value = false
  localStorage.setItem(localStorageKey.isSaved, JSON.stringify(false))
}
