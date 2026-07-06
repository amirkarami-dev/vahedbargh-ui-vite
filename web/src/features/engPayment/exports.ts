/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityFromSection } from '@/shared/geo/cityName'
import type { EngPaymentRow, EngPaymentTask } from '@/features/engPayment/types'

const fmt = (n?: number) => `${n ?? 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

function downloadText(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const fileSuffix = (task?: EngPaymentTask) =>
  String(task?.solarCreated ?? '').replaceAll('/', '_').split('_').reverse().join('_')

const deductionsSum = (x: EngPaymentRow) =>
  (x.deduction1 ?? 0) + (x.deduction2 ?? 0) + (x.deduction3 ?? 0) + (x.deduction4 ?? 0)

export async function exportEngPaymentExcel(rows: EngPaymentRow[], task?: EngPaymentTask) {
  const XLSX = await import('xlsx')
  const data = rows.map((x, i) => ({
    ردیف: i + 1,
    'نام و نام خانوادگی': x.fullName,
    کدملی: x.engineer?.naCode,
    شهر: CityFromSection(Number(x.engineer?.idSection ?? 0)),
    'مبلغ سیستمی': x.amountSystem,
    'سهم ۵٪ سازمان': x.deduction1,
    'سهم ۱٪ صندوق حمایت': x.deduction2,
    'سهم ۷٪ واحد برق': x.deduction3,
    '۱۰٪ ارزش افزوده': x.deduction4,
    'جمع کسورات': deductionsSum(x),
    'خالص پرداختی': x.sumAmountWithFish,
    'شماره حساب': x.engineer?.bankAccountNumber,
  }))
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, `پرداختی دوره ${task?.period ?? ''}`)
  XLSX.writeFile(wb, `لیست پرداختی دوره_${task?.period ?? ''}_${fileSuffix(task)}.xlsx`)
}

export async function exportEngPaymentGroupedExcel(rows: EngPaymentRow[], task?: EngPaymentTask) {
  const XLSX = await import('xlsx')
  const grouped: Record<string, any> = {}
  for (const x of rows) {
    const sid = Number(x.engineer?.idSection ?? 0)
    if (!grouped[sid]) {
      grouped[sid] = {
        شهر: CityFromSection(sid),
        'مبلغ سیستمی': 0,
        'سهم ۵٪ سازمان': 0,
        'سهم ۱٪ صندوق حمایت': 0,
        'سهم ۷٪ واحد برق': 0,
        '۱۰٪ ارزش افزوده': 0,
        'جمع کسورات': 0,
        'خالص پرداختی': 0,
      }
    }
    grouped[sid]['مبلغ سیستمی'] += x.amountSystem ?? 0
    grouped[sid]['سهم ۵٪ سازمان'] += x.deduction1 ?? 0
    grouped[sid]['سهم ۱٪ صندوق حمایت'] += x.deduction2 ?? 0
    grouped[sid]['سهم ۷٪ واحد برق'] += x.deduction3 ?? 0
    grouped[sid]['۱۰٪ ارزش افزوده'] += x.deduction4 ?? 0
    grouped[sid]['جمع کسورات'] += deductionsSum(x)
    grouped[sid]['خالص پرداختی'] += x.sumAmountWithFish ?? 0
  }
  const ws = XLSX.utils.json_to_sheet(Object.values(grouped))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, `تجمیعی دوره ${task?.period ?? ''}`)
  XLSX.writeFile(wb, `تجمیعی دوره_${task?.period ?? ''}_${fileSuffix(task)}.xlsx`)
}

const padZeros = (len: number) => (len > 0 ? '0'.repeat(len) : '')

// Bank fixed-width file (29-char records), old-ui exportToBankFile. Returns errors.
export function exportEngPaymentBankFile(
  rows: EngPaymentRow[],
  task: EngPaymentTask | undefined,
  solarApproved: string,
): string[] {
  const errors: string[] = []
  if (!solarApproved || solarApproved.length < 8) return ['تاریخ پرداخت بانکی را انتخاب کنید']
  const datePart = solarApproved.replaceAll('/', '').substring(2)
  let lines = ''
  let total = 0
  for (const el of rows) {
    if (el.payByBankReceipt) continue
    const amount = el.sumAmountWithFish ?? 0
    total += amount
    const bankAccount = (el.engineer?.bankAccountNumber ?? '').trim().replace(/[^a-zA-Z0-9]/g, '')
    const countZero = 29 - (bankAccount + amount + datePart).length
    let line = bankAccount + padZeros(countZero) + amount + datePart
    if (!el.engineer?.bankAccountNumber) {
      errors.push(`خطا در شماره حساب: ${el.engineer?.fullName ?? ''}`)
      line = `خطا در شماره حساب: ${el.engineer?.fullName ?? ''}`
    } else if (countZero <= 0 || line.length !== 29) {
      errors.push(`خطای ۲۹ کاراکتری: ${el.engineer?.fullName ?? ''}`)
      line = `خطای ۲۹ کاراکتری: ${el.engineer?.fullName ?? ''}`
    }
    lines += line + '\r\n'
  }
  const headLine = String(total) + datePart
  lines = padZeros(29 - headLine.length) + headLine + '\r\n' + lines
  downloadText(lines, `خروجی بانک_${fileSuffix(task)}.txt`)
  return errors
}

export function calcEngPayment(rows: EngPaymentRow[]) {
  let payBank = 0
  let sum = 0
  for (const x of rows) {
    const a = x.sumAmountWithFish ?? 0
    sum += a
    if (!x.payByBankReceipt) payBank += a
  }
  return { payBank: fmt(payBank), sum: fmt(sum) }
}
