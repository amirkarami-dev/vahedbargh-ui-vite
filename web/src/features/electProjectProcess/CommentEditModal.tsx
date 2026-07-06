import { useMemo, useState } from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
} from 'antd'
import { DeleteOutlined, EditFilled } from '@ant-design/icons'
import { BranchingTypes, FazNumbers, branchingLabel, fazLabel } from '@/shared/enums/electProcess'
import { useUpsertComment } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { CommentRow, EppRow } from '@/features/electProjectProcess/types'

type Row = CommentRow & { key?: string | number; isTotal?: boolean }

// old-ui CommentEdit — engineer fills/edits form#3 rows (only at projectLevel 1).
export function CommentEditModal({ row }: { row: EppRow }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const upsert = useUpsertComment()
  const branching = Form.useWatch('branchingTypeEnum', form)
  const data = useMemo(() => row.commentEngForm ?? [], [row.commentEngForm])

  const onSubmit = (values: Record<string, unknown>) => {
    upsert.mutate({
      ...values,
      id: editingId,
      electProjectId: row.electProjectId,
      eppId: row.id,
      deleteId: null,
      power: values.power || 0,
      powerSum: values.powerSum || 0,
    })
    setEditingId(null)
    form.resetFields()
  }

  const onEdit = (record: CommentRow) => {
    form.setFieldsValue(record)
    setEditingId(record.id ?? null)
  }

  const onDelete = (record: CommentRow) => {
    upsert.mutate({
      ...record,
      id: null,
      deleteId: record.id,
      electProjectId: row.electProjectId,
      eppId: row.id,
    })
  }

  const columns: TableColumnsType<Row> = [
    {
      title: 'ویرایش',
      key: 'edit',
      width: 110,
      render: (_, r) =>
        r.isTotal ? (
          <Typography.Text type="secondary">مجموع کل</Typography.Text>
        ) : (
          <Space>
            <Button size="small" icon={<EditFilled />} onClick={() => onEdit(r)} />
            <Popconfirm title="حذف آیتم" okText="بله" cancelText="خیر" onConfirm={() => onDelete(r)}>
              <Button size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
    },
    { title: 'نوع انشعاب', key: 'branching', width: 120, render: (_, r) => (r.isTotal ? '-' : branchingLabel(r.branchingTypeEnum)) },
    { title: 'نوع کنتور', key: 'faz', width: 110, render: (_, r) => (r.isTotal ? '-' : fazLabel(r.fazNumberEnum)) },
    { title: 'تعداد انشعاب', dataIndex: 'branchingCount', key: 'branchingCount', width: 110 },
    { title: 'جریان مورد نیاز', dataIndex: 'ampere', key: 'ampere', width: 120 },
    { title: 'توان مورد نیاز', dataIndex: 'power', key: 'power', width: 120 },
    { title: 'مجموع توان', dataIndex: 'powerSum', key: 'powerSum', width: 120 },
    { title: 'توضیحات/شماره اشتراک', dataIndex: 'des', key: 'des', render: v => v || '-' },
  ]

  const total = useMemo(() => {
    const acc = { branchingCount: 0, ampere: 0, power: 0, powerSum: 0 }
    for (const r of data) {
      if ((r.branchingTypeEnum ?? 0) <= 3) {
        acc.branchingCount += r.branchingCount ?? 0
        acc.ampere += r.ampere ?? 0
        acc.power += r.power ?? 0
        acc.powerSum += r.powerSum ?? 0
      }
    }
    return acc
  }, [data])

  const tableData: Row[] = [
    ...data.map((r, i) => ({ ...r, key: r.id ?? i })),
    { key: 'total', isTotal: true, des: 'مجموع کل (به جز انشعاب موجود در محل)', ...total },
  ]

  const fazOptions = FazNumbers.filter(
    o => (o.value > 1 && branching === 4) || (o.value <= 1 && branching !== 4),
  )

  return (
    <>
      <Button type="primary" size="small" onClick={() => setOpen(true)}>
        ویرایش
      </Button>
      <Modal
        title={`فرم شماره 3: ${row.landLordName ?? ''}`}
        open={open}
        onCancel={() => setOpen(false)}
        width="80%"
        footer={null}
        destroyOnClose
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Space wrap>
            <Tag color="blue">{`مالک: ${row.landLordName || '-'}`}</Tag>
            <Tag color="purple">{`پرونده: ${row.fileNumber || '-'}`}</Tag>
          </Space>

          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Row gutter={[8, 8]}>
              <Col xs={24} md={8}>
                <Form.Item name="branchingTypeEnum" label="نوع انشعاب" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                  <Select options={BranchingTypes} onChange={() => form.setFieldValue('fazNumberEnum', null)} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="fazNumberEnum" label="نوع کنتور" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                  <Select options={fazOptions} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="branchingCount" label="تعداد انشعاب" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                  <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="ampere" label="جریان مورد نیاز-آمپر" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                  <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
              </Col>
              {branching <= 3 && (
                <>
                  <Col xs={24} md={8}>
                    <Form.Item name="power" label="توان مورد نیاز" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                      <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="powerSum" label="مجموع توان مورد نیاز" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                      <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                  </Col>
                </>
              )}
              <Col span={24}>
                <Form.Item
                  name="des"
                  label={branching > 3 ? 'شماره اشتراک/رمز رایانه/کنتور' : 'توضیحات'}
                  rules={branching > 3 ? [{ required: true, message: 'الزامی می‌باشد' }] : undefined}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
            <Space>
              <Button onClick={() => form.resetFields()}>ریست فرم</Button>
              <Button type="primary" htmlType="submit" loading={upsert.isPending}>
                {editingId ? 'ویرایش' : 'ذخیره'}
              </Button>
            </Space>
          </Form>

          <Table<Row>
            size="small"
            columns={columns}
            dataSource={tableData}
            rowKey="key"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 780, y: 480 }}
          />
        </Space>
      </Modal>
    </>
  )
}
