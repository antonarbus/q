import { Person, Settings } from '@mui/icons-material'
import { BsFiletypePdf, BsBookmarkPlus } from 'react-icons/bs'
import { CgInsertAfter } from 'react-icons/cg'
import { CiViewTable } from 'react-icons/ci'
import { FaRegRectangleList, FaGripLines } from 'react-icons/fa6'
import { FiLogOut, FiLogIn, FiDollarSign } from 'react-icons/fi'
import { IoText } from 'react-icons/io5'
import { MdLineStyle } from 'react-icons/md'
import { TbRectangleVertical } from 'react-icons/tb'
import { VscNewFile } from 'react-icons/vsc'
import { insertBoqItem, insertBoqRow, insertPriceItem, insertTextItem } from '@features/items/insert'
import { createNewQuotation } from '@features/quotation/create_new_quotation'
import { downloadPdf } from '@features/quotation/download_pdf'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'
import type { MenuItemType } from '@shared/nav'

export const navStructure: MenuItemType[] = [
  {
    id: navItemId.top,
    name: 'top',
    isHidden: false,
    menuItems: [
      {
        id: navItemId.new,
        icon: <VscNewFile />,
        isHidden: false,
        name: 'New',
        // shortcut: ['control', 'n'],
        func: () => {
          createNewQuotation()
        },
        link: route.new,
        isActive: true,
      },
      {
        id: navItemId.save,
        icon: <BsBookmarkPlus />,
        isHidden: false,
        name: 'Save',
        // shortcut: ['control', 's'],
        link: `./${route.saveQuotation}`,

      },
      {
        id: navItemId.pdf,
        icon: <BsFiletypePdf />,
        isHidden: false,
        name: 'Pdf',
        disabled: true,
        func: () => {
          void downloadPdf()
        },
      },
      {
        id: navItemId.insert,
        icon: <CgInsertAfter />,
        isHidden: false,
        name: 'Insert',
        disabled: true,
        menuItems: [
          {
            id: navItemId.block,
            name: 'Block',
            icon: <TbRectangleVertical />,
            isHidden: false,
            menuItems: [
              {
                id: navItemId.textItem,
                name: 'Text',
                icon: <IoText />,
                isHidden: false,
                shortcut: ['control', 'shift', 't'],
                func: (e) => {
                  insertTextItem(e)
                },
              },
              {
                id: navItemId.boqItem,
                name: 'Items',
                icon: <FaRegRectangleList />,
                isHidden: false,
                shortcut: ['control', 'shift', 'i'],
                func: (e) => {
                  insertBoqItem(e)
                },
              },
              {
                id: navItemId.priceItem,
                name: 'Price',
                icon: <FiDollarSign />,
                isHidden: false,
                shortcut: ['control', 'shift', 'p'],
                func: (e) => {
                  insertPriceItem(e)
                },
              },
            ],
          },
          {
            id: navItemId.boqRow,
            name: 'Row',
            icon: <FaGripLines/>,
            isHidden: false,
            shortcut: ['control', 'shift', 'r'],
            func: (e) => {
              insertBoqRow(e)
            },
          },
        ],
      },
      {
        id: navItemId.items,
        icon: <MdLineStyle />,
        isHidden: false,
        name: 'Items',
        link: route.items,
      },
      {
        id: navItemId.quotations,
        icon: <CiViewTable />,
        isHidden: false,
        name: 'Quotations',
        link: route.quotations,
      },
      {
        id: navItemId.login,
        icon: <FiLogIn />,
        isHidden: false,
        name: 'Log in',
        link: `./${route.login}`,
      },
      {
        id: navItemId.account,
        icon: <Person />,
        name: 'Account',
        isHidden: true,
        menuItems: [
          {
            id: navItemId.settings,
            icon: <Settings />,
            isHidden: false,
            name: 'Settings',
            link: route.settings,
          },
          {
            id: navItemId.logout,
            icon: <FiLogOut />,
            isHidden: false,
            name: 'Log out',
            link: `./${route.logout}`,
          },
        ],
      },
    ],
  },
]
