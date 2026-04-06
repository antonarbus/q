import { Burger } from '@front/entities/nav/ui/NavList/NavItem/Burger'
import { CiCreditCard1, CiViewTable } from 'react-icons/ci'
import { FaRegFileImage, FaRegFilePdf, FaRegStar } from 'react-icons/fa'
import { FaGripLines, FaRegRectangleList, FaRegShareFromSquare, FaUsersGear } from 'react-icons/fa6'
import { FiDollarSign, FiLogIn, FiLogOut, FiSave } from 'react-icons/fi'
import { HiOutlineBookOpen } from 'react-icons/hi2'
import { ImLink } from 'react-icons/im'
import {
  IoChevronBackOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
  IoText,
} from 'react-icons/io5'
import { LuBetweenHorizontalStart } from 'react-icons/lu'
import { RiAdminLine, RiFileExcel2Line } from 'react-icons/ri'
import { RxPerson } from 'react-icons/rx'
import { VscNewFile } from 'react-icons/vsc'

export const iconRegistry = {
  burger: <Burger />,
  back: <IoChevronBackOutline data-testid='back icon' style={{ color: '#3bc3ff' }} />,
  new: <VscNewFile data-testid='new icon' />,
  save: <FiSave data-testid='save icon' />,
  share: <FaRegShareFromSquare data-testid='share icon' />,
  link: <ImLink data-testid='link icon' />,
  pdf: <FaRegFilePdf data-testid='pdf icon' />,
  excel: <RiFileExcel2Line data-testid='excel icon' />,
  insert: <LuBetweenHorizontalStart data-testid='insert icon' />,
  boqItem: <FaRegRectangleList />,
  row: <FaGripLines />,
  textItem: <IoText />,
  priceItem: <FiDollarSign />,
  paymentItem: <CiCreditCard1 />,
  bookmarkList: <FaRegStar data-testid='bookmarks icon' />,
  quotationList: <CiViewTable data-testid='quotations icon' />,
  blog: <HiOutlineBookOpen data-testid='blog icon' />,
  login: <FiLogIn data-testid='login icon' />,
  profile: <RxPerson data-testid='profile icon' />,
  settings: <IoSettingsOutline />,
  admin: <RiAdminLine data-testid='admin icon' />,
  fileListAll: <FaRegFileImage />,
  userList: <FaUsersGear />,
  visitors: <IoStatsChartOutline />,
  logout: <FiLogOut />,
} as const

export type IconId = keyof typeof iconRegistry
