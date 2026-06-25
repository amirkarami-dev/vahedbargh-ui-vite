import React, { useMemo, useState } from "react"
import { Button, Col, Form, Grid, Input, Modal, Radio, Row, Select, Space, Table, Tag } from "antd"
import { PersianDatePickerInline } from "components/Common/PersianDatePickerInline"
import { getEnums } from "helpers/utilities"
import CheckListEdcEnum from "models/types/CheckListEdcEnum"
import { ChecklistEdcColumns } from "./checklist-edc-column"

const CheckListEdcEdit = ({ mainRowData, rowData, mainProps }) => {
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
      electProjectId: mainRowData.id,
      eppId: mainRowData.id,
      deleteId: null,
    }

    mainProps.onUpsertCheckListEdc(updatedData)
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
      electProjectId: mainRowData.id,
      checkListEdcEnum: record.checkListEdcEnum,
      eppId: mainRowData.id,
    }
    mainProps.onUpsertCheckListEdc(dataDelete)
  }

  const columnsWithSum = useMemo(
    () => [
      ...ChecklistEdcColumns({
        mainProps,
        handleEdit,
        handleDelete,
      }),
    ],
    [mainProps, rowData]
  )

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        گزارش ش توزیع
      </Button>

      <Modal
        rootClassName="eng-process-modal"
        title={`چک لیست شرکت توزیع: ${mainRowData?.electProject?.landlordName || "-"}`}
        centered={!isMobile}
        open={open}
        onCancel={() => setOpen(false)}
        width={isMobile ? "96vw" : "85vw"}
        footer={null}
        styles={{ body: { padding: isMobile ? 12 : 20, maxHeight: "calc(100vh - 180px)", overflowY: "auto" } }}
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Tag color="red">{`توضیح نقص: ${mainRowData.defectDes || "-"}`}</Tag>

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
                <Form.Item label="مورد بازرسی" name="checkListEdcEnum" rules={[{ required: true, message: "الزامی می باشد" }]}>
                  <Select options={getEnums(CheckListEdcEnum)} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="توضیحات" name="resultDes">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>

              <Col xs={24} md={16}>
                <Form.Item label="انتخاب وضعیت" name="isComplete" rules={[{ required: true, message: "الزامی می باشد" }]}>
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

export default CheckListEdcEdit
