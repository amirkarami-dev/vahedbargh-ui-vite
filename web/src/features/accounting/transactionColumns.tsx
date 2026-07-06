import { Typography, type TableColumnsType } from 'antd'
import { CityFromSection } from '@/shared/geo/cityName'
import type { Transaction } from '@/features/accounting/types'

const { Text } = Typography
const money = (n?: number) => Number(n ?? 0).toLocaleString('en-US')

// Ported from old-ui Accounting/transactions/columns.js.
export function transactionColumns(page: number, pageSize: number): TableColumnsType<Transaction> {
  return [
    { title: '#', key: 'row', width: 50, render: (_v, _r, i) => (page - 1) * pageSize + i + 1 },
    { title: 'مبلغ-ریال', key: 'amount', width: 110, render: (_, r) => <Text>{money(r.amount)}</Text> },
    {
      title: 'تاریخ تراکنش',
      key: 'date',
      width: 110,
      render: (_, r) => <Text>{r.solarCreated?.substring(0, 10)}</Text>,
    },
    {
      title: 'شهرستان',
      key: 'city',
      width: 90,
      render: (_, r) => <Text>{CityFromSection(r.idSection ?? 0)}</Text>,
    },
    { title: 'شماره پیگیری', key: 'bankTransactionId', width: 160, dataIndex: 'bankTransactionId' },
    { title: 'درگاه', key: 'gateway', width: 90, dataIndex: 'gatewayTypeName' },
    { title: 'واریز/برداشت', key: 'status', width: 100, dataIndex: 'transactionStatusName' },
    { title: 'مربوط به پرونده', key: 'fileNumber', width: 110, dataIndex: 'fileNumber' },
    { title: 'توضیحات', key: 'des', width: 220, dataIndex: 'des' },
  ]
}
