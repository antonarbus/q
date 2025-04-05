import { RxPerson } from 'react-icons/rx'
import { CiViewTable } from 'react-icons/ci'
import { ImLink } from 'react-icons/im'
import {
  FaRegRectangleList,
  FaGripLines,
  FaUsersGear,
  FaRegShareFromSquare,
} from 'react-icons/fa6'
import { FiLogOut, FiLogIn, FiDollarSign, FiSave } from 'react-icons/fi'
import {
  IoText,
  IoChevronBackOutline,
  IoStatsChartOutline,
  IoSettingsOutline,
} from 'react-icons/io5'
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
import { openSaveQuotationModal } from '@features/open_close/open_save_quotation_modal'
import { openSettingsModal } from '@features/open_close/open_settings_modal'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'
import type { NavItem } from '@shared/nav'
import { downloadPdf } from '@features/quotation/download_quotation_as_pdf'
import { downloadExcel } from '@features/quotation/download_quotation_as_excel'
import { FaRegFilePdf } from 'react-icons/fa'
import { openShareQuotationModal } from '@features/open_close/open_share_quotation_modal'
import { getState } from '@shared/lib/redux'
import { saveExistingQuotation } from '@features/quotation/save_quotation'
import { Burger } from '@shared/nav/ui/NavList/NavItem/Burger'

export const navStructure: NavItem[] = [
  {
    id: navItemId.burger,
    name: 'burger',
    icon: <Burger />,
    isHidden: false,
    navItems: [
      {
        id: navItemId.back,
        icon: (
          <IoChevronBackOutline
            style={{ color: '#3bc3ff' }}
            data-testid='back icon'
          />
        ),
        isHidden: true,
        name: 'Back',
        func: openQuotationPageAndLoadPrev,
        isActive: true,
        tooltip: 'Back to quotation',
      },
      {
        id: navItemId.new,
        icon: <VscNewFile data-testid='new icon' />,
        isHidden: false,
        name: 'New',
        link: route.new,
        func: openQuotationPageAndLoadNew,
        isActive: true,
        tooltip: 'New quotation',
      },
      {
        id: navItemId.save,
        icon: <FiSave data-testid='save icon' />,
        isHidden: false,
        name: 'Save',
        shortcut: ['control', 'shift', 's'],
        link: `./${route.save}`,
        tooltip: 'Save or update quotation (shortcut: ctrl+shift+s)',
        func: (): void => {
          if (getState().quotation.id === 'new') {
            openSaveQuotationModal()
          } else {
            void saveExistingQuotation()
          }
        },
      },
      {
        id: navItemId.share,
        icon: <FaRegShareFromSquare data-testid='share icon' />,
        isHidden: false,
        name: 'Share',
        disabled: false,
        tooltip: 'Share quotation',
        navItems: [
          {
            id: navItemId.link,
            icon: <ImLink data-testid='link icon' />,
            name: 'Link',
            isHidden: false,
            disabled: false,
            tooltip: 'Share link for quotation',
            func: openShareQuotationModal,
          },
          {
            id: navItemId.pdf,
            icon: <FaRegFilePdf data-testid='pdf icon' />,
            isHidden: false,
            disabled: false,
            name: 'Download as .pdf',
            tooltip: 'Download as .pdf',
            func: downloadPdf,
          },
          {
            id: navItemId.excel,
            icon: <RiFileExcel2Line data-testid='excel icon' />,
            isHidden: false,
            disabled: false,
            name: 'Download as .xlsx',
            tooltip: 'Download as .xlsx',
            func: downloadExcel,
          },
        ],
      },
      {
        id: navItemId.insert,
        icon: <RiMenuAddFill data-testid='insert icon' />,
        isHidden: false,
        name: 'Insert',
        disabled: true,
        navItems: [
          {
            id: navItemId.block,
            name: 'Block',
            icon: <TbRectangleVertical />,
            isHidden: false,
            navItems: [
              {
                id: navItemId.textItem,
                name: 'Text',
                icon: <IoText />,
                isHidden: false,
                shortcut: ['control', 'shift', '2'],
                func: insertTextBlock,
              },
              {
                id: navItemId.boqItem,
                name: 'Items',
                icon: <FaRegRectangleList />,
                isHidden: false,
                shortcut: ['control', 'shift', '3'],
                func: insertBoqBlock,
              },
              {
                id: navItemId.priceItem,
                name: 'Price',
                icon: <FiDollarSign />,
                isHidden: false,
                shortcut: ['control', 'shift', '4'],
                func: insertPriceBlock,
              },
            ],
          },
          {
            id: navItemId.boqRow,
            name: 'Row',
            icon: <FaGripLines />,
            isHidden: false,
            shortcut: ['control', 'shift', '1'],
            func: insertBoqRow,
          },
        ],
        tooltip: 'Insert block or row',
      },
      {
        id: navItemId.bookmarks,
        icon: <PiFolderSimpleStarDuotone data-testid='bookmarks icon' />,
        isHidden: false,
        name: 'Bookmarks',
        link: route.bookmarks,
        func: openBookmarksPage,
        tooltip: 'Your bookmarks',
      },
      {
        id: navItemId.quotations,
        icon: <CiViewTable data-testid='quotations icon' />,
        isHidden: false,
        name: 'Quotations',
        link: route.quotations,
        func: openQuotationsPage,
        tooltip: 'Your quotations',
      },
      {
        id: navItemId.login,
        icon: <FiLogIn data-testid='login icon' />,
        isHidden: false,
        name: 'Log in',
        link: `./${route.login}`,
        func: openLoginModal,
        tooltip: 'Log in',
      },
      {
        id: navItemId.profile,
        icon: <RxPerson data-testid='profile icon' />,
        name: 'Profile',
        isHidden: true,
        navItems: [
          {
            id: navItemId.settings,
            icon: <IoSettingsOutline />,
            isHidden: false,
            name: 'Settings',
            link: `./${route.settings}`,
            func: openSettingsModal,
          },
          {
            id: navItemId.admin,
            icon: <RiAdminLine data-testid='admin icon' />,
            isHidden: false,
            name: 'Admin',
            tooltip: 'Admin links',
            navItems: [
              {
                id: navItemId.users,
                icon: <FaUsersGear />,
                isHidden: false,
                name: 'Users',
                link: `/${route.users}`,
              },
              {
                id: navItemId.visitors,
                icon: <IoStatsChartOutline />,
                isHidden: false,
                name: 'Visitors',
                link: `/${route.visitors}`,
              },
            ],
          },
          {
            id: navItemId.logout,
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
