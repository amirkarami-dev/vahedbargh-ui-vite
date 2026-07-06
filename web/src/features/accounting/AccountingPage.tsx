import { useMemo } from 'react'
import { Card, Tabs, Typography, type TabsProps } from 'antd'
import { motion } from 'motion/react'
import { getRoles } from '@/shared/lib/auth'
import { TransactionsTab } from '@/features/accounting/TransactionsTab'
import { InvoicesTab } from '@/features/accounting/InvoicesTab'
import { EngInvoicesTab } from '@/features/accounting/EngInvoicesTab'
import { PaymentTab } from '@/features/accounting/PaymentTab'
import { EngPaymentTab } from '@/features/accounting/EngPaymentTab'

// Accounting (old-ui Accounting/index.js) — role-based tabs. Transactions for all;
// Accountant: invoices + engineer-payment; Engineer: own invoices; Admin/Section: payment.
// TP (public transaction) is a separate public page.
export function AccountingPage() {
  const roles = useMemo(() => getRoles(), [])
  const has = (r: string) => roles.includes(r)

  const items: TabsProps['items'] = [
    { key: 'tx', label: 'تراکنش‌ها', children: <TransactionsTab /> },
  ]
  if (has('Accountant')) {
    items.push({ key: 'inv', label: 'فاکتورها', children: <InvoicesTab /> })
    items.push({ key: 'engpay', label: 'پرداختی کارشناس', children: <EngPaymentTab /> })
  }
  if (has('Engineer')) items.push({ key: 'enginv', label: 'فاکتورهای من', children: <EngInvoicesTab /> })
  if (has('Administrator') || has('Section')) {
    items.push({ key: 'pay', label: 'ثبت فیش', children: <PaymentTab /> })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>حسابداری</Typography.Title>
      <Card size="small" styles={{ body: { padding: 12 } }}>
        <Tabs defaultActiveKey="tx" items={items} />
      </Card>
    </motion.div>
  )
}
