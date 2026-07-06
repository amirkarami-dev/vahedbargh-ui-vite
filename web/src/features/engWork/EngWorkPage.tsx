import { useMemo } from 'react'
import { Card, Tabs, Typography, type TabsProps } from 'antd'
import { motion } from 'motion/react'
import { getRoles } from '@/shared/lib/auth'
import { WorkTab } from '@/features/engWork/WorkTab'
import { QuotaBurnTab } from '@/features/engWork/QuotaBurnTab'

// Engineer work (old-ui EngWork) — work figures for all; quota-burn for Administrator.
export function EngWorkPage() {
  const isAdmin = useMemo(() => getRoles().includes('Administrator'), [])

  const items: TabsProps['items'] = [
    { key: 'work', label: 'کارکرد مهندسین', children: <WorkTab /> },
  ]
  if (isAdmin) {
    items.push({ key: 'burn', label: 'مدیریت سوخت سهمیه ها', children: <QuotaBurnTab /> })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>کارکرد مهندسین</Typography.Title>
      <Card size="small" styles={{ body: { padding: 12 } }}>
        <Tabs defaultActiveKey="work" type="card" items={items} />
      </Card>
    </motion.div>
  )
}
