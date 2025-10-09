import { Tooltip } from '@mui/material'
import { format } from 'bytes'
import type { JSX } from 'react'
import { HiDownload } from 'react-icons/hi'

type Props = {
  fileSize: number
}

export const DownloadFileIcon = ({ fileSize }: Props): JSX.Element => {
  const fileSizeFormatted = format(fileSize, {
    unit: fileSize < 1_048_576 ? 'kb' : 'mb',
    thousandsSeparator: ' ',
    unitSeparator: ' ',
  })

  return (
    <Tooltip placement='top' title={`Download ${fileSizeFormatted}`}>
      <HiDownload
        css={{
          width: '14px',
          height: '14px',
          marginLeft: '5px',
          color: 'grey',
          '&:hover': {
            color: 'black',
          },
        }}
      />
    </Tooltip>
  )
}
