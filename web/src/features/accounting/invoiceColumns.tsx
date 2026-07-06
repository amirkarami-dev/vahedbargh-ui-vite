import type { TableColumnsType } from 'antd'
import type { Invoice } from '@/features/accounting/types'

const money = (n?: number) => Number(n ?? 0).toLocaleString('en-US')

// Accountant invoices (old-ui Accounting/invoices/columns.js).
export function invoiceColumns(): TableColumnsType<Invoice> {
  return [
    { title: 'کارشناس', key: 'engineerName', dataIndex: 'engineerName', width: 130 },
    { title: 'مبلغ (ریال)', key: 'amount', width: 130, render: (_, r) => money(r.amount) },
    { title: 'تاریخ تراکنش', key: 'date', dataIndex: 'transactionSolarCreated', width: 150 },
    { title: 'کد ملی', key: 'engineerNaCode', dataIndex: 'engineerNaCode', width: 130 },
    { title: 'مجری', key: 'executorName', dataIndex: 'executorName', width: 130 },
    { title: 'مربوط به پرونده', key: 'fileNumber', dataIndex: 'fileNumber', width: 130 },
    { title: 'توضیحات', key: 'transactionDes', dataIndex: 'transactionDes', width: 180 },
  ]
}

// Engineer's own invoices (old-ui Accounting/engInvoices/columns.js).
export function engInvoiceColumns(): TableColumnsType<Invoice> {
  return [
    { title: 'مبلغ (ریال)', key: 'amount', width: 130, render: (_, r) => money(r.amount) },
    {
      title: 'تاریخ انجام و تحویل به واحد برق',
      key: 'deliver',
      dataIndex: 'solarDateDeliverOffice',
      width: 210,
    },
    { title: 'مجری', key: 'executorName', dataIndex: 'executorName', width: 130 },
    { title: 'مربوط به پرونده', key: 'fileNumber', dataIndex: 'fileNumber', width: 130 },
    { title: 'توضیحات', key: 'transactionDes', dataIndex: 'transactionDes', width: 180 },
  ]
}
