import type { Quotation } from './quotationSchema'

type Props = {
  id: string
}

export const createEmptyQuotation = (props: Props): Quotation => ({
  id: props.id,
  email: 'unknown@gmail.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  openedAt: null,
  viewedAt: null,
  access: {
    level: 'nobody',
    userList: [],
  },
  name: '',
  category: '',
  desc: '',
  info: '',
  blocks: [],
  permissionLevel: 'NEW',
})
