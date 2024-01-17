import { Person, Settings } from '@mui/icons-material'
import { nanoid } from 'nanoid'
import { createElement } from 'react'
import { BiReset } from 'react-icons/bi'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { IoIosSwap } from 'react-icons/io'
import { IoDocumentOutline, IoDocumentsOutline, IoSaveOutline, IoShareOutline } from 'react-icons/io5'
import { resetItems } from '@features/reset_items'
import type { MenuItemTypes } from '@entities/nav'
import { logoutUser } from '../credentials/logout'
import logo from './img/logo.svg'

const reactIcon = createElement(IoShareOutline, {})

export const navStructure: MenuItemTypes[] = [
  {
    id: 'top',
    name: 'top',
    isHidden: false,
    menuItems: [
      {
        id: 'Offer',
        icon: <IoDocumentOutline />,
        isHidden: false,
        name: 'Offer',
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
        id: 'Save',
        icon: <IoSaveOutline />,
        isHidden: false,
        name: 'Save',
        link: '/linkA',
        shortcut: ['control', 'z'],
      },
      {
        id: 'Share',
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
            link: '/',
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
        id: 'Offers',
        icon: <IoDocumentsOutline />,
        isHidden: false,
        name: 'Offers',
        link: '/linkB',
      },
      {
        id: 'logIn',
        icon: <FiLogIn />,
        isHidden: false,
        name: 'Log in',
        link: '/login',
      },
      {
        id: 'account',
        icon: <Person />,
        name: 'Account',
        isHidden: true,
        menuItems: [
          {
            id: 'settings',
            icon: <Settings />,
            isHidden: false,
            name: 'Settings',
            link: '/settings',
          },
          {
            id: 'profile',
            icon: <Person />,
            isHidden: false,
            name: 'Profile',
            link: '/profile',
          },
          {
            id: 'logOut',
            icon: <FiLogOut />,
            isHidden: false,
            name: 'Log out',
            link: '/',
            func: logoutUser,
          },
        ],
      },
    ],
  },
]
