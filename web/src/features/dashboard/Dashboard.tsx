import { useMemo } from 'react'
import {
  Alert,
  Avatar,
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Space,
  Spin,
  Tag,
  Typography,
  theme as antdTheme,
} from 'antd'
import {
  CustomerServiceOutlined,
  FileDoneOutlined,
  RightOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import { MotionConfig, motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { navItems } from '@/app/navigation'
import { VOLT } from '@/app/theme'
import { useUserInfo } from '@/shared/api/useUserInfo'
import { useDashboardToken } from '@/features/dashboard/api/useDashboard'
import { getCurrentUser, getRoles } from '@/shared/lib/auth'
import { useResolvedTheme } from '@/shared/stores/layoutStore'
import { Role, roleLabel } from '@/shared/types/roles'

const { Title, Text } = Typography

// Same announcements as old-ui pages/Dashboard.
const ANNOUNCEMENTS = [
  'همکاران محترم تازه‌وارد که موفق به اخذ گواهینامه بازرسی برق اماکن شده‌اند مدارک مورد نیاز از جمله کارت ملی، پروانه، مهر و امضا، گواهینامه بازرسی و فرم دوره کارآموزی را در قسمت «فایلهای من» بارگذاری نموده، سپس در قسمت پشتیبانی درخواست خود را به مدیریت ارسال فرمایند.',
  'همکاران محترمی که قصد تغییر صلاحیت در ۶ ماهه « اردیبهشت تا آبان ماه» ۱۴۰۴ را دارند درخواست خود را در قسمت پشتیبانی به مدیریت ارسال فرمایند.',
  'همکاران محترمی که پروانه خود را تمدید کرده یا ارتقا پایه دریافت کرده‌اند در قسمت پشتیبانی ضمن پیوست کردن فایل پروانه جدید به مدیریت ارسال فرمایند.',
]

const rial = (n: number) => `${Math.round(n).toLocaleString('en-US')} ریال`

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'صبح بخیر'
  if (h < 17) return 'ظهر بخیر'
  if (h < 20) return 'عصر بخیر'
  return 'شب بخیر'
}

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay: i * 0.06 },
})

