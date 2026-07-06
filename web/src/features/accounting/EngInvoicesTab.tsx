import { Empty, Table } from 'antd'
import { getCurrentUser } from '@/shared/lib/auth'
import { useEngInvoices } from '@/features/accounting/api/useAccounting'
import { engInvoiceColumns } from '@/features/accounting/invoiceColumns'
import type { Invoice } from '@/features/accounting/types'

// Engineer's own invoices (old-ui Accounting/engInvoices). engId = current user's sid.
export function EngInvoicesTab() {
  const engId = String(getCurrentUser()?.sid ?? '')
  const { data, isFetching } = useEngInvoices(engId)
  return (
    <Table<Invoice>
      size="small"
      rowKey="id"
      loading={isFetching}
      columns={engInvoiceColumns()}
      dataSource={data ?? []}
      scroll={{ x: 600 }}
      locale={{ emptyText: <Empty /> }}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  )
}
