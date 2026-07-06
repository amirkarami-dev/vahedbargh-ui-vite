import { InputNumber, type TableColumnsType } from 'antd'
import { CityFromSection } from '@/shared/geo/cityName'
import type { EngPaymentRow, EngPaymentUpdate } from '@/features/engPayment/types'

const fmt = (v?: number) => `${v ?? 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const numFmt = (v?: string | number) => `${v ?? ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Ported from old-ui EngPayment/columns.js. Only `deduction2` is inline-editable;
// amountSystem/deduction1/3/4 + totals are read-only.
export function engPaymentColumns(
  onUpdate: (u: EngPaymentUpdate) => void,
): TableColumnsType<EngPaymentRow> {
  return [
    { title: 'نام و نام خانوادگی', dataIndex: 'fullName', key: 'fullName', width: 150 },
    {
      title: 'شهر',
      key: 'section',
      width: 100,
      render: (_, r) => ((r.engineer?.idSection ?? 0) > 0 ? CityFromSection(r.engineer!.idSection!) : '-'),
    },
    {
      title: 'مبلغ سیستمی',
      key: 'amountSystem',
      width: 120,
      render: (_, r) => (
        <InputNumber style={{ width: '100%' }} disabled formatter={numFmt} defaultValue={r.amountSystem} />
      ),
    },
    { title: '۵٪ سازمان', key: 'deduction1', width: 100, render: (_, r) => fmt(r.deduction1) },
    {
      title: '۱٪ صندوق حمایت',
      key: 'deduction2',
      width: 130,
      render: (_, r) => (
        <InputNumber
          style={{ width: '100%' }}
          disabled={r.approved}
          formatter={numFmt}
          defaultValue={r.deduction2}
          onBlur={e => {
            const val = Number(String(e.target.value).replace(/,/g, '')) || 0
            if (val !== (r.deduction2 ?? 0)) {
              onUpdate({
                id: r.id,
                amountSystem: r.amountSystem,
                deduction2: val,
                deduction3: r.deduction3,
                deduction4: r.deduction4,
                addition1: r.addition1,
                addition2: 0,
              })
            }
          }}
        />
      ),
    },
    { title: '۷٪ واحد برق', key: 'deduction3', width: 120, render: (_, r) => fmt(r.deduction3) },
    { title: '۱۰٪ ارزش افزوده', key: 'deduction4', width: 130, render: (_, r) => fmt(r.deduction4) },
    {
      title: 'خالص پرداختی',
      key: 'sumAmountWithFish',
      width: 120,
      render: (_, r) => fmt(r.sumAmountWithFish),
    },
    { title: 'شماره حساب', key: 'bank', width: 150, render: (_, r) => r.engineer?.bankAccountNumber },
    { title: 'کدملی', key: 'naCode', width: 120, render: (_, r) => r.engineer?.naCode },
  ]
}
