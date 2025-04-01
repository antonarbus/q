import { apiUrl } from '@back/shared/consts/apiUrl'
import { getState } from '@shared/lib/redux'
import { removeLoadingBar } from '@shared/lib/froala/removeLoadingBar'
import type { FroalaEditor } from '@shared/types/froala'
import { getFileSizeInMb } from '@shared/utils/getFileSizeInMb'
import { hideDraggableArea } from './showDraggableArea'
import type { ResBody as ResBodyGetSignedUrl } from '@back/api/va/getSignedUrlRouter'
import type { ResBody as ResBodyMakeFilePublic } from '@back/api/va/makeFilePublicRouter'
import axios from 'axios'
import { toast } from 'sonner'

type Props = {
  editor: FroalaEditor
  files: File[]
}

type Res = false | undefined

export const beforeUpload = async ({ files, editor }: Props): Promise<Res> => {
  hideDraggableArea()
  removeLoadingBar()

  if (!getState().user.email) {
    // todo: make a toast with ok button
    alert(
      'You are not logged in, file will be kept in browser until page is refreshed',
    )

    return
  }

  const file = files['0']

  if (file === undefined) {
    toast.warning('No file')

    return
  }

  const fileSizeInMb = getFileSizeInMb({ file: files['0'] })

  const confirmUpload = confirm(`
    File will be uploaded into your profile.
    File size: ${fileSizeInMb} Mb
  `)

  if (fileSizeInMb > 100) {
    toast.warning('File is too large')

    return
  }

  if (!confirmUpload) {
    removeLoadingBar()

    return
  }

  const fileName = encodeURIComponent(file.name)

  const toastId = toast.loading(`Uploading ${file.name}...`)

  try {
    const { data: signedUrlRes } = await axios<ResBodyGetSignedUrl>({
      url: `${apiUrl.getSignedUrl}?fileName=${fileName}`,
      method: 'get',
    })

    if (!signedUrlRes.signedUrl || !signedUrlRes.publicUrl) {
      toast.error('Failed', { id: toastId })

      return
    }

    await axios<unknown>({
      url: signedUrlRes.signedUrl,
      method: 'put',
      headers: {
        'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
      },
      data: file,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )

          toast.loading(`Uploading... ${percentCompleted}%`, {
            id: toastId,
          })
        }
      },
    })

    await axios<ResBodyMakeFilePublic>({
      url: `${apiUrl.makeFilePublic}?fileName=${fileName}`,
      method: 'get',
    })

    editor.file.insert(signedUrlRes.publicUrl, file.name, {
      link: signedUrlRes.publicUrl,
    })

    toast.success(`Uploaded`, { id: toastId })

    const quotationId = getState().quotation.id

    if (quotationId === 'new' || !quotationId) {
      // todo: make a toast with ok button
      toast.info('Do not forget to save quotation')
    }
  } catch {
    toast.error('Failed', { id: toastId })
  }

  // * take email from the jwt refresh token at cookies
  // editor.opts.imageUploadParams = { email }
  // editor.opts.fileUploadParams = { email }
  // editor.opts.videoUploadParams = { email }

  // editor.opts.imageUploadURL = apiUrl.upload
  // editor.opts.fileUploadURL = apiUrl.upload
  // editor.opts.videoUploadURL = apiUrl.upload
}
