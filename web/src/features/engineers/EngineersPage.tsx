import { useMemo, useState } from 'react'
import { Card, Checkbox, Empty, Input, Space, Table, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useEngineers } from '@/features/engineers/api/useEngineers'
import { engineerColumns } from '@/features/engineers/columns'
import type { Engineer } from '@/features/engineers/types'

// Engineers list (old-ui pages/BaseInfo/engineers). Fetch-all-once + filter in
// memory, exactly like the legacy reducer.
export function EngineersPage() {
  const { t } = useTranslation()
  const { data, isLoading } = useEngineers()
  const [search, setSearch] = useState('')
  const [filterAssign, setFilterAssign] = useState(false)

  const rows = useMemo<Engineer[]>(() => {
    let list = data ?? []
    if (search.length > 0) list = list.filter(f => (f.fullName ?? '').includes(search))
    if (filterAssign) {
      list = list.filter(f => (f.engFiles ?? []).some(x => x.fileName === 'F2.jpg'))
    }
    // TODO: section/city geo filter (filterAddress + idSection) needs the ported
    // city/section static data + returnCityName lookup. Follow-up.
    return list
  }, [data, search, filterAssign])

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={3}>{t('menu.engineers')}</Typography.Title>

      <Card size="small" style={{ marginBottom: 12 }} styles={{ body: { padding: 12 } }}>
        <Space wrap size="middle">
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder={t('engineers.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 260 }}
          />
          <Checkbox checked={filterAssign} onChange={e => setFilterAssign(e.target.checked)}>
            {t('engineers.filterAssign')}
          </Checkbox>
        </Space>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<Engineer>
          size="small"
          rowKey="id"
          loading={isLoading}
          columns={engineerColumns()}
          dataSource={rows}
          locale={{ emptyText: <Empty description={t('engineers.empty')} /> }}
          pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </motion.div>
  )
}
