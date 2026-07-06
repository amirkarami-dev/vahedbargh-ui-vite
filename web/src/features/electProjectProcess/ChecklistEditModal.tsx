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
import { InspectionDescriptions } from '@/shared/enums/electProcess'
import { useUpsertCheckList } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { ChecklistRow, EppRow } from '@/features/electProjectProcess/types'

type Row = ChecklistRow & { key: string | number }

// old-ui CheckListEdit — engineer fills/edits the inspection checklist (level 1).
export function ChecklistEditModal({ row }: { row: EppRow }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [checked, setChecked] = useState<PersianDateValue | null>(null)
  const upsert = useUpsertCheckList()
  const data = row.checkListForms ?? []

  const onSubmit = (values: Record<string, unknown>) => {
    upsert.mutate({
      inspectionDesEnum: values.inspectionDesEnum,
      resultDes: values.resultDes,
      isComplete: values.isComplete,
      id: editingId,
      solarChecked: checked?.persian || '',
      electProjectId: row.electProjectId,
      eppId: row.id,
      deleteId: null,
    })
    setEditingId(null)
    form.resetFields(['resultDes'])
  }

  const onEdit = (record: ChecklistRow) => {
    form.setFieldsValue({
      inspectionDesEnum: record.inspectionDesEnum,
      resultDes: record.resultDes,
      isComplete: record.isComplete,
    })
    setEditingId(record.id ?? null)
  }

  const onDelete = (record: ChecklistRow) => {
    upsert.mutate({
      deleteId: record.id,
      electProjectId: row.electProjectId,
      inspectionDesEnum: record.inspectionDesEnum,
      eppId: row.id,
    })
  }

  const isComplete = (r: ChecklistRow) =>
    r.children ? r.children.some(c => c.isComplete === true) : !!r.isComplete

  const columns: TableColumnsType<Row> = [
    {
      title: 'شرح بازرسی',
      key: 'inspection',
      render: (_, r) =>
        r.children ? (
          <div dir="rtl">{r.inspectionDesEnum}</div>
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
      <Button type="primary" size="small" onClick={() => setOpen(true)}>
        ویرایش
      </Button>
      <Modal
        title={`چک لیست بازدید: ${row.landLordName ?? ''}`}
        open={open}
        onCancel={() => setOpen(false)}
        width="85%"
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
              <Col xs={24} md={12}>
                <Form.Item label="تاریخ بازدید" required>
                  <PersianDatePicker setDefault={false} setPersianDate={setChecked} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="inspectionDesEnum" label="مورد بازرسی" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                  <Select
                    showSearch
                    optionFilterProp="label"
                    options={InspectionDescriptions}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="resultDes" label="توضیحات">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col xs={24} md={16}>
                <Form.Item name="isComplete" label="انتخاب وضعیت" rules={[{ required: true, message: 'الزامی می‌باشد' }]}>
                  <Radio.Group>
                    <Radio value={true}>کامل شده</Radio>
                    <Radio value={false}>نقص دارد</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Space>
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
            scroll={{ y: 360, x: 450 }}
          />
        </Space>
      </Modal>
    </>
  )
}
