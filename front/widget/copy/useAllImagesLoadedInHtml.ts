import { useEffect, useState } from 'react'

type Props = {
  firstItemPreviewHtml: string
}

export const useAllImagesLoadedInHtml = (props: Props): boolean => {
  const [allImagesLoadedInHtml, setAllImagesLoadedInHtml] = useState('')

  useEffect(() => {
    const div = document.createElement('div')
    div.innerHTML = props.firstItemPreviewHtml

    const imageSrcList = Array.from(div.querySelectorAll('img'))
      .map((img) => img.src)
      .filter(Boolean)

    if (imageSrcList.length === 0) {
      queueMicrotask(() => {
        setAllImagesLoadedInHtml(props.firstItemPreviewHtml)
      })

      return
    }

    let remainingImageQty = imageSrcList.length

    const onDone = (): void => {
      remainingImageQty = remainingImageQty - 1

      if (remainingImageQty === 0) {
        setAllImagesLoadedInHtml(props.firstItemPreviewHtml)
      }
    }

    imageSrcList.forEach((src) => {
      const image = new Image()
      image.onload = onDone
      image.onerror = onDone
      image.src = src
    })
  }, [props.firstItemPreviewHtml])

  return allImagesLoadedInHtml === props.firstItemPreviewHtml
}
