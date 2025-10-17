export type WorkerRequestMessage = {
  imageData: string
  width: number
  height: number
  links: {
    url: string
    x: number
    y: number
    width: number
    height: number
  }[]
}

export type WorkerResponseMessage = {
  pdfBlob: Blob
}
