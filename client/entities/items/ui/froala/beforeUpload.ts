import { getState } from '@lib_instances/store'
import { quotationSignal } from '@entities/quotation'
import { getFileSizeInMbAsText } from '@shared/lib'

export const beforeUpload = (files: File[]): boolean => {
  if (!quotationSignal.value.id) {
    alert('No quotation id, something is wrong')
    return false
  }

  if (!getState().user.email) {
    alert('Not logged in')
    return false
  }

  const upload = confirm(`
    File will be uploaded into your profile.
    File size: ${getFileSizeInMbAsText({ file: files['0'] })}
  `)
  if (!upload) {
    const progressBarElement = document.querySelector('.fr-file-progress-bar-layer.fr-layer.fr-active')
    if (!(progressBarElement instanceof HTMLElement)) return false
    progressBarElement.classList.remove('fr-active')
  }
  return false
}
