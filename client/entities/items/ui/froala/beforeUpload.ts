import { getState } from '@lib_instances/store'
import { getFileSizeInMbAsText } from '@shared/utils'

type Props = {
  files: File[]
  uploadParams?: {
    id: string
    email: string
  }
}

export const beforeUpload = ({ files, uploadParams }: Props): boolean => {
  if (!uploadParams?.id || uploadParams?.id === 'local version') {
    alert('No quotation id, file will be kept in browser until page is refreshed')
    removeLoadingBar()
    return false
  }

  if (!getState().user.email) {
    alert('You are not logged in, file will be kept in browser until page is refreshed')
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
