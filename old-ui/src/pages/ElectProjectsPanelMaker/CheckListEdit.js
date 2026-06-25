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
import InspectionDesEnum from "models/types/InspectionDesEnum"
import { ChecklistColumns } from "./checklist-columns"
const CheckListEdit = ({ mainRowData, rowData, mainProps }) => {
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
      electProjectId: mainRowData.electProjectId,
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
      electProjectId: mainRowData.electProjectId,
      inspectionDesEnum: record.inspectionDesEnum

    }
    mainProps.onUpsertCheckList(dataDelete)
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  const columnsWithSum = [
    ...ChecklistColumns({
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
      <Button type="primary" onClick={() => setOpen(true)}>
        نمایش
      </Button>

      <Modal
        title={"چک لیست بازدید:" + mainRowData.landLordName}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={"80%"}
        footer={null}
      >

     

          <Table
            loading={mainProps.loading}
            size="small"
            pagination={true}
            scroll={{
              y: 370,
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
   
      </Modal>
    </>
  )
}
export default CheckListEdit
