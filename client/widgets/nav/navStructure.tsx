import { Person, Settings } from '@mui/icons-material'
import { createElement } from 'react'
import { BiReset } from 'react-icons/bi'
import { BsFiletypePdf } from 'react-icons/bs'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { IoIosSwap } from 'react-icons/io'
import { IoDocumentOutline, IoDocumentsOutline, IoSaveOutline, IoShareOutline } from 'react-icons/io5'
import { downloadPdf } from '@features/download_pdf'
import { logout } from '@features/log_out'
import { resetItems } from '@features/reset_items'
import { saveQuotation } from '@features/save_quotation'
import type { MenuItemTypes } from '@entities/nav'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import logo from './logo.svg'

const reactIcon = createElement(IoShareOutline, {})

export const navStructure: MenuItemTypes[] = [
  {
    id: navMenuItemId.top,
    name: 'top',
    isHidden: false,
    menuItems: [
      {
        id: navMenuItemId.quotation,
        icon: <IoDocumentOutline />,
        isHidden: false,
        name: 'Quotation',
        menuItems: [
          {
            id: 'Previous offer',
            name: 'Previous offer',
            icon: <IoIosSwap />,
            isHidden: false,
          },
          {
            id: 'Nested menu',
            name: 'Nested menu',
            icon: <IoIosSwap />,
            isHidden: false,
            menuItems: [
              {
                id: 'item in menu 1',
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
                menuItems: [
                  {
                    id: nanoid(3),
                    name: 'long long long long long long long long name',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: null,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: <img src={logo} />,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                ],
              },
              {
                id: nanoid(3),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
              },
              {
                id: nanoid(3),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
              },
            ],
          },
          {
            id: nanoid(3),
            name: 'Reset to default offer',
            icon: <BiReset />,
            isHidden: false,
            func: resetItems,
          },
          {
            id: nanoid(3),
            name: 'hidden menu',
            icon: '',
            isHidden: true,
          },
          {
            id: nanoid(3),
            name: 'not hidden menu',
            icon: '😇',
            isHidden: false,
          },
        ],
      },
      {
        id: navMenuItemId.save,
        icon: <IoSaveOutline />,
        isHidden: false,
        name: 'Save',
        func: () => {
          void saveQuotation()
        },
        shortcut: ['control', 'z'],
      },
      {
        id: navMenuItemId.pdf,
        icon: <BsFiletypePdf />,
        isHidden: false,
        name: 'Pdf',
        func: () => {
          void downloadPdf()
        },
      },
      {
        id: navMenuItemId.share,
        icon: <IoShareOutline />,
        isHidden: false,
        name: 'Share',
        menuItems: [
          {
            id: nanoid(3),
            name: 'item in menu 1',
            icon: '😇',
            isHidden: false,
            menuItems: [
              {
                id: nanoid(3),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
                menuItems: [
                  {
                    id: nanoid(3),
                    name: 'long long long long long long long long name',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: null,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: <img src={logo} />,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: nanoid(3),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                ],
              },
              {
                id: nanoid(3),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
              },
              {
                id: nanoid(3),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
              },
            ],
          },
          {
            id: nanoid(3),
            name: 'item in menu 1',
            icon: 'IC',
            isHidden: false,
          },
          {
            id: nanoid(3),
            name: 'link',
            link: route.root,
            icon: '😇',
            isHidden: false,
            shortcut: ['control', 'x'],
          },
          {
            id: nanoid(3),
            name: 'item in menu 1',
            icon: '',
            isHidden: false,
          },
          {
            id: nanoid(3),
            name: 'func',
            func: (): void => {
              alert('i am the function')
            },
            shortcut: ['control', 'c'],
            isHidden: false,
          },
        ],
      },
      {
        id: navMenuItemId.quotations,
        icon: <IoDocumentsOutline />,
        isHidden: false,
        name: 'Quotations',
        link: route.quotations,
      },
      {
        id: navMenuItemId.login,
        icon: <FiLogIn />,
        isHidden: false,
        name: 'Log in',
        link: route.login,
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
            link: route.root,
            func: logout,
          },
        ],
      },
    ],
  },
]
