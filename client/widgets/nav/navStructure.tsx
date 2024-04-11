import { Person, Settings } from '@mui/icons-material'
import { BsFiletypePdf } from 'react-icons/bs'
import { CgInsertAfter } from 'react-icons/cg'
import { CiViewTable } from 'react-icons/ci'
import { FaRegRectangleList, FaGripLines } from 'react-icons/fa6'
import { FiLogOut, FiLogIn, FiDollarSign } from 'react-icons/fi'
import { IoText } from 'react-icons/io5'
import { MdSaveAlt, MdLineStyle } from 'react-icons/md'
import { TbRectangleVertical } from 'react-icons/tb'
import { VscNewFile } from 'react-icons/vsc'
import { insertBoqItem, insertBoqRow, insertPriceItem, insertTextItem } from '@features/items/insert'
import { createNewQuotation } from '@features/quotation/create_new_quotation'
import { downloadPdf } from '@features/quotation/download_pdf'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { route } from '@shared/consts/route'
import type { MenuItemTypes } from '@shared/nav'

export const navStructure: MenuItemTypes[] = [
  {
    id: navMenuItemId.top,
    name: 'top',
    isHidden: false,
    menuItems: [
      {
        id: navMenuItemId.new,
        icon: <VscNewFile />,
        isHidden: false,
        name: 'New',
        // shortcut: ['control', 'n'],
        func: () => {
          createNewQuotation()
        },
        link: route.new,
      },
      {
        id: navMenuItemId.save,
        icon: <MdSaveAlt />,
        isHidden: false,
        name: 'Save',
        // shortcut: ['control', 's'],
        link: `./${route.save}`,

      },
      {
        id: navMenuItemId.pdf,
        icon: <BsFiletypePdf />,
        isHidden: false,
        name: 'Pdf',
        disabled: true,
        func: () => {
          void downloadPdf()
        },
      },
      {
        id: navMenuItemId.insert,
        icon: <CgInsertAfter />,
        isHidden: false,
        name: 'Insert',
        disabled: true,
        menuItems: [
          {
            id: navMenuItemId.block,
            name: 'Block',
            icon: <TbRectangleVertical />,
            isHidden: false,
            menuItems: [
              {
                id: navMenuItemId.textItem,
                name: 'Text',
                icon: <IoText />,
                isHidden: false,
                shortcut: ['control', 'shift', 't'],
                func: (e) => {
                  insertTextItem(e)
                },
              },
              {
                id: navMenuItemId.boqItem,
                name: 'Items',
                icon: <FaRegRectangleList />,
                isHidden: false,
                shortcut: ['control', 'shift', 'i'],
                func: (e) => {
                  insertBoqItem(e)
                },
              },
              {
                id: navMenuItemId.priceItem,
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
            id: navMenuItemId.boqRow,
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
        id: navMenuItemId.items,
        icon: <MdLineStyle />,
        isHidden: false,
        name: 'Items',
        link: route.items,
      },
      {
        id: navMenuItemId.quotations,
        icon: <CiViewTable />,
        isHidden: false,
        name: 'Quotations',
        link: route.quotations,
      },
      {
        id: navMenuItemId.login,
        icon: <FiLogIn />,
        isHidden: false,
        name: 'Log in',
        link: `./${route.login}`,
      },
      {
        id: navMenuItemId.account,
        icon: <Person />,
        name: 'Account',
        isHidden: true,
        menuItems: [
          {
            id: navMenuItemId.settings,
            icon: <Settings />,
            isHidden: false,
            name: 'Settings',
            link: route.settings,
          },
          {
            id: navMenuItemId.logout,
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
