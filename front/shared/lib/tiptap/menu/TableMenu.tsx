import { AddRowBeforeButton } from './button/AddRowBeforeButton'
import { AddRowAfterButton } from './button/AddRowAfterButton'
import { DeleteRowButton } from './button/DeleteRowButton'
import { AddColumnBeforeButton } from './button/AddColumnBeforeButton'
import { AddColumnAfterButton } from './button/AddColumnAfterButton'
import { DeleteColumnButton } from './button/DeleteColumnButton'
import { MergeOrSplitCellsButton } from './button/MergeOrSplitCellsButton'
import { ToggleHeaderRowButton } from './button/ToggleHeaderRowButton'
import { ToggleHeaderColumnButton } from './button/ToggleHeaderColumnButton'
import { DeleteTableButton } from './button/DeleteTableButton'
import { Divider } from './button/shared/Divider'
import { ButtonsGroupLayout } from '../style/ButtonsGroupLayout'
import { ButtonsRowLayout } from '../style/ButtonsRowLayout'

export const TableMenu = (): React.JSX.Element => (
  <ButtonsRowLayout>
    <ButtonsGroupLayout>
      <AddRowBeforeButton />
      <AddRowAfterButton />
      <DeleteRowButton />
    </ButtonsGroupLayout>

    <Divider />

    <ButtonsGroupLayout>
      <AddColumnBeforeButton />
      <AddColumnAfterButton />
      <DeleteColumnButton />
    </ButtonsGroupLayout>

    <Divider />

    <ButtonsGroupLayout>
      <MergeOrSplitCellsButton />
    </ButtonsGroupLayout>

    <Divider />

    <ButtonsGroupLayout>
      <ToggleHeaderRowButton />
      <ToggleHeaderColumnButton />
    </ButtonsGroupLayout>

    <Divider />

    <ButtonsGroupLayout>
      <DeleteTableButton />
    </ButtonsGroupLayout>
  </ButtonsRowLayout>
)
