import { Button, Checkbox, Col, Form, Input, Modal, Progress, Row } from "antd"

import React, { useState, useReducer } from "react"

export const ElectPanelSubmit = ({ rowData, mainProps }) => {

  const [open, setOpen] = useState(false)
  const [panelForm] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = values => {
    setLoading(true)

    const searchQuery = {
      ...values,
      id: rowData.id
    }
    mainProps.onPanelSubmit(searchQuery)
    setLoading(false)
    setOpen(false)

  }

  const handleOpen = () => {
    setOpen(true)
    const FormValue = {
        panelSerialNumber:rowData.panelSerialNumber,
        } 
      
    panelForm.setFieldsValue(FormValue)

  }

  return (
    <div>
      <Checkbox  checked={rowData.panelMakerSubmit}
            onChange={e => handleOpen()}
          />
      <Modal
        title={"تایید کردن پرونده شماره:" + rowData.fileNumber}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={"70%"}
        footer={null}
      >
        <Form
          name="panelForm"
          form={panelForm}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Form.Item 
               rules={[
                  {
                    required:true,
                    message: 'شماره سریال الزامی است',
                  },
                ]}
              label="شماره سریال تابلو" name="panelSerialNumber">
                <Input.TextArea rows={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row align={"middle"} justify={"space-between"}>
            <Col>
              {mainProps.loading ? (
                <Progress size={4} percent={100} type="circle" />
              ) : (
                <Button type="primary" htmlType="submit">
                  ذخیره
                </Button>
              )}
            </Col>
            <Col>
              <Button
                htmlType="button"
                onClick={() => panelForm.resetFields()}
              >
                ریست فرم
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}
