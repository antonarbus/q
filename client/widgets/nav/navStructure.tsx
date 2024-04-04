import { Person, Settings } from '@mui/icons-material'
import { AiOutlineMinus } from 'react-icons/ai'
import { BsFiletypePdf } from 'react-icons/bs'
import { CiViewTable } from 'react-icons/ci'
import { FiLogOut, FiLogIn, FiDollarSign } from 'react-icons/fi'
import { IoSaveOutline, IoText } from 'react-icons/io5'
import { MdOutlineAdd } from 'react-icons/md'
import { TbTableRow } from 'react-icons/tb'
import { VscNewFile } from 'react-icons/vsc'
import { addTextItem } from '@features/items/add'
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
        shortcut: ['control', 'n'],
        func: () => {
          createNewQuotation()
        },
        link: route.new,
      },
      {
        id: navMenuItemId.save,
        icon: <IoSaveOutline />,
        isHidden: false,
        name: 'Save',
        shortcut: ['control', 's'],
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
        id: navMenuItemId.add,
        icon: <MdOutlineAdd />,
        isHidden: false,
        name: 'Add',
        disabled: true,
        menuItems: [
          {
            id: navMenuItemId.textItem,
            name: 'Text',
            icon: <IoText />,
            isHidden: false,
            shortcut: ['control', 'shift', 't'],
            func: (e) => {
              addTextItem(e)
            },
          },
          {
            id: navMenuItemId.boqItem,
            name: 'Items',
            icon: <TbTableRow />,
            isHidden: false,
            shortcut: ['control', 'shift', 'i'],
            func: () => {
              alert('boq')
            },
          },
          {
            id: navMenuItemId.priceItem,
            name: 'Price',
            icon: <FiDollarSign />,
            isHidden: false,
            shortcut: ['control', 'shift', 'p'],
            func: () => {
              alert('price')
            },
          },
          {
            id: navMenuItemId.boqRow,
            name: 'Row',
            icon: <AiOutlineMinus/>,
            isHidden: false,
            shortcut: ['control', 'shift', 'r'],
            func: () => {
              alert('row')
            },
          },
        ],
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
            id: navMenuItemId.profile,
            icon: <Person />,
            isHidden: false,
            name: 'Profile',
            link: route.profile,
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
