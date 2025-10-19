import { useIsCopyModalVisible } from '@entities/copy/useIsCopyModalVisible'
import { boqRowKey } from '@entities/quotation/const/boqRowKey'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getBoqRowFromStore } from '@entities/quotation/redux/getter/getBoqRowFromStore'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/cls'
import { route } from '@shared/lib/react-router-dom/route'
import type { MouseEvent, ReactNode } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export const OpenInfoBoqRowModalIcon = (): ReactNode => {
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

            const boqRow = getBoqRowFromStore({
              rowIndex: row.index,
              blockIndex: block.index,
            })

            if (boqRow === undefined) {
              return
            }

            if (boqRow.type === boqRowKey.paste) {
              return
            }

            void navigate(`./${route.info}/${boqRow.id}`)
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
