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

  if (!getState().user.email) {
    alert(
      'You are not logged in, file will be kept in browser until page is refreshed',
    )

    removeLoadingBar()

    return
  }

  const file = files['0']

  if (file === undefined) {
    alert('No file')

    return
  }

  const fileSizeInMb = getFileSizeInMb({ file: files['0'] })

  const confirmUpload = confirm(`
    File will be uploaded into your profile.
    File size: ${fileSizeInMb} Mb
  `)

  if (fileSizeInMb > 50) {
    alert('File is too large')

    return
  }

  if (!confirmUpload) {
    removeLoadingBar()

    return
  }

  const fileName = encodeURIComponent(file.name)

  const { data: signedUrlRes } = await axios<ResBodyGetSignedUrl>({
    url: `${apiUrl.getSignedUrl}?fileName=${fileName}`,
    method: 'get',
  })

  if (!signedUrlRes.signedUrl || !signedUrlRes.publicUrl) {
    alert('Failed to get signed url')

    return
  }

  await axios<unknown>({
    url: signedUrlRes.signedUrl,
    method: 'put',
    headers: {
      'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
    },
    data: file,
  })

  await axios<ResBodyMakeFilePublic>({
    url: `${apiUrl.makeFilePublic}?fileName=${fileName}`,
    method: 'get',
  })

  editor.file.insert(signedUrlRes.publicUrl, file.name, {
    link: signedUrlRes.publicUrl,
  })

  const quotationId = getState().quotation.id

  if (quotationId === 'new' || !quotationId) {
    toast.info('Do not forget to save quotation')
  }

  toast.success('File uploaded')

  // * take email from the jwt refresh token at cookies
  // editor.opts.imageUploadParams = { email }
  // editor.opts.fileUploadParams = { email }
  // editor.opts.videoUploadParams = { email }

  // editor.opts.imageUploadURL = apiUrl.upload
  // editor.opts.fileUploadURL = apiUrl.upload
  // editor.opts.videoUploadURL = apiUrl.upload
}
