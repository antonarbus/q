import { route } from '@back/api/route'
import { getImageDimensions } from './getImageDimensions'
import type { ResBody as ResBodyGetSignedUrl } from '@back/api/file/fileUploadSignedUrlHandler'
import type {
  ReqBody as Payload,
  ResBody as ResBodyMakeFilePublic,
} from '@back/api/file/saveFileInfoHandler'
import { axiosWithAuth } from '@front/shared/lib/axios'
import { reduxHolder } from '@front/shared/lib/redux'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import { getFileSizeInMb } from '@front/shared/util/getFileSizeInMb'
import axios, { type AxiosError } from 'axios'
import { toast } from 'sonner'
import { hideDraggableArea } from './showDraggableArea'
import type { OnUpload } from '@front/shared/lib/tiptap/types'

export const upload: OnUpload = async (props) => {
  hideDraggableArea()

  // when user is not logged save files and images as base64 urls
  if (reduxHolder.getState().user.email === null) {
    const file = props.files['0']

    if (file === undefined) {
      return
    }

    const reader = new FileReader()

    reader.onload = (event): void => {
      const fileAsBase64String = event.target?.result

      if (props.editor === null) {
        return
      }

      if (typeof fileAsBase64String !== 'string') {
        return
      }

      if (props.type === 'image') {
        void getImageDimensions(fileAsBase64String).then((imageDimensions) => {
          props.editor
            ?.chain()
            .focus()
            .setImage({
              src: fileAsBase64String,
              alt: file.name,
              width: imageDimensions.width > 0 ? imageDimensions.width : undefined,
              height: imageDimensions.height > 0 ? imageDimensions.height : undefined,
            })
            .run()
        })
      }

      if (props.type === 'file') {
        props.editor
          .chain()
          .focus()
          .insertContent({
            type: 'text',
            text: file.name,
            marks: [
              {
                type: 'link',
                attrs: {
                  href: fileAsBase64String,
                },
              },
            ],
          })
          .run()
      }
    }

    reader.readAsDataURL(file)

    return
  }

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

  const signUrlResponse = await axiosWithAuth<ResBodyGetSignedUrl>({
    url: route.fileUploadSignedUrl.url,
    method: route.fileUploadSignedUrl.method,
  })

  let eventCount = 0

  const uploadCompletionDeferred = Promise.withResolvers()

  const uploadResponse = await axios<unknown>({
    url: signUrlResponse.data.signedUrl,
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

        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)

        if (percentCompleted <= 95) {
          toast.loading(`Uploading... ${percentCompleted}%`, {
            id: toastId,
          })
        }

        const gotCompletedInOneChunk = percentCompleted === 100 && eventCount === 1

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

        const gotCompletedInMultipleChunks = percentCompleted === 100 && eventCount !== 1

        if (gotCompletedInMultipleChunks === true) {
          toast.loading(`Uploading... 95%`, { id: toastId })
        }

        if (percentCompleted === 100) {
          uploadCompletionDeferred.resolve('done')
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
    url: route.saveFileInfo.url(signUrlResponse.data.fileId),
    method: route.saveFileInfo.method,
    data: {
      name: file.name,
      size: file.size,
    },
  })

  if (props.editor === null) {
    return
  }

  if (saveFileInfoResponse.status !== 200) {
    toast.error('Failed to make file public', { id: toastId })

    return
  }

  const uploadUrl = `/uploads/${signUrlResponse.data.fileId}`

  if (props.type === 'file') {
    props.editor
      .chain()
      .focus()
      .insertContent({
        type: 'text',
        text: file.name,
        marks: [
          {
            type: 'link',
            attrs: {
              href: uploadUrl,
            },
          },
        ],
      })
      .run()
  }

  if (props.type === 'image') {
    const blobUrl = URL.createObjectURL(file)
    const { width, height } = await getImageDimensions(blobUrl)
    URL.revokeObjectURL(blobUrl)

    props.editor
      .chain()
      .focus()
      .setImage({
        src: uploadUrl,
        alt: file.name,
        width: width > 0 ? width : undefined,
        height: height > 0 ? height : undefined,
      })
      .run()
  }

  await uploadCompletionDeferred.promise
  await asyncDelay(50)

  toast.success(`Uploaded 100%`, { id: toastId })
}
