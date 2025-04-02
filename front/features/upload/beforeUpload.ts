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
  editor: FroalaEditor | null
  files: File[]
}

type Res = false | undefined

// todo: reduce draggable area by padding, now you can't drop on upper part of the page

export const beforeUpload = async ({ files, editor }: Props): Promise<Res> => {
  if (editor === null) {
    throw new Error('Editor passed to beforeUpload method is null')
  }

  hideDraggableArea()

  if (getState().user.email === null) {
    toast.success('You are not logged in', {
      description: 'File will be kept in browser until page is refreshed. ',
      duration: Infinity,
      dismissible: true,
      action: {
        label: 'Understood',
        onClick: () => {
          console.info('Understood')
        },
      },
    })

    return
  }

  removeLoadingBar()

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
  } catch {
    toast.error('Failed', { id: toastId })
  }
}
