import { jsPDF } from 'jspdf'

type Props = {
  base64image: string
  width: number
  height: number
}

self.onmessage = async function (event) {
  const { base64image, width, height } = event.data
  const result = performImageProcessing({ base64image, width, height })
  self.postMessage(result)
}

function performImageProcessing({ base64image, width, height }: Props): Blob {
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [width, height],
  })
  pdf.addImage(base64image, 'PNG', 0, 0, width, height, undefined, 'FAST')
  const blob = pdf.output('blob')
  return blob
}
