import type { Quotation } from './quotationSchema'

type Props = {
  id: string
}

export const getEmptyQuotation = (props: Props): Quotation => ({
  id: props.id,
  name: '',
  category: '',
  desc: '',
  info: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  openedAt: null,
  viewedAt: null,
  email: 'unknown@gmail.com',
  permissionLevel: 'NEW',
  access: {
    level: 'nobody',
    userList: [],
  },
  blocks: [],
})
