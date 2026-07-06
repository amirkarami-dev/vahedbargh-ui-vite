import { Empty, Table } from 'antd'
import { useInvoices } from '@/features/accounting/api/useAccounting'
import { invoiceColumns } from '@/features/accounting/invoiceColumns'
import type { Invoice } from '@/features/accounting/types'

// Accountant invoices (old-ui Accounting/invoices).
export function InvoicesTab() {
  const { data, isFetching } = useInvoices()
  return (
    <Table<Invoice>
      size="small"
      rowKey="id"
      loading={isFetching}
      columns={invoiceColumns()}
      dataSource={data ?? []}
      scroll={{ x: 700 }}
      locale={{ emptyText: <Empty /> }}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  )
}
