import { useState } from 'react'
import { Button, Checkbox, Col, Divider, Form, Input, Modal, Row, Select, Table } from 'antd'
import { EditFilled } from '@ant-design/icons'
import { PersianDatePicker, type PersianDateValue } from '@/shared/components'
import { getEnums } from '@/shared/lib/enums'
import { EngGradeTypeEnum } from '@/shared/enums/engGradeType'
import { WorkPermitTypeEnum } from '@/shared/enums/workPermitType'
import { engHistoryColumns } from '@/features/engineers/engHistoryColumns'
import { useUpsertEngHistory } from '@/features/engineers/api/useEngineerMutations'
import type { EngHistory, Engineer } from '@/features/engineers/types'

type Props = {
  engineer: Engineer
  history: EngHistory[]
}

// Engineer license/history editor (old-ui EngHistoryEdit.js). Modal with a form
// (add/edit one permit) + the history table.
export function EngHistoryEdit({ engineer, history }: Props) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [solarValidityDate, setSolarValidityDate] = useState<PersianDateValue | null>(null)
  const [solarIssueDate, setSolarIssueDate] = useState<PersianDateValue | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const upsert = useUpsertEngHistory()

  const handleSubmit = (values: Record<string, unknown>) => {
    upsert.mutate({
      ...values,
      solarValidityDate: solarValidityDate?.persian,
      solarIssueDate: solarIssueDate?.persian,
      engId: engineer.id,
      id: editingId,
    })
    setEditingId(null)
    form.resetFields()
  }

  const handleEdit = (record: EngHistory) => {
    form.setFieldsValue(record)
    setEditingId(record.id ?? null)
  }

  return (
    <>
      <Button icon={<EditFilled />} size="small" block onClick={() => setOpen(true)}>
        ویرایش پروانه
      </Button>
      <Modal
        title={`ویرایش پروانه کارشناس: ${engineer.fullName}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        footer={null}
        destroyOnClose
      >
        <Form name="engHistoryForm" form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item required label="تاریخ اخذ پروانه:" name="julianIssueDate">
                <PersianDatePicker setPersianDate={setSolarIssueDate} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item required label="تاریخ اعتبار پروانه:" name="julianValidityDate">
                <PersianDatePicker setPersianDate={setSolarValidityDate} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item required label="اجازه کار" name="workPermission" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item required label="پایه" name="engineerGradeTypeEnum">
                <Select style={{ width: 200 }} options={getEnums(EngGradeTypeEnum)} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item required label="نوع مجوز" name="workPermitTypeEnum">
                <Select style={{ width: 200 }} options={getEnums(WorkPermitTypeEnum)} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item required label="شماره پروانه" name="workPermitNum">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col>
              <Button type="primary" htmlType="submit" loading={upsert.isPending}>
                ذخیره
              </Button>
              <Button
                htmlType="button"
                onClick={() => form.resetFields()}
                style={{ marginInlineStart: 8 }}
              >
                ریست فرم
              </Button>
            </Col>
          </Row>
          <Table<EngHistory>
            loading={upsert.isPending}
            size="small"
            scroll={{ y: 670, x: 700 }}
            sticky
            columns={engHistoryColumns(handleEdit)}
            rowKey={r => String(r.id)}
            dataSource={[...history]}
            style={{ marginTop: 12 }}
          />
        </Form>
      </Modal>
    </>
  )
}
