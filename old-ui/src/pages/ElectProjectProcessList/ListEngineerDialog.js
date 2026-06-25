import { Col, Form, Modal, Row, Select, Button, Progress, Divider, message } from "antd"
import { eppEngChangeApi } from "helpers/backend_helper"
import { GetCityWithSection } from "hooks/returnCityName"
import React, { useEffect, useState } from "react"

export const ListEngineerDialog = ({ rowData, mainProps }) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const { lstEngineer, loadingEng } = mainProps


  const onFinish = async values => {
    let updatedData = {
      idEngineer:values.idEngineer,
      id: rowData.id,
    }
    try {
     await eppEngChangeApi(updatedData)
      message.success("با موفقیت انجام شد رفرش کنید")
    } catch (error) {
      message.error(error)
    }
    finally{
          
    }
 
    setOpen(false)
  }
  const openDialog = () => {
    setOpen(true)
    const { onGetListEngineer } = mainProps
    onGetListEngineer()

    if(rowData.engineer?.id)
    form.setFieldsValue({
      idEngineer: rowData.engineer.id ? rowData.engineer.id : "",
    })
  }

  return (
    <>
      <Button
        type={rowData.engineer?.id ? "dashed" : "primary"}
        onClick={() => openDialog(true)}
      >
        {"تغییر کارشناس"}
      </Button>

      <Modal
        title={"انتخاب کارشناس:" + rowData.fileNumber}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="idEngineer"
                rules={[{ required: true, message: "کارشناس را انتخاب کنید" }]}
                label="کارشناس"
              >
              
                <Select
                  showSearch
                  loading={loadingEng}
                  options={
                    lstEngineer &&
                    lstEngineer.map(engineer => ({
                      value: engineer.id,
                      label: `${engineer.fullName}`
                    }))
                  }
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              {rowData.engineer && (
                <span>
                  کارشناس انتخاب شده: {rowData.engineer.fullName}
                </span>
              )}
            </Col>
          </Row>
          <Divider />
          <Row align={"middle"} justify={"space-between"}>
            <Col>
              {loadingEng ? (
                <Progress size={4} percent={100} type="circle" />
              ) : (
                <Button type="primary" htmlType="submit" loading={loadingEng}>
                  ذخیره
                </Button>
              )}
            </Col>
            <Col>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                ریست فرم
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
