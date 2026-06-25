import React, { useState } from "react"
import {
  Table,
  Button,
  Col,
  Divider,
  Input,
  Modal,
  Progress,
  Row,
  Select,
  Form,
  Checkbox,
} from "antd"
import { PersianDatePickerInline } from "components/Common/PersianDatePickerInline"
import { EngHistoryColumns } from "./eng-history-columns"
import EngGradeTypeEnum from "models/types/EngGradeTypeEnum"
import { getEnums } from "helpers/utilities"
import { EditFilled } from "@ant-design/icons"
import WorkPermitTypeEnum from "models/types/WorkPermitTypeEnum"
const EngHistoryEdit = ({
   mainRowData,
   rowData,
   mainProps
  }) => {

  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [solarValidityDate, setSolarValidityDate] = useState("")
  const [solarIssueDate, setSolarIssueDate] = useState("")
  const [editingId, setEditingId] = useState(null)



  const handleSubmit = values => {


      let updatedData = {
        ...values,
        solarValidityDate: solarValidityDate.persian,
        solarIssueDate: solarIssueDate.persian,
        engId:mainRowData.id,
        id: editingId,
      }
      // delete updatedData.julianValidityDate
      // delete updatedData.julianIssueDate
      // delete updatedData.julianDateIs2p
      mainProps.onUpsertEngHistory(updatedData)

      // setData(updatedData)

      setEditingId(null)

    form.resetFields()
  }
  // Function to handle edit button click
  const handleEdit = record => {
    form.setFieldsValue(record)
    // setSolarBirthDate(record.solarBirthDate)
    setEditingId(record.id)
  }
  return (
    <>
      <Button icon={<EditFilled />} size="small" type="default" onClick={() => setOpen(true)}>
        ویرایش پروانه
      </Button>

      <Modal
        title={"ویرایش پروانه کارشناس:" + mainRowData.fullName}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        footer={null}
      >
          <Form name="engHistoryForm" form={form} onFinish={handleSubmit}>
          <Row gutter={[8, 8]}>
          <Col>
              <Form.Item
                required
                label="تاریخ اخذ پروانه:"
                name="julianIssueDate"
              >
                <PersianDatePickerInline
                  defaultDate={form
                    .getFieldValue("julianIssueDate")
                    ?.toString()
                    ?.substring(0, 10)}
                  setPersianDate={setSolarIssueDate}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                required
                label="تاریخ اعتبار پروانه:"
                name="julianValidityDate"
              >
                <PersianDatePickerInline
                  defaultDate={form
                    .getFieldValue("julianValidityDate")
                    ?.toString()
                    ?.substring(0, 10)}
                  setPersianDate={setSolarValidityDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item
                required
                label="اجازه کار"
                name="workPermission"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                required
                label="پایه"
                name="engineerGradeTypeEnum"
                initialValue={form.getFieldValue("engineerGradeTypeEnum")}
              >
                <Select
                  style={{ width: 200 }}
                  name="engineerGradeTypeEnum"
                  options={getEnums(EngGradeTypeEnum)}
                />
              </Form.Item>
            </Col>
                        <Col>
              <Form.Item
                required
                label="نوع مجوز"
                name="workPermitTypeEnum"
                initialValue={form.getFieldValue("workPermitTypeEnum")}
              >
                <Select
                  style={{ width: 200 }}
                  name="workPermitTypeEnum"
                  defaultActiveFirstOption
                  options={getEnums(WorkPermitTypeEnum)}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                required
                label="شماره پروانه"
                name="workPermitNum"
              >
                <Input/>
              </Form.Item>
            </Col>
          </Row>

          <Divider></Divider>
          <Row>
            <Col>
              {mainProps.loading ? (
                <Progress size={4}  percent={100}   type="circle" />
              ) : (
                <Button type="primary" htmlType="submit">
                  ذخیره
                </Button>
              )}
              <Button htmlType="button" onClick={() => form.resetFields()}>
                ریست فرم
              </Button>
            </Col>
          </Row>

          <Table
            loading={mainProps.loading}
            size="small"
            pagination={true}
            scroll={{
              y: 670,
              x: 700,
            }}
            sticky
            columns={EngHistoryColumns({
              mainProps,
              handleEdit,
            })}
            rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
            rowKey={record => record.id}
            dataSource={[...rowData]}
          />
        </Form>
      </Modal>
    </>
  )
}
export default EngHistoryEdit
