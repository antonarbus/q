import { localStorageKey } from '@shared/consts/localStorageKey'
import { isSavedSignal } from '../signals/isSavedSignal'

export const saveIsSavedLocally = (): void => {
  localStorage.setItem(localStorageKey.isSaved, JSON.stringify(isSavedSignal.value))
}
