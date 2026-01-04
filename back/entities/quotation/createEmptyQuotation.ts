import type { Quotation } from './quotationSchema'

type Props = {
  id: string
}

export const createEmptyQuotation = (props: Props): Quotation => ({
  meta: {
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
  },
  data: {
    name: '',
    category: '',
    desc: '',
    info: '',
    blocks: [],
  },
  permission: {
    permissionLevel: 'NEW',
  },
})
