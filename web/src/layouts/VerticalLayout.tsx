import { Button, Layout, Menu, theme as antdTheme } from 'antd'
import {
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLayoutStore } from '@/shared/stores/layoutStore'
import { useLogout } from '@/features/auth/api/useAuth'

const { Header, Sider, Content, Footer } = Layout

// Main app shell. Rebuild of old-ui VerticalLayout using antd Layout + Menu.
export function VerticalLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const collapsed = useLayoutStore(s => s.collapsed)
  const toggleCollapsed = useLayoutStore(s => s.toggleCollapsed)
  const { token } = antdTheme.useToken()
  const logout = useLogout()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div
          style={{
            height: 48,
            margin: 16,
            color: '#fff',
            fontWeight: 700,
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {collapsed ? '⚡' : t('app.title')}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            { key: '/dashboard', icon: <DashboardOutlined />, label: t('menu.dashboard') },
            { key: '/BaseInfo/ExeEng', icon: <TeamOutlined />, label: t('menu.engineers') },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            background: token.colorBgContainer,
          }}
        >
          <Button
            type="text"
            aria-label="toggle menu"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
          />
          <div style={{ flex: 1 }} />
          <Button
            type="text"
            icon={<LogoutOutlined />}
            loading={logout.isPending}
            onClick={() => logout.mutate()}
          >
            {t('common.logout')}
          </Button>
        </Header>
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {t('app.title')} © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}
