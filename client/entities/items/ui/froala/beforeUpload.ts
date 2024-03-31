import { apiUrl } from '@server/consts/apiUrl'
import { quotationSignal } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types'
import { getFileSizeInMbAsText } from '@shared/utils'

type Props = {
  editor: FroalaEditor
  files: File[]
}

export const beforeUpload = ({ files, editor }: Props): boolean => {
  const id = quotationSignal.peek().id
  const email = quotationSignal.peek().email

  if (id === 'template version') {
    alert('This is not saved template quotation, file will be kept in browser until page is refreshed')
    removeLoadingBar()
    return false
  }

  if (!id) {
    alert('This is not saved quotation, file will be kept in browser until page is refreshed')
    removeLoadingBar()
    return false
  }

  if (!email) {
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

  editor.opts.imageUploadParams = { id, email }
  editor.opts.fileUploadParams = { id, email }
  editor.opts.videoUploadParams = { id, email }
  editor.opts.imageUploadURL = apiUrl.upload
  editor.opts.fileUploadURL = apiUrl.upload
  editor.opts.videoUploadURL = apiUrl.upload

  return true
}

function removeLoadingBar(): void {
  const progressBarElement = document.querySelector('.fr-popup.fr-desktop.fr-inline.fr-active')
  if (!(progressBarElement instanceof HTMLElement)) return
  progressBarElement.classList.remove('fr-active')
}
