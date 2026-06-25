import React, { useState } from "react"
import {
  Table,
  Button,
  Col,
  Input,
  Modal,
  Progress,
  Row,
  Select,
  Form,
  Radio,
  Space,
  Pagination,
} from "antd"
import { PersianDatePickerInline } from "components/Common/PersianDatePickerInline"
import { getEnums } from "helpers/utilities"
import { ChecklistEdcColumns } from "./checklist-edc-columns"
import CheckListEdcEnum from "models/types/CheckListEdcEnum"
import { EditFilled } from "@ant-design/icons"
const CheckListEdcEdit = ({ mainRowData, rowData, mainProps }) => {
  const [checkListForm] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [solarChecked, setSolarChecked] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  const handleExpand = (expanded, record) => {
    const keys = expanded ? [record.key] : []
    setExpandedRowKeys(keys)
  }
console.log('solarChecked', solarChecked);
  const isRowExpanded = record => expandedRowKeys.includes(record.key)

  const rowClassName = record => {
    if (isRowExpanded(record)) {
      return "expanded-row"
    }
    return ""
  }

  const handleSubmit = values => {
    let updatedData = {
      ...values,
      id: editingId,
      solarChecked: solarChecked.persian,
      electProjectId: mainRowData.id,
      eppId: mainRowData.id,
      deleteId: null
    }
    // delete updatedData.julianChecked
    mainProps.onUpsertCheckList(updatedData)

    setEditingId(null)

    checkListForm.resetFields(['resultDes'])
    // setExpandedRowKeys([])
  }
  // Function to handle edit button click
  const handleEdit = record => {
    checkListForm.setFieldsValue(record)
    // setSolarBirthDate(record.solarBirthDate)
    setEditingId(record.id)
  }

  const handleDelete = record => {
    let dataDelete = {
      deleteId: record.id,
      electProjectId: mainRowData.id,
      checkListEdcEnum: record.checkListEdcEnum,
      eppId: mainRowData.id
    }
    mainProps.onUpsertCheckList(dataDelete)
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  const columnsWithSum = [
    ...ChecklistEdcColumns({
      mainProps,
      handleEdit,
      handleDelete
    }),
  ]
  // columnsWithSum.push({
  //   title: 'SumbranchingCount',
  //   dataIndex: 'branchingCount',
  //   sorter: (a, b) => a.branchingCount - b.branchingCount,
  //   render: (text) => (
  //     <span>
  //       {text}
  //     </span>
  //   ),
  // });

  const treeData = rowData.map(item => ({
    ...item,
    children: item.children || [] // Ensure children property exists
}));

const renderParentRow = (record) => {
  const result = record.children.map((child, index) => (child.resultDes))
  return (<div>
    {result.map((item, index) => (<li>{item}</li>))}
  </div>)
};
  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        گزارش ش توزیع
      </Button>

      <Modal
        title={"چک لیست بازدید:" + mainRowData.landlordName}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={"90%"}
        footer={null}
      >
      <p>توضیح نقص: {mainRowData.defectDes}</p>
        <Form
          name="checkListForm"
          form={checkListForm}
          onFinishFailed={onFinishFailed}
          onFinish={handleSubmit}
        >
     
          <Row gutter={[4, 4]}>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required:  solarChecked.persian?.length !==10,
                    message: 'تاریخ الزامی است',
                  },
                ]}
                label="تاریخ بازدید:"
                name="julianChecked"
              >
                <PersianDatePickerInline
                  defaultDate={checkListForm
                    .getFieldValue("julianChecked")
                    ?.toString()
                    ?.substring(0, 10)}
                  setPersianDate={setSolarChecked}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الزامی می باشد",
                  },
                ]}
                label="مورد بازرسی"
                name="checkListEdcEnum"
                initialValue={checkListForm.getFieldValue("checkListEdcEnum")}
              >
                <Select
                  name="checkListEdcEnum"
                  options={getEnums(CheckListEdcEnum)}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="توضیحات" name="resultDes">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "الزامی می باشد",
                  },
                ]}
                label="انتخاب وضعیت"
                name="isComplete"
                initialValue={checkListForm.getFieldValue("isComplete")}
              >
                <Radio.Group>
                  <Space direction="horizontal">
                    <Radio value={true}> کامل شده</Radio>
                    <Radio value={false}> نقص دارد</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row align={"middle"} justify={"space-between"}>
            <Col>
              {mainProps.loading ? (
                <Progress size={4} percent={100} type="circle" />
              ) : (
                <Button type="primary" htmlType="submit">
              {editingId?'ویرایش':'ذخیره'}
                </Button>
              )}
            </Col>
            <Col>
              <Button
                htmlType="button"
                onClick={() => checkListForm.resetFields(['resultDes'])}
              >
                ریست فرم
              </Button>
            </Col>
          </Row>
          
          <Table
            loading={mainProps.loading}
            size="small"
            pagination={true}
            scroll={{
              y: 150,
              x: 350,
            }}
            rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
            expandable={{
                expandedRowKeys,
                onExpand: handleExpand,
                //expandedRowRender:record=>renderParentRow(record)
                //rowExpandable: record => record.children && record.children.length > 0
            }}
            columns={columnsWithSum}
            rowKey={record => record.key}
            dataSource={[...rowData]}
          />
        </Form>
      </Modal>
    </>
  )
}
export default CheckListEdcEdit
