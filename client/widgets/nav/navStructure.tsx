import { Person, Settings } from '@mui/icons-material'
import { BsFiletypePdf } from 'react-icons/bs'
import { CiViewTable } from 'react-icons/ci'
import { FaRegRectangleList, FaGripLines } from 'react-icons/fa6'
import { FiLogOut, FiLogIn, FiDollarSign } from 'react-icons/fi'
import { IoText } from 'react-icons/io5'
import { MdSaveAlt } from 'react-icons/md'
import { PiFolderSimpleStarDuotone } from 'react-icons/pi'
import { RiMenuAddFill } from 'react-icons/ri'
import { TbRectangleVertical } from 'react-icons/tb'
import { VscNewFile } from 'react-icons/vsc'
import { insertBoqItem, insertBoqRow, insertPriceItem, insertTextItem } from '@features/insert'
import { openBookmarksPage } from '@features/open_close/open_bookmarks_page'
import { openNewQuotationPage } from '@features/open_close/open_new_quotation_page'
import { openQuotationsPage } from '@features/open_close/open_quotations_page'
import { openSaveQuotationModal } from '@features/open_close/open_save_quotation_modal'
import { downloadPdf } from '@features/pdf'
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
        link: route.new,
        func: () => {
          openNewQuotationPage()
        },
        isActive: true,
      },
      {
        id: navItemId.save,
        icon: <MdSaveAlt />,
        isHidden: false,
        name: 'Save',
        // shortcut: ['control', 's'],
        link: `./${route.saveQuotation}`,
        func: () => {
          openSaveQuotationModal()
        },

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
        icon: <RiMenuAddFill />,
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
        id: navItemId.bookmarks,
        icon: <PiFolderSimpleStarDuotone />,
        isHidden: false,
        name: 'Bookmarks',
        link: route.bookmarks,
        func: () => {
          openBookmarksPage()
        },
      },
      {
        id: navItemId.quotations,
        icon: <CiViewTable />,
        isHidden: false,
        name: 'Quotations',
        link: route.quotations,
        func: () => {
          openQuotationsPage()
        },
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
