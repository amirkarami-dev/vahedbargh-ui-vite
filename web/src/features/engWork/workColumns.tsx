import { type TableColumnsType } from 'antd'
import type { EngWorkRow } from '@/features/engWork/types'

const m = (n?: number) => Number(n ?? 0).toLocaleString('en-US')

// Ported from old-ui engWorkColumnsAnt.js. The "ورود به سامانه" column shows only
// for the first period (period === 1).
export function workColumns(period?: number): TableColumnsType<EngWorkRow> {
  const cols: TableColumnsType<EngWorkRow> = [
    { title: 'نام و نام خانوادگی', dataIndex: 'fullName', key: 'fullName' },
  ]
  if (period === 1) {
    cols.push({ title: 'ورود به سامانه', key: 'defaultQuota', render: (_, r) => m(r.defaultQuota) })
  }
  cols.push(
    { title: 'تخصیص این دوره', key: 'q', render: (_, r) => m(r.sumAmountEngQuota) },
    { title: 'تخصیص دوره های قبل', key: 'qb', render: (_, r) => m(r.sumAmountEngQuotaBeforePeriod) },
    { title: 'ارجاعی این دوره', key: 'f', render: (_, r) => m(r.sumAmountEngProcessFee) },
    {
      title: 'ارجاعی دوره های قبل',
      key: 'fb',
      render: (_, r) => m(r.sumAmountEngProcessFeeBeforePeriod),
    },
    { title: 'انجام شده این دوره', key: 'r', render: (_, r) => m(r.sumAmountEngRealWordThisQuarter) },
    { title: 'انجام شده دوره های قبل', key: 'rb', render: (_, r) => m(r.sumAmountEngRealWordBefore) },
    {
      title: 'مانده طبق انجام شده',
      key: 'bd',
      render: (_, r) =>
        m(
          (r.sumAmountEngQuota ?? 0) +
            (r.sumAmountEngQuotaBeforePeriod ?? 0) -
            (r.sumAmountEngRealWordThisQuarter ?? 0) -
            (r.sumAmountEngRealWordBefore ?? 0),
        ),
    },
    {
      title: 'مانده طبق ارجاعی',
      key: 'bf',
      render: (_, r) =>
        m(
          (r.sumAmountEngQuota ?? 0) +
            (r.sumAmountEngQuotaBeforePeriod ?? 0) -
            (r.sumAmountEngProcessFee ?? 0) -
            (r.sumAmountEngProcessFeeBeforePeriod ?? 0),
        ),
    },
  )
  return cols
}
