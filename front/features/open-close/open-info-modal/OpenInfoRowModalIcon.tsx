import { useIsCopyModalVisible } from '@entities/copy/useIsCopyModalVisible'
import { rowTypeKey } from '@entities/quotation/const/rowTypeKey'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { route } from '@shared/lib/react-router-dom/route'
import type { MouseEvent, ReactNode } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export const OpenInfoRowModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const block = useBlock()
  const row = useRow()
  const isisCopyModalVisible = useIsCopyModalVisible()
  const disabled = isisCopyModalVisible

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='right'
      title='Info'
    >
      <span className={cls.actionIconContainer}>
        <HiOutlineInformationCircle
          aria-hidden={false} // otherwise error in dev tools
          className={cls.actionIcon}
          onClick={(event: MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const rowFromStore = getRowFromStore({
              rowIndex: row.index,
              blockIndex: block.index,
            })

            if (rowFromStore === undefined) {
              return
            }

            if (rowFromStore.type === rowTypeKey.paste) {
              return
            }

            void navigate(`./${route.info}/${rowFromStore.id}`)
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
