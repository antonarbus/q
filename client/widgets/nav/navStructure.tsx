import { Person, Settings } from '@mui/icons-material'
import { BsFiletypePdf } from 'react-icons/bs'
import { CiViewTable } from 'react-icons/ci'
import { FaRegRectangleList, FaGripLines } from 'react-icons/fa6'
import { FiLogOut, FiLogIn, FiDollarSign } from 'react-icons/fi'
import { IoText, IoChevronBackOutline } from 'react-icons/io5'
import { MdSaveAlt } from 'react-icons/md'
import { PiFolderSimpleStarDuotone } from 'react-icons/pi'
import { RiMenuAddFill } from 'react-icons/ri'
import { TbRectangleVertical } from 'react-icons/tb'
import { VscNewFile } from 'react-icons/vsc'
import {
  insertBoqItem,
  insertBoqRow,
  insertPriceItem,
  insertTextItem,
} from '@features/items/insert'
import { openBookmarksPage } from '@features/open_close/open_bookmarks_page'
import { openLoginModal } from '@features/open_close/open_login_modal'
import { openNewQuotationPage } from '@features/open_close/open_quotation_new_page'
import { openPreviousQuotation } from '@features/open_close/open_quotation_previous_page'
import { openQuotationsPage } from '@features/open_close/open_quotations_page'
import { openSaveQuotationModal } from '@features/open_close/open_save_quotation_modal'
import { downloadPdf } from '@features/quotation/pdf'
import { navItemKey } from '@shared/consts/navItemKey'
import { route } from '@shared/consts/route'
import type { MenuItemType } from '@shared/nav'

export const navStructure: MenuItemType[] = [
  {
    id: navItemKey.top,
    name: 'top',
    isHidden: false,
    menuItems: [
      {
        id: navItemKey.back,
        icon: <IoChevronBackOutline />,
        isHidden: true,
        name: 'Back',
        // shortcut: ['control', 'n'],
        // link: route.back,
        func: () => {
          openPreviousQuotation()
        },
        isActive: true,
      },
      {
        id: navItemKey.new,
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
        id: navItemKey.save,
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
        id: navItemKey.pdf,
        icon: <BsFiletypePdf />,
        isHidden: false,
        name: 'Pdf',
        disabled: true,
        func: () => {
          void downloadPdf()
        },
      },
      {
        id: navItemKey.insert,
        icon: <RiMenuAddFill />,
        isHidden: false,
        name: 'Insert',
        disabled: true,
        menuItems: [
          {
            id: navItemKey.block,
            name: 'Block',
            icon: <TbRectangleVertical />,
            isHidden: false,
            menuItems: [
              {
                id: navItemKey.textItem,
                name: 'Text',
                icon: <IoText />,
                isHidden: false,
                shortcut: ['control', 'shift', 't'],
                func: (e) => {
                  insertTextItem(e)
                },
              },
              {
                id: navItemKey.boqItem,
                name: 'Items',
                icon: <FaRegRectangleList />,
                isHidden: false,
                shortcut: ['control', 'shift', 'i'],
                func: (e) => {
                  insertBoqItem(e)
                },
              },
              {
                id: navItemKey.priceItem,
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
            id: navItemKey.boqRow,
            name: 'Row',
            icon: <FaGripLines />,
            isHidden: false,
            shortcut: ['control', 'shift', 'r'],
            func: (e) => {
              insertBoqRow(e)
            },
          },
        ],
      },
      {
        id: navItemKey.bookmarks,
        icon: <PiFolderSimpleStarDuotone />,
        isHidden: false,
        name: 'Bookmarks',
        link: route.bookmarks,
        func: () => {
          openBookmarksPage()
        },
      },
      {
        id: navItemKey.quotations,
        icon: <CiViewTable />,
        isHidden: false,
        name: 'Quotations',
        link: route.quotations,
        func: () => {
          openQuotationsPage()
        },
      },
      {
        id: navItemKey.login,
        icon: <FiLogIn />,
        isHidden: false,
        name: 'Log in',
        link: `./${route.login}`,
        func: () => {
          openLoginModal()
        },
      },
      {
        id: navItemKey.account,
        icon: <Person />,
        name: 'Account',
        isHidden: true,
        menuItems: [
          {
            id: navItemKey.settings,
            icon: <Settings />,
            isHidden: false,
            name: 'Settings',
            link: route.settings,
          },
          {
            id: navItemKey.logout,
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
