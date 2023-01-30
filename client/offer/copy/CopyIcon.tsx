import { MdCopyAll } from 'react-icons/md'

export const CopyIcon = () => {
  return (
    <MdCopyAll
      css={{ cursor: 'pointer' }}
      onClick={() => alert('copy')}
    />
  )
}
