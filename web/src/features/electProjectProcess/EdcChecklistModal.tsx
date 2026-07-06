import { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
} from 'antd'
import { DeleteOutlined, EditFilled } from '@ant-design/icons'
import { PersianDatePicker, type PersianDateValue } from '@/shared/components'
import { CheckListEdcDescriptions } from '@/shared/enums/electProcess'
import { useUpsertCheckListEdc } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { EdcChecklistRow, ElectProject } from '@/features/electProjects/types'

type Row = EdcChecklistRow & { key: string | number }

// old-ui ElectProjectProcessEdc/CheckListEdit — distribution-company checklist editor.
export function EdcChecklistModal({ project }: { project: ElectProject }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [checked, setChecked] = useState<PersianDateValue | null>(null)
  const upsert = useUpsertCheckListEdc()
  const data = project.checkListEdcs ?? []

  const onSubmit = (values: Record<string, unknown>) => {
    upsert.mutate({
      checkListEdcEnum: values.checkListEdcEnum,
      resultDes: values.resultDes,
      isComplete: values.isComplete,
      id: editingId,
      solarChecked: checked?.persian || '',
      electProjectId: project.id,
      eppId: project.id,
      deleteId: null,
    })
    setEditingId(null)
    form.resetFields(['resultDes'])
  }

  const onEdit = (record: EdcChecklistRow) => {
    form.setFieldsValue({
      checkListEdcEnum: record.checkListEdcEnum,
      resultDes: record.resultDes,
      isComplete: record.isComplete,
    })
    setEditingId(record.id ?? null)
  }

  const onDelete = (record: EdcChecklistRow) => {
    upsert.mutate({
      deleteId: record.id,
      electProjectId: project.id,
      checkListEdcEnum: record.checkListEdcEnum,
      eppId: project.id,
    })
  }

  const isComplete = (r: EdcChecklistRow) =>
    r.children ? r.children.some(c => c.isComplete === true) : !!r.isComplete

  const columns: TableColumnsType<Row> = [
    {
      title: 'شرح بازرسی',
      key: 'desc',
      render: (_, r) =>
        r.children ? (
          <div dir="rtl">{r.groupByValue}</div>
        ) : r.id ? (
          <Space wrap>
            <Button size="small" icon={<EditFilled />} onClick={() => onEdit(r)} />
            <Popconfirm title="حذف آیتم" okText="بله" cancelText="خیر" onConfirm={() => onDelete(r)}>
              <Button size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
            <Typography.Text type="secondary">{`تاریخ بازدید: ${r.solarChecked || '-'}`}</Typography.Text>
            <Typography.Text type="secondary">{`شرح: ${r.resultDes || '-'}`}</Typography.Text>
          </Space>
        ) : null,
    },
    {
      title: 'وضعیت تایید',
      key: 'isComplete',
      width: 120,
      render: (_, r) => <Tag color={isComplete(r) ? 'green' : 'red'}>{isComplete(r) ? 'کامل شده' : 'نقص دارد'}</Tag>,
    },
  ]

  const tableData: Row[] = data.map((r, i) => ({
    ...r,
    key: r.key ?? r.id ?? i,
    children: r.children?.map((c, j) => ({ ...c, key: c.key ?? c.id ?? `${i}-${j}` })),
  }))

  return (
    <>
      <Button type="dashed" size="small" icon={<EditFilled />} onClick={() => setOpen(true)}>
        چک لیست
      </Button>
      <Modal
        title={`چک لیست بازدید: ${project.landlordName ?? ''}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width="90%"
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item label="تاریخ بازدید" required>
                <PersianDatePicker setDefault={false} setPersianDate={setChecked} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="checkListEdcEnum" label="مورد بازرسی" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                <Select showSearch optionFilterProp="label" options={CheckListEdcDescriptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="resultDes" label="توضیحات">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="isComplete" label="انتخاب وضعیت" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                <Radio.Group>
                  <Radio value={true}>کامل شده</Radio>
                  <Radio value={false}>نقص دارد</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Space style={{ marginBottom: 12 }}>
            <Button onClick={() => form.resetFields(['resultDes'])}>ریست فرم</Button>
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
          scroll={{ y: 200, x: 350 }}
        />
      </Modal>
    </>
  )
}
