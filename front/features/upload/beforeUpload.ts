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
import { asyncDelay } from '@shared/utils/delay'

type Props = {
  editor: FroalaEditor | null
  files: File[]
  type: 'image' | 'file'
}

/**
 * This is async function, but we need to return false or undefined immediately
 * We run it without await and assume it will do the job
 */
export const beforeUpload = async (props: Props): Promise<void> => {
  if (props.editor === null) {
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

  const file = props.files['0']

  if (file === undefined) {
    toast.warning('No file')

    return
  }

  const fileSizeInMb = getFileSizeInMb({ file: props.files['0'] })

  if (fileSizeInMb > 100) {
    toast.warning('File is too large')

    return
  }

  const fileName = encodeURIComponent(file.name)

  const toastId = toast.loading(`Uploading 0%...`)

  try {
    const { data: signedUrlRes } = await axios<ResBodyGetSignedUrl>({
      url: `${apiUrl.getSignedUrl}?fileName=${fileName}`,
      method: 'get',
    })

    if (!signedUrlRes.signedUrl || !signedUrlRes.publicUrl) {
      toast.error('Failed', { id: toastId })

      return
    }

    let eventCount = 0

    const { promise, resolve } = Promise.withResolvers()

    await axios<unknown>({
      url: signedUrlRes.signedUrl,
      method: 'put',
      headers: {
        'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
      },
      data: file,
      onUploadProgress: (progressEvent) => {
        const showProgress = async (): Promise<void> => {
          eventCount++

          await asyncDelay(50)

          if (progressEvent.lengthComputable && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            )

            if (percentCompleted <= 95) {
              toast.loading(`Uploading... ${percentCompleted}%`, {
                id: toastId,
              })
            }

            if (percentCompleted === 100 && eventCount === 1) {
              await asyncDelay(50)
              toast.loading(`Uploading... 10%`, { id: toastId })
              await asyncDelay(50)
              toast.loading(`Uploading... 20%`, { id: toastId })
              await asyncDelay(50)
              toast.loading(`Uploading... 30%`, { id: toastId })
              await asyncDelay(50)
              toast.loading(`Uploading... 40%`, { id: toastId })
              await asyncDelay(50)
              toast.loading(`Uploading... 50%`, { id: toastId })
              await asyncDelay(50)
              toast.loading(`Uploading... 60%`, { id: toastId })
              await asyncDelay(50)
              toast.loading(`Uploading... 70%`, { id: toastId })
              await asyncDelay(50)
              toast.loading(`Uploading... 80%`, { id: toastId })
              await asyncDelay(50)
              toast.loading(`Uploading... 90%`, { id: toastId })
            }

            if (percentCompleted === 100 && eventCount !== 1) {
              toast.loading(`Uploading... 95%`, { id: toastId })
            }

            if (percentCompleted === 100) {
              resolve('done')
            }
          }
        }

        void showProgress()
      },
    })

    await axios<ResBodyMakeFilePublic>({
      url: `${apiUrl.makeFilePublic}?fileName=${fileName}`,
      method: 'get',
    })

    if (props.type === 'file') {
      props.editor.file.insert(signedUrlRes.publicUrl, file.name, {
        link: signedUrlRes.publicUrl,
      })
    }

    if (props.type === 'image') {
      props.editor.image.insert(
        signedUrlRes.publicUrl,
        true,
        {
          name: file.name,
        },
        null,
      )
    }

    await promise
    await asyncDelay(50)
    toast.success(`Uploaded 100%`, { id: toastId })
  } catch {
    toast.error('Failed', { id: toastId })
  }
}
