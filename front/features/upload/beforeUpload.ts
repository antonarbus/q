import { apiUrl } from '@back/consts/apiUrl'
import { getState } from '@lib_instances/store'
import { removeLoadingBar } from '@shared/lib/froala/removeLoadingBar'
import type { FroalaEditor } from '@shared/types/froala'
import { getFileSizeInMb } from '@shared/utils/getFileSizeInMb'
import { hideDraggableArea } from './showDraggableArea'

type Props = {
  editor: FroalaEditor
  files: File[]
}

export const beforeUpload = ({ files, editor }: Props): boolean => {
  hideDraggableArea()

  const email = getState().user.email

  if (!email) {
    // eslint-disable-next-line no-alert
    alert(
      'You are not logged in, file will be kept in browser until page is refreshed',
    )
    removeLoadingBar()
    return false
  }

  const fileSizeInMb = getFileSizeInMb({ file: files['0'] })

  // eslint-disable-next-line no-alert
  const upload = confirm(`
    File will be uploaded into your profile.
    File size: ${fileSizeInMb} Mb
  `)

  if (fileSizeInMb > 50) {
    // eslint-disable-next-line no-alert
    alert('File is too large')
  }

  if (!upload) {
    removeLoadingBar()
    return false
  }

  // * take email from the jwt refresh token at cookies
  // editor.opts.imageUploadParams = { email }
  // editor.opts.fileUploadParams = { email }
  // editor.opts.videoUploadParams = { email }
  editor.opts.imageUploadURL = apiUrl.upload
  editor.opts.fileUploadURL = apiUrl.upload
  editor.opts.videoUploadURL = apiUrl.upload

  return true
}
