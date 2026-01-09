import { Tooltip } from '@mui/material'
import { format } from 'bytes'
import type { JSX } from 'react'
import { HiDownload } from 'react-icons/hi'

type Props = {
  fileSize: number
}

export const DownloadFileIcon = (props: Props): JSX.Element => {
  const fileSizeFormatted = format(props.fileSize, {
    unit: props.fileSize < 1_048_576 ? 'kb' : 'mb',
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
          cursor: 'pointer',
          '&:hover': {
            color: 'black',
          },
        }}
        onClick={() => {
          alert('Not implemented')
        }}
      />
    </Tooltip>
  )
}
