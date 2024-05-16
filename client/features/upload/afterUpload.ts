import { getState } from '@lib_instances/store'
import { apiUrl } from '@server/consts/apiUrl'
import { removeLoadingBar } from '@shared/lib/froala/removeLoadingBar'
import { type FroalaEditor } from '@shared/types/froala'
import { getFileSizeInMbAsText } from '@shared/utils'

type Props = {
  editor: FroalaEditor
  files: File[]
}

export const beforeUpload = ({ files, editor }: Props): boolean => {
  const id = getState().quotation.id
  const email = getState().user.email

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

  if (id === 'new' || !id) {
    alert('Do not forget to save the quotation')
  }

  editor.opts.imageUploadParams = { email }
  editor.opts.fileUploadParams = { email }
  editor.opts.videoUploadParams = { email }
  editor.opts.imageUploadURL = apiUrl.upload
  editor.opts.fileUploadURL = apiUrl.upload
  editor.opts.videoUploadURL = apiUrl.upload

  return true
}
