import { useEffect, useMemo, useState } from 'react'
import { Avatar, Badge, Button, Dropdown, Grid, Layout, Menu, Space, Tag, Tooltip, Typography, theme as antdTheme } from 'antd'
import {
  BellOutlined,
  DesktopOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  ThunderboltFilled,
  UserOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLayoutStore, useResolvedTheme, type ThemeMode } from '@/shared/stores/layoutStore'
import { useLogout } from '@/features/auth/api/useAuth'
import { useUserInfo } from '@/shared/api/useUserInfo'
import { buildMenu, openKeysForPath } from '@/app/navigation'
import { getCurrentUser, getRoles } from '@/shared/lib/auth'
import { roleLabel } from '@/shared/types/roles'

const { Header, Sider, Content, Footer } = Layout

const THEME_ICONS: Record<ThemeMode, React.ReactNode> = {
  light: <SunOutlined />,
  dark: <MoonOutlined />,
  system: <DesktopOutlined />,
}

// Main app shell (old-ui VerticalLayout + Header). Menu is role-filtered + grouped
// from the nav config; header carries theme switch, fullscreen, notifications
// (unread support messages) and the profile menu — mirroring old-ui's topbar.
export function VerticalLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const screens = Grid.useBreakpoint()
  const collapsed = useLayoutStore(s => s.collapsed)
  const toggleCollapsed = useLayoutStore(s => s.toggleCollapsed)
  const themeMode = useLayoutStore(s => s.themeMode)
  const setThemeMode = useLayoutStore(s => s.setThemeMode)
  const resolved = useResolvedTheme()
  const { token } = antdTheme.useToken()
  const logout = useLogout()
  const { data: userInfo } = useUserInfo()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const roles = useMemo(() => getRoles(), [])
  const claims = useMemo(() => getCurrentUser(), [])
  const items = useMemo(() => buildMenu(roles, t), [roles, t])
  const [openKeys, setOpenKeys] = useState<string[]>(() => openKeysForPath(location.pathname))

  const fullName =
    [userInfo?.firstName, userInfo?.lastName].filter(Boolean).join(' ') ||
    String(claims?.name ?? 'کاربر')
  const unread = userInfo?.countUnreadMessage ?? 0

  useEffect(() => {
    setOpenKeys(prev => Array.from(new Set([...prev, ...openKeysForPath(location.pathname)])))
  }, [location.pathname])

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen()
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        breakpoint="lg"
        collapsedWidth={screens.xs ? 0 : 80}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'auto' }}
      >
        <div
          style={{
            height: 48,
            margin: 16,
            color: '#fff',
            fontWeight: 700,
            textAlign: 'center',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <ThunderboltFilled style={{ fontSize: 22, color: '#ffd666' }} />
          {!collapsed && <span>{t('app.title')}</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={keys => setOpenKeys(keys as string[])}
          onClick={({ key }) => {
            if (key.startsWith('/')) navigate(key)
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 16px',
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <Button
            type="text"
            aria-label="باز و بسته کردن منو"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
          />

          {screens.md && (
            <div style={{ lineHeight: 1.3, marginInlineStart: 4 }}>
              <Typography.Text strong style={{ display: 'block', fontSize: 14 }}>
                دفتر اجرایی نظارت برق استان کردستان
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                سامانه مدیریت پروژه‌های برق
              </Typography.Text>
            </div>
          )}

          <div style={{ flex: 1 }} />

          <Space size={screens.md ? 8 : 4}>
            <Dropdown
              trigger={['click']}
              menu={{
                selectedKeys: [themeMode],
                items: [
                  { key: 'light', icon: <SunOutlined />, label: 'حالت روشن' },
                  { key: 'dark', icon: <MoonOutlined />, label: 'حالت تیره' },
                  { key: 'system', icon: <DesktopOutlined />, label: 'همگام با سیستم' },
                ],
                onClick: ({ key }) => setThemeMode(key as ThemeMode),
              }}
            >
              <Button
                type="text"
                aria-label="تغییر پوسته"
                icon={themeMode === 'system' ? THEME_ICONS.system : THEME_ICONS[resolved]}
              />
            </Dropdown>

            {screens.sm && (
              <Tooltip title={isFullscreen ? 'خروج از تمام‌صفحه' : 'تمام‌صفحه'}>
                <Button
                  type="text"
                  aria-label="تمام صفحه"
                  icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                  onClick={toggleFullscreen}
                />
              </Tooltip>
            )}

            <Tooltip title="پیام‌های پشتیبانی">
              <Badge count={unread} size="small" offset={[2, 6]}>
                <Button
                  type="text"
                  aria-label={`پیام‌های خوانده‌نشده: ${unread}`}
                  icon={<BellOutlined />}
                  onClick={() => navigate('/support')}
                />
              </Badge>
            </Tooltip>

            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 'who',
                    disabled: true,
                    label: (
                      <div style={{ padding: '4px 0' }}>
                        <Typography.Text strong style={{ display: 'block' }}>
                          {fullName}
                        </Typography.Text>
                        <Space size={4} wrap>
                          {roles.map(r => (
                            <Tag key={r} color="green" style={{ marginInlineEnd: 0 }}>
                              {roleLabel(r)}
                            </Tag>
                          ))}
                        </Space>
                      </div>
                    ),
                  },
                  { type: 'divider' },
                  { key: '/profile', icon: <UserOutlined />, label: t('menu.profile') },
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    danger: true,
                    label: t('common.logout'),
                  },
                ],
                onClick: ({ key }) => {
                  if (key === 'logout') logout.mutate()
                  else if (key.startsWith('/')) navigate(key)
                },
              }}
            >
              <Button type="text" aria-label="منوی کاربر" style={{ height: 48, padding: '0 6px' }}>
                <Space size={8}>
                  <Avatar
                    size={34}
                    src={userInfo?.avatar || undefined}
                    style={{ backgroundColor: token.colorPrimary }}
                  >
                    {fullName.charAt(0)}
                  </Avatar>
                  {screens.md && (
                    <span style={{ lineHeight: 1.2, textAlign: 'start' }}>
                      <Typography.Text strong style={{ display: 'block', fontSize: 13 }}>
                        {fullName}
                      </Typography.Text>
                      <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                        {roles.map(roleLabel).join('، ') || '—'}
                      </Typography.Text>
                    </span>
                  )}
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ margin: screens.md ? 16 : 8 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', padding: '12px 16px' }}>
          {t('app.title')} © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}
