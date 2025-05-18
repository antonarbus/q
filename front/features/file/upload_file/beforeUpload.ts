import { api } from '@back/api'
import { getState } from '@shared/lib/redux'
import { removeLoadingBar } from '@shared/lib/froala/removeLoadingBar'
import { getFileSizeInMb } from '@shared/utils/getFileSizeInMb'
import { hideDraggableArea } from './showDraggableArea'
import type { ResBody as ResBodyGetSignedUrl } from '@back/api/file/fileUploadSignedUrlHandler'
import type {
  ResBody as ResBodyMakeFilePublic,
  ReqBody as Payload,
} from '@back/api/file/saveFileInfoHandler'
import { toast } from 'sonner'
import { asyncDelay } from '@shared/utils/delay'
import type { FroalaProps } from '@entities/quotation/ui/froala/types'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'
import axios, { type AxiosError } from 'axios'

type BeforeUpload = NonNullable<FroalaProps['beforeUpload']>

/**
 * This is async function, but we need to return false or undefined immediately
 * to suppress the default editor behavior with file upload popup with progress bar.
 * We run it without await and assume it will do the job
 */
export const beforeUpload: BeforeUpload = async (props) => {
  if (props.editor === null) {
    throw new Error('Editor passed to beforeUpload method is null')
  }

  hideDraggableArea()

  // when user is not logged save files and images as base64 urls
  // todo 1: check that quotation is not reloaded on save, otherwise we loose files
  // todo 2: maybe save data inside html even for logged users and do not upload files into bucket
  if (getState().user.email === null) {
    const file = props.files['0']

    if (file === undefined) {
      return
    }

    const reader = new FileReader()

    reader.onload = (event): void => {
      const fileAsBase64String = event.target?.result

      if (typeof fileAsBase64String !== 'string') {
        return
      }

      if (props.editor === null) {
        return
      }

      if (props.type === 'image') {
        props.editor.image.insert(
          fileAsBase64String,
          true,
          {
            name: file.name,
          },
          null,
        )
      }

      if (props.type === 'file') {
        props.editor.file.insert(fileAsBase64String, file.name, {})
      }
    }

    reader.readAsDataURL(file)

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

  const toastId = toast.loading(`Uploading 0%...`)

  const { data: signedUrlRes } = await axiosWithAuth<ResBodyGetSignedUrl>({
    url: api.fileUploadSignedUrl.url,
    method: api.fileUploadSignedUrl.method,
  })

  if (signedUrlRes.signedUrl === null) {
    toast.error('Failed', { id: toastId })

    return
  }

  if (signedUrlRes.url === null) {
    toast.error('Failed', { id: toastId })

    return
  }

  let eventCount = 0

  const {
    promise: waitForUploadPromise,
    resolve: resolveWaitForUploadPromise,
  } = Promise.withResolvers()

  const uploadResponse = await axios<unknown>({
    url: signedUrlRes.signedUrl,
    method: 'put',
    data: file,
    headers: {
      'x-goog-content-length-range': '0,104857600', // Allow up to 100MB
    },
    onUploadProgress: (progressEvent) => {
      const showProgress = async (): Promise<void> => {
        eventCount = eventCount + 1

        await asyncDelay(50)

        if (progressEvent.lengthComputable === false) {
          return
        }

        if (progressEvent.total === undefined) {
          return
        }

        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        )

        if (percentCompleted <= 95) {
          toast.loading(`Uploading... ${percentCompleted}%`, {
            id: toastId,
          })
        }

        const gotCompletedInOneChunk =
          percentCompleted === 100 && eventCount === 1

        if (gotCompletedInOneChunk === true) {
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

        const gotCompletedInMultipleChunks =
          percentCompleted === 100 && eventCount !== 1

        if (gotCompletedInMultipleChunks === true) {
          toast.loading(`Uploading... 95%`, { id: toastId })
        }

        if (percentCompleted === 100) {
          resolveWaitForUploadPromise('done')
        }
      }

      void showProgress()
    },
  })

  if (uploadResponse.status !== 200) {
    toast.error('Upload failed', { id: toastId })

    return
  }

  const saveFileInfoResponse = await axiosWithAuth<
    ResBodyMakeFilePublic,
    AxiosError<ResBodyMakeFilePublic>,
    Payload
  >({
    url: api.saveFileInfo.url,
    method: api.saveFileInfo.method,
    data: {
      id: signedUrlRes.fileId,
      name: file.name,
      size: file.size,
    },
  })

  if (saveFileInfoResponse.status !== 200) {
    toast.error('Failed to make file public', { id: toastId })

    return
  }

  if (props.type === 'file') {
    props.editor.file.insert(`/uploads/${signedUrlRes.fileId}`, file.name, {
      link: `/uploads/${signedUrlRes.fileId}`,
    })
  }

  if (props.type === 'image') {
    props.editor.image.insert(
      `/uploads/${signedUrlRes.fileId}`,
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
}
