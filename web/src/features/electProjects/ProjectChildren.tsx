import { Card, Col, Divider, Empty, Row, Space, Spin, Tag, Typography } from 'antd'
import { useElectProjectChildren } from '@/features/electProjects/api/useElectProjects'
import type { ElectProject } from '@/features/electProjects/types'

const { Text } = Typography
const rial = (n?: number) => `${Math.abs(Math.round(Number(n ?? 0))).toLocaleString('en-US')}`

// Sub-projects of a parent, rendered as cards (old-ui renderParentRow). Loaded lazily.
export function ProjectChildren({ parent }: { parent: ElectProject }) {
  const { data, isFetching } = useElectProjectChildren(parent.id)
  const children = (data?.data ?? []).filter(c => c.parentId === parent.id)

  if (isFetching && children.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }
  if (children.length === 0) {
    return <Empty description="هیچ زیر پرونده‌ای یافت نشد" image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  return (
    <div style={{ padding: 12 }}>
      <Text strong>
        زیر پرونده‌های پرونده #{parent.fileNumber} ({children.length} مورد)
      </Text>
      <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
        {children.map(child => (
          <Col xs={24} sm={12} lg={8} xl={6} key={child.id}>
            <Card
              size="small"
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong>پرونده {child.fileNumber}</Text>
                  <Tag color={Number(child.projectBalance) >= 0 ? 'green' : 'red'}>
                    {child.electProjectStatusName}
                  </Tag>
                </div>
              }
            >
              <Space direction="vertical" size={6} style={{ width: '100%' }}>
                <Text>{child.landlordName || 'نامشخص'}</Text>
                <Text type="secondary">{child.solarRegisterDate || '-'}</Text>
                <Text type="secondary">تقاضا: {child.electRequestNumber || '-'}</Text>
                <Space size={4} wrap>
                  <Tag color={child.isEarthSystem ? 'green' : 'red'}>ارت</Tag>
                  <Tag color={child.isBuildingInspection ? 'green' : 'red'}>بازرسی</Tag>
                  <Tag color={child.isTestAndDelivery ? 'green' : 'red'}>تست-تحویل</Tag>
                </Space>
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tag color="purple">سطح: {child.projectLevel}</Tag>
                  <Text strong>{rial(child.projectBalance)} ریال</Text>
                </div>
                {child.engCurrentName && (
                  <Text type="secondary">کارشناس: {child.engCurrentName}</Text>
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
