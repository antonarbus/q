import { createElement } from 'react'
import { nanoid as id } from 'nanoid'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { BiReset } from 'react-icons/bi'
import { IoDocumentOutline, IoDocumentsOutline, IoSaveOutline, IoShareOutline } from 'react-icons/io5'
import { IoIosSwap } from 'react-icons/io'
import logo from './img/logo.svg'
import { logoutUser } from 'client/features/credentials/logout'
import { Person as PersonIcon, Settings as SettingsIcon } from '@mui/icons-material'
import type { MenuLevel } from 'client/entities/nav'
import { resetToDefaultItems } from 'client/features/items'

const reactIcon = createElement(IoShareOutline, {})

export const navStructure: MenuLevel[] = [
  {
    id: 'top',
    name: 'top',
    menuItems: [
      {
        id: 'Offer',
        icon: <IoDocumentOutline />,
        name: 'Offer',
        menuItems: [
          {
            id: 'Previous offer',
            name: 'Previous offer',
            icon: <IoIosSwap />,
          },
          {
            id: 'Nested menu',
            name: 'Nested menu',
            icon: <IoIosSwap />,
            menuItems: [
              {
                id: 'item in menu 1',
                name: 'item in menu 1',
                icon: '😎',
                menuItems: [
                  {
                    id: id(5),
                    name: 'long long long long long long long long name',
                    icon: reactIcon,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: null,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: <img src={logo} />,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                  },
                ],
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
              },
            ],
          },
          {
            id: id(5),
            name: 'Reset to default offer',
            icon: <BiReset />,
            func: resetToDefaultItems,
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
          },
        ],
      },
      {
        id: 'Save',
        icon: <IoSaveOutline />,
        name: 'Save',
        link: '/linkA',
        shortcut: ['control', 'z'],
      },
      {
        id: 'Share',
        icon: <IoShareOutline />,
        name: 'Share',
        menuItems: [
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '😇',
            menuItems: [
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
                menuItems: [
                  {
                    id: id(5),
                    name: 'long long long long long long long long name',
                    icon: reactIcon,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: null,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: <img src={logo} />,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon,
                  },
                ],
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎',
              },
            ],
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: 'IC',
          },
          {
            id: id(5),
            name: 'link',
            link: '/',
            icon: '😇',
            shortcut: ['control', 'x'],
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '',
          },
          {
            id: id(5),
            name: 'func',
            func: () => alert('i am the function'),
            shortcut: ['control', 'c'],
          },
        ],
      },
      {
        id: 'Offers',
        icon: <IoDocumentsOutline />,
        name: 'Offers',
        link: '/linkB',
      },
      {
        id: 'logIn',
        icon: <FiLogIn />,
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
            name: 'Settings',
            link: '/settings',
          },
          {
            id: 'profile',
            icon: <PersonIcon />,
            name: 'Profile',
            link: '/profile',
          },
          {
            id: 'logOut',
            icon: <FiLogOut />,
            name: 'Log out',
            link: '/',
            func: logoutUser,
          },
        ],
      },
    ],
  },
]
