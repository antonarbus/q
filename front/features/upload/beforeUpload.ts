import { api } from '@back/shared/consts/api'
import { getState } from '@shared/lib/redux'
import { removeLoadingBar } from '@shared/lib/froala/removeLoadingBar'
import { getFileSizeInMb } from '@shared/utils/getFileSizeInMb'
import { hideDraggableArea } from './showDraggableArea'
import type { ResBody as ResBodyGetSignedUrl } from '@back/api/file/fileUploadSignedUrl'
import type {
  ResBody as ResBodyMakeFilePublic,
  ReqBody as Payload,
} from '@back/api/file/makeFilePublic'
import { toast } from 'sonner'
import { asyncDelay } from '@shared/utils/delay'
import type { FroalaProps } from '@entities/quotation/ui/froala/types'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'
import axios, { type AxiosError } from 'axios'

type BeforeUpload = NonNullable<FroalaProps['beforeUpload']>

/**
 * This is async function, but we need to return false or undefined immediately
 * We run it without await and assume it will do the job
 */
export const beforeUpload: BeforeUpload = async (props) => {
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
    const { data: signedUrlRes } = await axiosWithAuth<ResBodyGetSignedUrl>({
      url: `${api.fileUploadSignedUrl.url}?fileName=${fileName}`,
      method: api.fileUploadSignedUrl.method,
    })

    if (!signedUrlRes.signedUrl || !signedUrlRes.publicUrl) {
      toast.error('Failed', { id: toastId })

      return
    }

    let eventCount = 0

    const {
      promise: waitForUploadPromise,
      resolve: resolveWaitForUploadPromise,
    } = Promise.withResolvers()

    await axios<unknown>({
      url: signedUrlRes.signedUrl,
      method: 'put',
      data: file,
      headers: {
        'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
      },
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
              resolveWaitForUploadPromise('done')
            }
          }
        }

        void showProgress()
      },
    })

    await axiosWithAuth<
      ResBodyMakeFilePublic,
      AxiosError<ResBodyMakeFilePublic>,
      Payload
    >({
      url: api.makeFilePublic.url,
      method: api.makeFilePublic.method,
      data: {
        fileName,
      },
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

    await waitForUploadPromise
    await asyncDelay(50)
    toast.success(`Uploaded 100%`, { id: toastId })
  } catch {
    toast.error('Failed', { id: toastId })
  }
}
