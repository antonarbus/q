import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { getBlockFromStoreByIndex } from '@front/entities/quotation/redux/getter/getBlockFromStoreByIndex'

import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export const OpenInfoBlockModalIcon = (): React.ReactNode => {
  const navigate = useNavigate()
  const block = useBlock()

  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)

  const disabled = isCopyModalVisible

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='right' title='Info'>
      <span className={cls.actionIconContainer}>
        <HiOutlineInformationCircle
          aria-hidden={false} // otherwise error in dev tools
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
