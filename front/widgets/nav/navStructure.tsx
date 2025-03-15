import { Person, Settings } from '@mui/icons-material'
import { CiViewTable } from 'react-icons/ci'
import { FaRegRectangleList, FaGripLines, FaUsersGear } from 'react-icons/fa6'
import { FiLogOut, FiLogIn, FiDollarSign } from 'react-icons/fi'
import {
  IoText,
  IoChevronBackOutline,
  IoStatsChartOutline,
} from 'react-icons/io5'
import { MdSaveAlt } from 'react-icons/md'
import { PiFolderSimpleStarDuotone } from 'react-icons/pi'
import { RiMenuAddFill, RiAdminLine, RiFileExcel2Line } from 'react-icons/ri'
import { TbRectangleVertical } from 'react-icons/tb'
import { VscNewFile } from 'react-icons/vsc'
import {
  insertBoqBlock,
  insertBoqRow,
  insertPriceBlock,
  insertTextBlock,
} from '@features/blocks/insert'
import { openBookmarksPage } from '@features/open_close/open_bookmarks_page'
import { openLoginModal } from '@features/open_close/open_login_modal'
import {
  openQuotationPageAndLoadNew,
  openQuotationPageAndLoadPrev,
} from '@features/open_close/open_quotation_page'
import { openQuotationsPage } from '@features/open_close/open_quotations_page'
import { openQuotationModal } from '@features/open_close/open_quotation_modal'
import { openSettingsModal } from '@features/open_close/open_settings_modal'
import { navItemKey } from '@shared/consts/navItemKey'
import { route } from '@shared/consts/route'
import type { MenuItemType } from '@shared/nav'
import { downloadPdf } from '@features/quotation/download_quotation_as_pdf'
import { downloadExcel } from '@features/quotation/download_quotation_as_excel'
import { FaRegFilePdf } from 'react-icons/fa'

export const navStructure: MenuItemType[] = [
  {
    id: navItemKey.top,
    name: 'top',
    isHidden: false,
    menuItems: [
      {
        id: navItemKey.back,
        icon: (
          <IoChevronBackOutline
            style={{ color: '#3bc3ff' }}
            data-testid='back icon'
          />
        ),
        isHidden: true,
        name: 'Back',
        // shortcut: ['control', 'n'],
        // link: route.back,
        func: (): void => {
          openQuotationPageAndLoadPrev()
        },
        isActive: true,
        tooltip: 'Back to quotation',
      },
      {
        id: navItemKey.new,
        icon: <VscNewFile data-testid='new icon' />,
        isHidden: false,
        name: 'New',
        // shortcut: ['control', 'n'],
        link: route.new,
        func: (): void => {
          openQuotationPageAndLoadNew()
        },
        isActive: true,
        tooltip: 'New quotation',
      },
      {
        id: navItemKey.save,
        icon: <MdSaveAlt data-testid='save icon' />,
        isHidden: false,
        name: 'Save',
        // shortcut: ['control', 's'],
        link: `./${route.save}`,
        func: (): void => {
          openQuotationModal()
        },
        tooltip: 'Save or update quotation',
      },
      {
        id: navItemKey.pdf,
        icon: <FaRegFilePdf data-testid='pdf icon' />,
        isHidden: false,
        name: 'Pdf',
        disabled: true,
        func: (): void => {
          void downloadPdf()
        },
        tooltip: 'Save as .pdf',
      },
      {
        id: navItemKey.excel,
        icon: <RiFileExcel2Line data-testid='excel icon' />,
        isHidden: false,
        name: 'Excel',
        disabled: true,
        func: (): void => {
          downloadExcel()
        },
        tooltip: 'Save as .xlsx',
      },
      {
        id: navItemKey.insert,
        icon: <RiMenuAddFill data-testid='insert icon' />,
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
                shortcut: ['control', '2'],
                func: (e?: React.MouseEvent): void => {
                  insertTextBlock(e)
                },
              },
              {
                id: navItemKey.boqItem,
                name: 'Items',
                icon: <FaRegRectangleList />,
                isHidden: false,
                shortcut: ['control', '3'],
                func: (e?: React.MouseEvent): void => {
                  insertBoqBlock(e)
                },
              },
              {
                id: navItemKey.priceItem,
                name: 'Price',
                icon: <FiDollarSign />,
                isHidden: false,
                shortcut: ['control', '4'],
                func: (e?: React.MouseEvent): void => {
                  insertPriceBlock(e)
                },
              },
            ],
          },
          {
            id: navItemKey.boqRow,
            name: 'Row',
            icon: <FaGripLines />,
            isHidden: false,
            shortcut: ['control', '1'],
            func: (e?: React.MouseEvent): void => {
              insertBoqRow(e)
            },
          },
        ],
        tooltip: 'Insert block or row',
      },
      {
        id: navItemKey.bookmarks,
        icon: <PiFolderSimpleStarDuotone data-testid='bookmarks icon' />,
        isHidden: false,
        name: 'Bookmarks',
        link: route.bookmarks,
        func: (e?: React.MouseEvent): void => {
          openBookmarksPage()
        },
        tooltip: 'Your bookmarks',
      },
      {
        id: navItemKey.quotations,
        icon: <CiViewTable data-testid='quotations icon' />,
        isHidden: false,
        name: 'Quotations',
        link: route.quotations,
        func: (e?: React.MouseEvent): void => {
          openQuotationsPage()
        },
        tooltip: 'Your quotations',
      },
      {
        id: navItemKey.login,
        icon: <FiLogIn data-testid='login icon' />,
        isHidden: false,
        name: 'Log in',
        link: `./${route.login}`,
        func: (e?: React.MouseEvent): void => {
          openLoginModal()
        },
        tooltip: 'Log in',
      },
      {
        id: navItemKey.profile,
        icon: <Person data-testid='profile icon' />,
        name: 'Profile',
        isHidden: true,
        menuItems: [
          {
            id: navItemKey.settings,
            icon: <Settings />,
            isHidden: false,
            name: 'Settings',
            link: `./${route.settings}`,
            func: (e?: React.MouseEvent): void => {
              openSettingsModal()
            },
          },
          {
            id: navItemKey.admin,
            icon: <RiAdminLine data-testid='admin icon' />,
            isHidden: false,
            name: 'Admin',
            tooltip: 'Admin links',
            menuItems: [
              {
                id: navItemKey.users,
                icon: <FaUsersGear />,
                isHidden: false,
                name: 'Users',
                link: `/${route.users}`,
              },
              {
                id: navItemKey.visitors,
                icon: <IoStatsChartOutline />,
                isHidden: false,
                name: 'Visitors',
                link: `/${route.visitors}`,
              },
            ],
          },
          {
            id: navItemKey.logout,
            icon: <FiLogOut />,
            isHidden: false,
            name: 'Log out',
            link: `./${route.logout}`,
          },
        ],
        tooltip: 'Profile, settings',
      },
    ],
  },
]
