import { createElement } from 'react'
import { nanoid as id } from 'nanoid'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { BiReset } from 'react-icons/bi'
import { IoDocumentOutline, IoDocumentsOutline, IoSaveOutline, IoShareOutline } from 'react-icons/io5'
import { IoIosSwap } from 'react-icons/io'
import logo from './img/logo.svg'
import { Person as PersonIcon, Settings as SettingsIcon } from '@mui/icons-material'
import type { TNavItem } from 'client/entities/nav'
import { logoutUser } from '../credentials/logout'
import { resetItems } from 'client/features/reset_items'

const reactIcon = createElement(IoShareOutline, {})

export const navStructure: TNavItem[] = [
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
                    id: id(5),
                    name: 'long long long long long long long long name',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: null,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: <img src={logo} />,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                ],
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
              },
            ],
          },
          {
            id: id(5),
            name: 'Reset to default offer',
            icon: <BiReset />,
            isHidden: false,
            func: resetItems,
          },
          {
            id: id(5),
            name: 'hidden menu',
            icon: '',
            isHidden: true,
          },
          {
            id: id(5),
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
            id: id(5),
            name: 'item in menu 1',
            icon: '😇',
            isHidden: false,
            menuItems: [
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
                menuItems: [
                  {
                    id: id(5),
                    name: 'long long long long long long long long name',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: null,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: <img src={logo} />,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                    isHidden: false,
                  },
                ],
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                isHidden: false,
              },
            ],
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: 'IC',
            isHidden: false,
          },
          {
            id: id(5),
            name: 'link',
            link: '/',
            icon: '😇',
            isHidden: false,
            shortcut: ['control', 'x'],
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '',
            isHidden: false,
          },
          {
            id: id(5),
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
        icon: <PersonIcon />,
        name: 'Account',
        isHidden: true,
        menuItems: [
          {
            id: 'settings',
            icon: <SettingsIcon />,
            isHidden: false,
            name: 'Settings',
            link: '/settings',
          },
          {
            id: 'profile',
            icon: <PersonIcon />,
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