// Role-aware dashboard: welcome hero + real KPIs (GetUserInfo) + quick actions
// (role-filtered nav) + announcements + Metabase embed for Administrators.
export function Dashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const resolved = useResolvedTheme()
  const { token } = antdTheme.useToken()

  const roles = useMemo(() => getRoles(), [])
  const claims = useMemo(() => getCurrentUser(), [])
  const isAdmin = roles.includes(Role.Administrator)
  const isMoneyRole =
    roles.includes(Role.Engineer) || roles.includes(Role.Accountant) || isAdmin

  const { data: userInfo, isLoading: infoLoading } = useUserInfo()
  // old-ui: Administrator → Metabase dashboard id 34.
  const { data: mb, isFetching: mbFetching } = useDashboardToken(34, isAdmin)

  const fullName =
    [userInfo?.firstName, userInfo?.lastName].filter(Boolean).join(' ') ||
    String(claims?.name ?? 'کاربر')
  const unread = userInfo?.countUnreadMessage ?? 0
  const invoiceSum = userInfo?.sumAmountEngInvoice ?? 0
  const paymentSum = userInfo?.sumAmountEngPayment ?? 0
  const showMoney = isMoneyRole && (invoiceSum > 0 || paymentSum > 0)

  const today = useMemo(
    () => new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full' }).format(new Date()),
    [],
  )

  // Quick actions = this user's reachable screens (leaf nav items), minus the dashboard.
  const quickActions = useMemo(
    () =>
      navItems.filter(
        i => i.path && i.path !== '/dashboard' && !i.hide && i.roles.some(r => roles.includes(r)),
      ),
    [roles],
  )

  const dark = resolved === 'dark'
  const heroBg = dark
    ? 'linear-gradient(135deg, #0d1930 0%, #123a75 60%, #17509e 100%)'
    : 'linear-gradient(135deg, #0a2540 0%, #0958d9 60%, #1677ff 100%)'

  const kpis = [
    {
      key: 'unread',
      show: true,
      icon: <CustomerServiceOutlined />,
      color: VOLT,
      label: 'پیام‌های خوانده‌نشده پشتیبانی',
      value: String(unread),
      onClick: () => navigate('/support'),
    },
    {
      key: 'invoice',
      show: showMoney,
      icon: <FileDoneOutlined />,
      color: token.colorPrimary,
      label: 'مجموع فاکتور کارشناسی',
      value: rial(invoiceSum),
      onClick: () => navigate('/accounting'),
    },
    {
      key: 'payment',
      show: showMoney,
      icon: <WalletOutlined />,
      color: '#52c41a',
      label: 'مجموع پرداختی',
      value: rial(paymentSum),
      onClick: () => navigate('/accounting'),
    },
  ].filter(k => k.show)

  const chartOption = useMemo(
    () => ({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: (v: number) => rial(Number(v)),
      },
      grid: { left: 8, right: 60, top: 8, bottom: 8, containLabel: true },
      xAxis: {
        type: 'value',
        axisLabel: { color: token.colorTextSecondary },
        splitLine: { lineStyle: { color: token.colorBorderSecondary } },
      },
      yAxis: {
        type: 'category',
        data: ['فاکتور', 'پرداختی'],
        axisLabel: { color: token.colorText },
      },
      series: [
        {
          type: 'bar',
          barWidth: 22,
          data: [
            { value: invoiceSum, itemStyle: { color: token.colorPrimary, borderRadius: [0, 6, 6, 0] } },
            { value: paymentSum, itemStyle: { color: '#52c41a', borderRadius: [0, 6, 6, 0] } },
          ],
          label: {
            show: true,
            position: 'right',
            color: token.colorTextSecondary,
            formatter: ({ value }: { value: number }) => Math.round(Number(value)).toLocaleString('en-US'),
          },
        },
      ],
    }),
    [invoiceSum, paymentSum, token],
  )

  return (
    <MotionConfig reducedMotion="user">
      <Space direction="vertical" size={16} style={{ width: '100%', display: 'flex' }}>
        {/* Hero */}
        <motion.div {...fadeUp(0)}>
          <Card
            styles={{ body: { padding: '20px 24px' } }}
            style={{ background: heroBg, border: 'none' }}
          >
            <Row align="middle" gutter={[16, 12]} wrap>
              <Col flex="none">
                <Avatar
                  size={56}
                  src={userInfo?.avatar || undefined}
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 22 }}
                >
                  {fullName.charAt(0)}
                </Avatar>
              </Col>
              <Col flex="auto">
                {infoLoading ? (
                  <Skeleton active paragraph={false} title={{ width: 200 }} />
                ) : (
                  <>
                    <Title level={4} style={{ color: '#fff', margin: 0 }}>
                      {greeting()}، {fullName}
                    </Title>
                    <Space size={6} wrap style={{ marginTop: 6 }}>
                      {roles.map(r => (
                        <Tag key={r} color="rgba(255,255,255,0.18)" style={{ color: '#fff', border: 'none' }}>
                          {roleLabel(r)}
                        </Tag>
                      ))}
                    </Space>
                  </>
                )}
              </Col>
              <Col flex="none">
                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{today}</Text>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* KPIs (real data from GetUserInfo) */}
        <Row gutter={[16, 16]}>
          {kpis.map((k, i) => (
            <Col xs={24} sm={12} lg={8} key={k.key}>
              <motion.div {...fadeUp(1 + i)}>
                <Card
                  hoverable
                  onClick={k.onClick}
                  styles={{ body: { padding: 20 } }}
                  style={{ cursor: 'pointer' }}
                >
                  {infoLoading ? (
                    <Skeleton active paragraph={{ rows: 1 }} title={false} />
                  ) : (
                    <Space size={14} align="center">
                      <Avatar
                        shape="square"
                        size={44}
                        icon={k.icon}
                        style={{ backgroundColor: `${k.color}1a`, color: k.color, borderRadius: 10 }}
                      />
                      <span>
                        <Text type="secondary" style={{ display: 'block', fontSize: 13 }}>
                          {k.label}
                        </Text>
                        <Text strong style={{ fontSize: 18 }}>
                          {k.value}
                        </Text>
                      </span>
                    </Space>
                  )}
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Engineer/Accountant: invoice vs payment (real sums) */}
        {showMoney && (
          <motion.div {...fadeUp(2)}>
            <Card title="فاکتور در برابر پرداختی" styles={{ body: { padding: '8px 16px' } }}>
              <ReactECharts option={chartOption} style={{ height: 140 }} notMerge />
            </Card>
          </motion.div>
        )}

        {/* Quick actions — the user's own screens */}
        <motion.div {...fadeUp(3)}>
          <Card title="دسترسی سریع" styles={{ body: { padding: 16 } }}>
            {quickActions.length === 0 ? (
              <Empty description="دسترسی فعالی یافت نشد" />
            ) : (
              <Row gutter={[12, 12]}>
                {quickActions.map(a => (
                  <Col xs={12} sm={8} md={6} lg={4} key={a.id}>
                    <Card
                      hoverable
                      size="small"
                      onClick={() => navigate(a.path!)}
                      styles={{ body: { padding: '14px 8px', textAlign: 'center' } }}
                      style={{ cursor: 'pointer', height: '100%' }}
                    >
                      <div style={{ fontSize: 22, color: token.colorPrimary, marginBottom: 8 }}>
                        {a.icon}
                      </div>
                      <Text style={{ fontSize: 12.5 }}>{t(a.titleKey)}</Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </motion.div>

        {/* Announcements */}
        <motion.div {...fadeUp(4)}>
          <Card
            title="اطلاعیه‌ها"
            styles={{ body: { padding: 16, display: 'flex', flexDirection: 'column', gap: 12 } }}
          >
            {ANNOUNCEMENTS.map(text => (
              <Alert key={text.slice(0, 24)} type="info" showIcon message={text} />
            ))}
          </Card>
        </motion.div>

        {/* Administrator: Metabase analytics */}
        {isAdmin && (
          <motion.div {...fadeUp(5)}>
            <Card
              title="داشبورد تحلیلی"
              extra={<RightOutlined style={{ color: token.colorTextTertiary }} />}
              styles={{ body: { padding: mb?.iframeUrl ? 0 : 24 } }}
            >
              {mb?.iframeUrl ? (
                <iframe
                  src={mb.iframeUrl}
                  title="Metabase Dashboard"
                  style={{ width: '100%', height: 800, border: 'none', display: 'block' }}
                />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  {mbFetching ? (
                    <Spin tip="در حال بارگذاری داشبورد..." />
                  ) : (
                    <Empty description="داشبوردی موجود نیست" />
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </Space>
    </MotionConfig>
  )
}
