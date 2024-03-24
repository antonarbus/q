import { Person, Settings } from '@mui/icons-material'
import { createElement } from 'react'
import { BsFiletypePdf } from 'react-icons/bs'
import { CiViewTable } from 'react-icons/ci'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { IoSaveOutline, IoShareOutline } from 'react-icons/io5'
import { VscNewFile } from 'react-icons/vsc'
import { openLogin } from '@features/auth/log_in'
import { logOut } from '@features/auth/log_out'
import { createNewQuotation } from '@features/quotation/create_new_quotation'
import { downloadPdf } from '@features/quotation/download_pdf'
import { saveQuotation } from '@features/quotation/save_quotation'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import type { MenuItemTypes } from '@shared/nav'
import logo from './logo.svg'

const reactIcon = createElement(IoShareOutline, {})

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
      },
      {
        id: navMenuItemId.save,
        icon: <IoSaveOutline />,
        isHidden: false,
        name: 'Save',
        disabled: true,
        shortcut: ['control', 's'],
        func: () => {
          void saveQuotation()
        },
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
        id: navMenuItemId.share,
        icon: <IoShareOutline />,
        isHidden: false,
        name: 'Share',
        disabled: true,
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
        link: route.login,
        func: openLogin,
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
            func: logOut,
          },
        ],
      },
    ],
  },
]
