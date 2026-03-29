import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { useRow } from '@front/entities/quotation/provider/RowProvider'
import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export const OpenInfoRowModalIcon = (): React.ReactNode => {
  const navigate = useNavigate()
  const block = useBlock()
  const row = useRow()

  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='right' title='Info'>
      <span className={cls.actionIconContainer}>
        <HiOutlineInformationCircle
          aria-hidden={false} // otherwise error in dev tools
          className={cls.actionIcon}
          onClick={(): void => {
            if (isCopyModalVisible === true) {
              return
            }

            const rowFromStore = getRowFromStoreByIndex({
              rowIndex: row.index,
              blockIndex: block.index,
            })

            if (rowFromStore === undefined) {
              return
            }

            void navigate(`./${route.info}/${rowFromStore.id}`)
          }}
          style={{
            color: isCopyModalVisible === true ? '#acacac' : '#000',
            cursor: 'pointer',
            touchAction: 'none',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
