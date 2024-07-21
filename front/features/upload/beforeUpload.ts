import { apiUrl } from '@back/consts/apiUrl'
import { getState } from '@lib_instances/store'
import { removeLoadingBar } from '@shared/lib/froala/removeLoadingBar'
import type { FroalaEditor } from '@shared/types/froala'
import { getFileSizeInMbAsText } from '@shared/utils'

type Props = {
  editor: FroalaEditor
  files: File[]
}

export const beforeUpload = ({ files, editor }: Props): boolean => {
  const email = getState().user.email

  if (!email) {
    // eslint-disable-next-line no-alert
    alert(
      'You are not logged in, file will be kept in browser until page is refreshed',
    )
    removeLoadingBar()
    return false
  }

  // eslint-disable-next-line no-alert
  const upload = confirm(`
    File will be uploaded into your profile.
    File size: ${getFileSizeInMbAsText({ file: files['0'] })}
  `)

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
