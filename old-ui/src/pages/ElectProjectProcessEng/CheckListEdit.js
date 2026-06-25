import React, { useMemo, useState } from "react"
import { Button, Col, Form, Grid, Input, Modal, Radio, Row, Select, Space, Table, Tag } from "antd"
import { PersianDatePickerInline } from "components/Common/PersianDatePickerInline"
import { getEnums } from "helpers/utilities"
import InspectionDesEnum from "models/types/InspectionDesEnum"
import { ChecklistColumns } from "./checklist-columns"

const CheckListEdit = ({ mainRowData, rowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md

  const [checkListForm] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [solarChecked, setSolarChecked] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  const handleExpand = (expanded, record) => {
    const keys = expanded ? [record.key] : []
    setExpandedRowKeys(keys)
  }

  const handleSubmit = values => {
    const updatedData = {
      ...values,
      id: editingId,
      solarChecked: solarChecked?.persian || values.solarChecked || "",
      electProjectId: mainRowData.electProjectId,
      eppId: mainRowData.id,
      deleteId: null,
    }
    mainProps.onUpsertCheckList(updatedData)

    setEditingId(null)
    checkListForm.resetFields(["resultDes"])
  }

  const handleEdit = record => {
    checkListForm.setFieldsValue(record)
    setEditingId(record.id)
  }

  const handleDelete = record => {
    const dataDelete = {
      deleteId: record.id,
      electProjectId: mainRowData.electProjectId,
      inspectionDesEnum: record.inspectionDesEnum,
      eppId: mainRowData.id,
    }
    mainProps.onUpsertCheckList(dataDelete)
  }

  const columnsWithSum = useMemo(
    () => [
      ...ChecklistColumns({
        mainProps,
        handleEdit,
        handleDelete,
      }),
    ],
    [mainProps, rowData]
  )

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        ویرایش
      </Button>

      <Modal
        rootClassName="eng-process-modal"
        title={`چک لیست بازدید: ${mainRowData.landLordName}`}
        centered={!isMobile}
        open={open}
        onCancel={() => setOpen(false)}
        width={isMobile ? "96vw" : "85vw"}
        footer={null}
        styles={{ body: { padding: isMobile ? 12 : 20 } }}
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Space wrap>
            <Tag color="blue">{`مالک: ${mainRowData.landLordName || "-"}`}</Tag>
            <Tag color="purple">{`پرونده: ${mainRowData.fileNumber || "-"}`}</Tag>
          </Space>

          <Form form={checkListForm} onFinish={handleSubmit} layout="vertical">
            <Row gutter={[8, 8]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="تاریخ بازدید"
                  name="julianChecked"
                  rules={[{ required: solarChecked?.persian?.length !== 10, message: "تاریخ الزامی است" }]}
                >
                  <PersianDatePickerInline
                    defaultDate={checkListForm.getFieldValue("julianChecked")?.toString()?.substring(0, 10)}
                    setPersianDate={setSolarChecked}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="مورد بازرسی"
                  name="inspectionDesEnum"
                  rules={[{ required: true, message: "الزامی می باشد" }]}
                >
                  <Select options={getEnums(InspectionDesEnum)} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="توضیحات" name="resultDes">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>

              <Col xs={24} md={16}>
                <Form.Item
                  label="انتخاب وضعیت"
                  name="isComplete"
                  rules={[{ required: true, message: "الزامی می باشد" }]}
                >
                  <Radio.Group>
                    <Space direction={isMobile ? "vertical" : "horizontal"}>
                      <Radio value={true}>کامل شده</Radio>
                      <Radio value={false}>نقص دارد</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
              <Space>
                <Button htmlType="button" onClick={() => checkListForm.resetFields(["resultDes"])}>
                  ریست فرم
                </Button>
                <Button type="primary" htmlType="submit" loading={mainProps.loading}>
                  {editingId ? "ویرایش" : "ذخیره"}
                </Button>
              </Space>
            </Space>
          </Form>

          <Table
            loading={mainProps.loading}
            size="small"
            pagination={{ pageSize: 10 }}
            scroll={{ y: isMobile ? 260 : 360, x: 450 }}
            rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
            expandable={{ expandedRowKeys, onExpand: handleExpand }}
            columns={columnsWithSum}
            rowKey={record => record.key}
            dataSource={[...rowData]}
          />
        </Space>
      </Modal>
    </>
  )
}

export default CheckListEdit
