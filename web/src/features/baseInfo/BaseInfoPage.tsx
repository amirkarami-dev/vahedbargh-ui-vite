import { Breadcrumb, Card, Space, Tabs, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { EngineersPage } from '@/features/engineers/EngineersPage'

// Route component for /BaseInfo/ExeEng (old-ui pages/BaseInfo/index.js):
// header + breadcrumb + tabs. Engineers is the first (only migrated) tab.
export function BaseInfoPage() {
  const { t } = useTranslation()

  return (
    <div>
      <Card variant="borderless">
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Breadcrumb items={[{ title: t('menu.baseInfo') }, { title: 'لیست کارشناسان' }]} />
          <Typography.Title level={4} style={{ margin: 0 }}>
            اطلاعات پایه
          </Typography.Title>
        </Space>
      </Card>

      <Card variant="borderless" style={{ marginTop: 16 }}>
        <Tabs
          defaultActiveKey="engineers"
          items={[{ key: 'engineers', label: 'لیست کارشناسان', children: <EngineersPage /> }]}
        />
      </Card>
    </div>
  )
}
