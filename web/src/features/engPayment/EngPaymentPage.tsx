import { useState } from 'react'
import {
  App,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Typography,
  type TableColumnsType,
} from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { PersianDatePicker, type PersianDateValue } from '@/shared/components'
import { engPaymentColumns } from '@/features/engPayment/columns'
import {
  useApproveEngPayment,
  useCreateEngPaymentList,
  useEngPaymentList,
  useEngPaymentTasks,
  useUpdateEngPaymentRow,
} from '@/features/engPayment/api/useEngPayment'
import {
  calcEngPayment,
  exportEngPaymentBankFile,
  exportEngPaymentExcel,
  exportEngPaymentGroupedExcel,
} from '@/features/engPayment/exports'
import type { EngPaymentInvoice, EngPaymentRow } from '@/features/engPayment/types'

const num = (v?: number) => `${v ?? 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const invoiceCols: TableColumnsType<EngPaymentInvoice> = [
  { title: 'تاریخ تراکنش', key: 'd', render: (_, r) => r.transaction?.solarCreated },
  { title: 'مبلغ', key: 'a', render: (_, r) => num(r.transaction?.amount) },
  { title: 'توضیحات', key: 'des', render: (_, r) => r.transaction?.des },
  { title: 'مالک', key: 'll', render: (_, r) => r.electProject?.landlordName },
  { title: 'تاریخ ثبت فاکتور', key: 'sc', render: (_, r) => r.solarCreated },
]

// Engineer payment management (old-ui EngPayment) — pick a payment period, build a
// list for a date range, edit deductions, approve, and export.
export function EngPaymentPage() {
  const { message, modal } = App.useApp()
  const [form] = Form.useForm()
  const { data: tasks } = useEngPaymentTasks()
  const [taskId, setTaskId] = useState<string | null>(null)
  const selected = taskId ?? tasks?.[0]?.id ?? null
  const { data: rows, isFetching } = useEngPaymentList(selected)
  const create = useCreateEngPaymentList()
  const update = useUpdateEngPaymentRow()
  const approve = useApproveEngPayment()
  const [fromSolar, setFromSolar] = useState<PersianDateValue | null>(null)
  const [toSolar, setToSolar] = useState<PersianDateValue | null>(null)
  const [solarApproved, setSolarApproved] = useState<PersianDateValue | null>(null)

  const list = rows ?? []
  const task = (tasks ?? []).find(t => t.id === selected)

  const onCreate = (v: { description?: string }) => {
    create.mutate(
      { fromSolar: fromSolar?.persian ?? '', toSolar: toSolar?.persian ?? '', description: v.description },
      {
        onSuccess: id => {
          setTaskId(id)
          form.resetFields()
        },
      },
    )
  }

  const onApprove = () => {
    if (selected && solarApproved?.persian) {
      approve.mutate({ engPaymentTaskId: selected, solarApproved: solarApproved.persian })
    } else {
      message.error('تاریخ پرداخت بانکی را انتخاب کنید')
    }
  }

  const onBankFile = () => {
    exportEngPaymentBankFile(list, task, solarApproved?.persian ?? '').forEach(e => message.error(e))
  }

  const onPayCalc = () => {
    const { payBank, sum } = calcEngPayment(list)
    modal.info({
      title: 'محاسبه نحوه پرداخت',
      content: (
        <div>
          مبلغ پرداخت چک به بانک: {payBank}
          <br />
          مبلغ کل پرداختی: {sum}
        </div>
      ),
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>مدیریت پرداختی</Typography.Title>

      <Card size="small" style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Select
            showSearch
            optionFilterProp="label"
            style={{ width: '100%' }}
            placeholder="انتخاب دوره پرداخت"
            value={selected ?? undefined}
            onChange={setTaskId}
            options={(tasks ?? []).map(t => ({
              value: t.id,
              label: `دوره:${t.period ?? ''} - ایجاد:${t.solarCreated ?? ''} - پرداخت:${t.solarPay ?? ''} - ${t.des ?? ''}`,
            }))}
          />
          <Form form={form} layout="vertical" onFinish={onCreate}>
            <Row gutter={12}>
              <Col xs={24} md={8}>
                <Form.Item label="از تاریخ">
                  <PersianDatePicker setDefault={false} setPersianDate={setFromSolar} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="تا تاریخ">
                  <PersianDatePicker setDefault={false} setPersianDate={setToSolar} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="توضیحات" name="description">
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            </Row>
            <Space>
              <Button type="primary" htmlType="submit" loading={create.isPending}>
                ذخیره (ایجاد دوره)
              </Button>
              <Button onClick={() => form.resetFields()}>ریست فرم</Button>
            </Space>
          </Form>
        </Space>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <ConfigProvider direction="rtl">
          <Table<EngPaymentRow>
            size="small"
            rowKey="id"
            loading={isFetching || update.isPending}
            columns={engPaymentColumns(update.mutate)}
            dataSource={list}
            scroll={{ x: 1100 }}
            pagination={{ pageSize: 50 }}
            expandable={{
              rowExpandable: r => (r.invoices?.length ?? 0) > 0,
              expandedRowRender: r => (
                <Table<EngPaymentInvoice>
                  size="small"
                  rowKey="id"
                  pagination={false}
                  columns={invoiceCols}
                  dataSource={r.invoices ?? []}
                />
              ),
            }}
          />
        </ConfigProvider>
      </Card>

      <Divider />
      <Space wrap>
        <PersianDatePicker setDefault={false} setPersianDate={setSolarApproved} />
        <Popconfirm
          title="بعد از پرداخت قابل ویرایش نمی باشد"
          description="آیا مطمئن هستید؟"
          okText="بله"
          cancelText="خیر"
          onConfirm={onApprove}
        >
          <Button icon={<SaveOutlined />} loading={approve.isPending}>
            تایید پرداخت بانکی
          </Button>
        </Popconfirm>
        <Button type="primary" onClick={onBankFile}>
          خروجی بانک
        </Button>
        <Button type="primary" onClick={() => exportEngPaymentExcel(list, task)}>
          خروجی اکسل
        </Button>
        <Button type="primary" onClick={() => exportEngPaymentGroupedExcel(list, task)}>
          خروجی تجمیعی اکسل
        </Button>
        <Button onClick={onPayCalc}>محاسبه نحوه پرداخت</Button>
      </Space>
    </motion.div>
  )
}
