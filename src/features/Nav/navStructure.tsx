import React from 'react'
import { nanoid as id } from 'nanoid'
import { FiLogOut, FiLogIn } from 'react-icons/fi'
import { IoDocumentOutline, IoDocumentsOutline, IoSaveOutline, IoShareOutline } from 'react-icons/io5'
import { IoIosSwap } from 'react-icons/io'
import logo from '@features/temp/Dummy/logo.svg'
import { logoutUser } from '@features/credentials/logout'

const reactIcon = React.createElement(IoShareOutline, {})

export type MenuType = {
  id: string
  icon?: React.ReactNode | string
  name: string
  link?: any
  func?: () => void,
  shortcut?: string[],
  menuItems?: MenuType[],
  isHidden?: boolean
}

export const navStructure: MenuType[] = [
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
            icon: <IoIosSwap />
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
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: null
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: <img src={logo} />
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  }
                ]
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎'
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎'
              }
            ]
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: '😇'
          },
          {
            id: id(5),
            name: 'hidden menu',
            icon: '',
            isHidden: true
          },
          {
            id: id(5),
            name: 'not hidden menu',
            icon: '😇'
          }
        ]
      },
      {
        id: 'Save',
        icon: <IoSaveOutline />,
        name: 'Save',
        link: '/linkA',
        shortcut: ['control', 'z']
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
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: null
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: <img src={logo} />
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  },
                  {
                    id: id(5),
                    name: 'item in menu 1',
                    icon: reactIcon
                  }
                ]
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎'
              },
              {
                id: id(5),
                name: 'item in menu 1',
                icon: '😎'
              }
            ]
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: 'IC'
          },
          {
            id: id(5),
            name: 'link',
            link: '/',
            icon: '😇',
            shortcut: ['control', 'x']
          },
          {
            id: id(5),
            name: 'item in menu 1',
            icon: ''
          },
          {
            id: id(5),
            name: 'func',
            func: () => alert('i am the function'),
            shortcut: ['control', 'c']
          }
        ]
      },
      {
        id: 'Offers',
        icon: <IoDocumentsOutline />,
        name: 'Offers',
        link: '/linkB'
      },
      {
        id: 'signIn',
        icon: <FiLogIn />,
        name: 'Sign in',
        link: '/login'
      },
      {
        id: 'signUp',
        icon: <FiLogIn />,
        name: 'Sign up',
        link: '/register'
      },
      {
        id: 'signOut',
        icon: <FiLogOut />,
        name: 'Sign out',
        // link: '/logout',
        func: logoutUser
      }
    ]
  }
]
