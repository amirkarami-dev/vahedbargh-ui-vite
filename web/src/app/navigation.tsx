import type { ReactNode } from 'react'
import type { MenuProps } from 'antd'
import {
  AppstoreOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  ControlOutlined,
  ThunderboltOutlined,
  WalletOutlined,
  BarChartOutlined,
  FileTextOutlined,
  DollarOutlined,
  UserOutlined,
  GlobalOutlined,
  NotificationOutlined,
  CalendarOutlined,
  FolderOpenOutlined,
  LineChartOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { Role } from '@/shared/types/roles'

export type NavItem = {
  id: number
  parentId: number | null
  titleKey: string
  icon: ReactNode
  path?: string
  roles: string[]
  hide?: boolean
}

const ALL: string[] = Object.values(Role)

// Mirrors old-ui/src/routes/allRoutes.js userRoutes: grouping via parentId,
// per-item roles, and the `hide` flag. Add entries here as screens are migrated.
export const navItems: NavItem[] = [
  {
    id: 1001,
    parentId: null,
    titleKey: 'menu.dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
    roles: ALL,
  },
  {
    id: 1002,
    parentId: null,
    titleKey: 'menu.baseInfo',
    icon: <SettingOutlined />,
    roles: [Role.Administrator, Role.Accountant, Role.Section],
  },
  {
    id: 100201,
    parentId: 1002,
    titleKey: 'menu.engineers',
    icon: <TeamOutlined />,
    path: '/BaseInfo/ExeEng',
    roles: [Role.Administrator, Role.Accountant, Role.Section],
  },
  {
    id: 1003,
    parentId: null,
    titleKey: 'menu.projects',
    icon: <AppstoreOutlined />,
    roles: [
      Role.Administrator,
      Role.Engineer,
      Role.PanelMaker,
      Role.ElectAdmin,
      Role.Section,
      Role.Employee,
    ],
  },
  {
    id: 100303,
    parentId: 1003,
    titleKey: 'menu.electProjects',
    icon: <ThunderboltOutlined />,
    path: '/projects/ElectProjects',
    roles: [Role.Administrator, Role.Section, Role.Employee],
  },
  {
    id: 100301,
    parentId: 1003,
    titleKey: 'menu.newProject',
    icon: <AppstoreOutlined />,
    path: '/projects/create',
    roles: [Role.Administrator, Role.Section],
  },
  {
    id: 100302,
    parentId: 1003,
    titleKey: 'menu.createProject',
    icon: <AppstoreOutlined />,
    path: '/projects/CreateProject',
    roles: [Role.ElectAdmin],
  },
  {
    id: 100304,
    parentId: 1003,
    titleKey: 'menu.electProjects',
    icon: <ThunderboltOutlined />,
    path: '/projects/ElectProjectsEdc',
    roles: [Role.ElectAdmin],
  },
  {
    id: 100310,
    parentId: 1003,
    titleKey: 'menu.electProjectsPanel',
    icon: <ThunderboltOutlined />,
    path: '/projects/ElectProjectsPanelMaker',
    roles: [Role.PanelMaker],
  },
  {
    id: 100305,
    parentId: 1003,
    titleKey: 'menu.electProjectProcessEng',
    icon: <ThunderboltOutlined />,
    path: '/projects/ElectProjectProcessEng',
    roles: [Role.Engineer],
  },
  {
    id: 100306,
    parentId: 1003,
    titleKey: 'menu.electProjectProcessEdc',
    icon: <ThunderboltOutlined />,
    path: '/projects/ElectProjectProcessEdc',
    roles: [Role.ElectAdmin],
  },
  {
    id: 100307,
    parentId: 1003,
    titleKey: 'menu.electProjectProcess',
    icon: <ThunderboltOutlined />,
    path: '/projects/ElectProjectProcess',
    roles: [Role.Administrator, Role.Section],
  },
  {
    id: 100308,
    parentId: 1003,
    titleKey: 'menu.electProjectProcessList',
    icon: <ThunderboltOutlined />,
    path: '/projects/ElectProjectProcessList',
    roles: [Role.Administrator, Role.Section],
  },
  {
    id: 1004,
    parentId: null,
    titleKey: 'menu.engWork',
    icon: <ControlOutlined />,
    path: '/EngWork',
    roles: [Role.Administrator, Role.Engineer, Role.Employee, Role.Accountant],
  },
  {
    id: 1006,
    parentId: null,
    titleKey: 'menu.accounting',
    icon: <WalletOutlined />,
    path: '/accounting',
    roles: [Role.Administrator, Role.Engineer, Role.Accountant, Role.Section],
  },
  {
    id: 1008,
    parentId: null,
    titleKey: 'menu.support',
    icon: <CustomerServiceOutlined />,
    path: '/support',
    roles: [Role.Administrator, Role.Engineer, Role.Employee, Role.Accountant],
  },
  {
    id: 1011,
    parentId: null,
    titleKey: 'menu.engPayment',
    icon: <DollarOutlined />,
    path: '/accounting/EngPayment',
    roles: [Role.Accountant],
  },
  {
    id: 1007,
    parentId: null,
    titleKey: 'menu.myFiles',
    icon: <FileTextOutlined />,
    path: '/userFile',
    roles: [Role.Administrator, Role.Engineer, Role.PanelMaker, Role.ElectAdmin, Role.Section],
  },
  {
    id: 1008,
    parentId: null,
    titleKey: 'menu.users',
    icon: <UserOutlined />,
    path: '/users',
    roles: [Role.Administrator],
  },
  {
    id: 1009,
    parentId: null,
    titleKey: 'menu.reports',
    icon: <BarChartOutlined />,
    roles: [Role.Administrator, Role.Accountant, Role.Engineer],
  },
  {
    id: 100901,
    parentId: 1009,
    titleKey: 'menu.reportProjects',
    icon: <FileTextOutlined />,
    path: '/reports/electProjects',
    roles: [Role.Administrator],
  },
  {
    id: 100902,
    parentId: 1009,
    titleKey: 'menu.reportEngInvoices',
    icon: <FileTextOutlined />,
    path: '/reports/engInvoices',
    roles: [Role.Accountant],
  },
  {
    id: 100903,
    parentId: 1009,
    titleKey: 'menu.reportEngineers',
    icon: <FileTextOutlined />,
    path: '/reports/engReports',
    roles: [Role.Engineer],
  },
  // Landing site content management (Administrator only).
  {
    id: 1012,
    parentId: null,
    titleKey: 'menu.landingCms',
    icon: <GlobalOutlined />,
    roles: [Role.Administrator],
  },
  {
    id: 101201,
    parentId: 1012,
    titleKey: 'menu.cmsAnnouncements',
    icon: <NotificationOutlined />,
    path: '/admin/landing/announcements',
    roles: [Role.Administrator],
  },
  {
    id: 101202,
    parentId: 1012,
    titleKey: 'menu.cmsMeetings',
    icon: <CalendarOutlined />,
    path: '/admin/landing/meetings',
    roles: [Role.Administrator],
  },
  {
    id: 101203,
    parentId: 1012,
    titleKey: 'menu.cmsDocuments',
    icon: <FolderOpenOutlined />,
    path: '/admin/landing/documents',
    roles: [Role.Administrator],
  },
  {
    id: 101204,
    parentId: 1012,
    titleKey: 'menu.cmsStats',
    icon: <LineChartOutlined />,
    path: '/admin/landing/stats',
    roles: [Role.Administrator],
  },
  {
    id: 101205,
    parentId: 1012,
    titleKey: 'menu.cmsContact',
    icon: <MailOutlined />,
    path: '/admin/landing/contact',
    roles: [Role.Administrator],
  },
]

type MenuItem = Required<MenuProps>['items'][number]

const allowed = (item: NavItem, roles: string[]) =>
  !item.hide && item.roles.some(r => roles.includes(r))

// Build role-filtered antd Menu items, grouped by parentId (one level, like old-ui getUserMenu).
export function buildMenu(roles: string[], t: (k: string) => string): MenuItem[] {
  return navItems
    .filter(i => i.parentId === null && allowed(i, roles))
    .map(top => {
      const children = navItems.filter(i => i.parentId === top.id && allowed(i, roles))
      if (children.length > 0) {
        return {
          key: `g${top.id}`,
          icon: top.icon,
          label: t(top.titleKey),
          children: children.map(c => ({
            key: c.path as string,
            icon: c.icon,
            label: t(c.titleKey),
          })),
        }
      }
      return { key: (top.path ?? `g${top.id}`) as string, icon: top.icon, label: t(top.titleKey) }
    })
}

// Which submenu key(s) to open for the active path.
export function openKeysForPath(path: string): string[] {
  const leaf = navItems.find(i => i.path === path)
  return leaf?.parentId ? [`g${leaf.parentId}`] : []
}
