import { getState } from '@lib_instances/store'
import { quotationSignal } from '@entities/quotation'
import { getFileSizeInMbAsText } from '@shared/utils'

export const beforeUpload = (files: File[]): boolean => {
  if (!quotationSignal.value.id || quotationSignal.value.id === 'local version') {
    alert('No quotation id, something is wrong')
    removeLoadingBar()
    return false
  }

  if (!getState().user.email) {
    alert('You are not logged in, file will be saved in browser until page refresh.')
    removeLoadingBar()
    return false
  }

  const upload = confirm(`
    File will be uploaded into your profile.
    File size: ${getFileSizeInMbAsText({ file: files['0'] })}
  `)

  if (!upload) {
    removeLoadingBar()
    return false
  }

  return true
}

function removeLoadingBar(): void {
  const progressBarElement = document.querySelector('.fr-popup.fr-desktop.fr-inline.fr-active')
  if (!(progressBarElement instanceof HTMLElement)) return
  progressBarElement.classList.remove('fr-active')
}
