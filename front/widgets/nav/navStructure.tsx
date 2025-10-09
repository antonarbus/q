import {
  insertBoqBlock,
  insertBoqRow,
  insertPriceBlock,
  insertTextBlock,
} from '@features/blocks/insert'
import { openBookmarksPage } from '@features/open-close/open-bookmarks-page'
import { openLoginModal } from '@features/open-close/open-login-modal'
import {
  openQuotationPageAndLoadNew,
  openQuotationPageAndLoadPrev,
} from '@features/open-close/open-quotation-page'
import { openQuotationsPage } from '@features/open-close/open-quotations-page'
import { openSaveQuotationModal } from '@features/open-close/open-save-quotation-modal'
import { openSettingsModal } from '@features/open-close/open-settings-modal'
import { openShareQuotationModal } from '@features/open-close/open-share-quotation-modal'
import { downloadExcel } from '@features/quotation/download-quotation-as-excel'
import { downloadPdf } from '@features/quotation/download-quotation-as-pdf'
import { saveExistingQuotation } from '@features/quotation/save-quotation'
import { navItemId } from '@shared/const/navItemId'
import { route } from '@shared/const/route'
import { instance } from '@shared/instance'
import { getState } from '@shared/lib/redux'
import type { NavItem } from '@shared/nav'
import { Burger } from '@shared/nav/ui/NavList/NavItem/Burger'
import { CiViewTable } from 'react-icons/ci'
import { FaRegFileImage, FaRegFilePdf } from 'react-icons/fa'
import {
  FaGripLines,
  FaRegRectangleList,
  FaRegShareFromSquare,
  FaUsersGear,
} from 'react-icons/fa6'
import { FiDollarSign, FiLogIn, FiLogOut, FiSave } from 'react-icons/fi'
import { HiOutlineBookOpen } from 'react-icons/hi2'
import { ImLink } from 'react-icons/im'
import {
  IoChevronBackOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
  IoText,
} from 'react-icons/io5'
import { PiFolderSimpleStarDuotone } from 'react-icons/pi'
import { RiAdminLine, RiFileExcel2Line, RiMenuAddFill } from 'react-icons/ri'
import { RxPerson } from 'react-icons/rx'
import { VscNewFile } from 'react-icons/vsc'

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
            data-testid='back icon'
            style={{ color: '#3bc3ff' }}
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
            id: navItemId.boqItem,
            name: 'Items',
            icon: <FaRegRectangleList />,
            isHidden: false,
            shortcut: ['control', 'shift', 'i'],
            func: insertBoqBlock,
          },
          {
            id: navItemId.boqRow,
            name: 'Row',
            icon: <FaGripLines />,
            isHidden: false,
            shortcut: ['control', 'shift', 'r'],
            func: insertBoqRow,
          },
          {
            id: navItemId.textItem,
            name: 'Text',
            icon: <IoText />,
            isHidden: false,
            shortcut: ['control', 'shift', 't'],
            func: insertTextBlock,
          },
          {
            id: navItemId.priceItem,
            name: 'Price',
            icon: <FiDollarSign />,
            isHidden: false,
            shortcut: ['control', 'shift', 'p'],
            func: insertPriceBlock,
          },
        ],
        tooltip: 'Insert block or row',
      },
      {
        id: navItemId.bookmarkList,
        icon: <PiFolderSimpleStarDuotone data-testid='bookmarks icon' />,
        isHidden: false,
        name: 'Bookmarks',
        link: route.bookmarkList,
        func: openBookmarksPage,
        tooltip: 'Your bookmarks',
      },
      {
        id: navItemId.quotationList,
        icon: <CiViewTable data-testid='quotations icon' />,
        isHidden: false,
        name: 'Quotations',
        link: route.quotationList,
        func: openQuotationsPage,
        tooltip: 'Your quotations',
      },
      {
        id: navItemId.blog,
        icon: <HiOutlineBookOpen data-testid='blog icon' />,
        isHidden: false,
        name: 'Blog',
        tooltip: 'Guides and resources',
        navItems: [
          {
            id: navItemId.blogHowToCreate,
            name: 'How to Create Quotations',
            isHidden: false,
            externalLink: '/blog/how-to-create-quotation.html',
            tooltip: 'Step-by-step guide',
          },
          {
            id: navItemId.blogFreeTemplate,
            name: 'Free Templates',
            isHidden: false,
            externalLink: '/blog/free-quotation-template.html',
            tooltip: 'Ready-to-use templates',
          },
          {
            id: navItemId.blogTermsAndConditions,
            name: 'Terms & Conditions',
            isHidden: false,
            externalLink: '/blog/quotation-terms-and-conditions.html',
            tooltip: 'Essential legal terms',
          },
        ],
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
                id: navItemId.quotationListAll,
                icon: <CiViewTable />,
                isHidden: false,
                name: 'Quotations',
                link: `/${route.quotationListAll}`,
              },
              {
                id: navItemId.bookmarkListAll,
                icon: <PiFolderSimpleStarDuotone />,
                isHidden: false,
                name: 'Bookmarks',
                link: `/${route.bookmarkListAll}`,
              },
              {
                id: navItemId.fileListAll,
                icon: <FaRegFileImage />,
                isHidden: false,
                name: 'Files',
                link: `/${route.fileListAll}`,
              },
              {
                id: navItemId.userList,
                icon: <FaUsersGear />,
                isHidden: false,
                name: 'Users',
                link: `/${route.userList}`,
              },
              {
                id: navItemId.visitors,
                icon: <IoStatsChartOutline />,
                isHidden: false,
                name: 'Visitors',
                link: `/${route.visitorList}`,
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

instance.navStructure = navStructure
