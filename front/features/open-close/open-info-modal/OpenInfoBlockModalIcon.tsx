import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getBlockFromStoreByIndex } from '@front/entities/quotation/redux/getter/getBlockFromStoreByIndex'

import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export const OpenInfoBlockModalIcon = (): React.ReactNode => {
  const navigate = useNavigate()
  const block = useBlock()

  const isClipboardModalVisible = reduxHolder.useSelector((state) => state.clipboard.isVisible)

  const disabled = isClipboardModalVisible

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='right' title='Info'>
      <span className={cls.actionIconContainer}>
        <HiOutlineInformationCircle
          // Otherwise error in dev tools
          aria-hidden={false}
          className={cls.actionIcon}
          onClick={(): void => {
            if (disabled === true) {
              return
            }

            const item = getBlockFromStoreByIndex({ blockIndex: block.index })

            if (item === undefined) {
              return
            }

            void navigate(`./${route.info}/${item.id}`)
          }}
          style={{
            color: disabled === true ? '#acacac' : '#000',
            cursor: 'pointer',
            touchAction: 'none',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
