import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import {
  boqRowKey,
  getBoqRowFromStore,
  useBlock,
  useRow,
} from '@entities/quotation'
import { route } from '@shared/const/route'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/const/cls'
import { useIsCopyModalVisible } from '@entities/copy'

export const OpenInfoBoqRowModalIcon = (): React.ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()
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
          onClick={(event: React.MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const boqRow = getBoqRowFromStore({ rowIndex, blockIndex })

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
