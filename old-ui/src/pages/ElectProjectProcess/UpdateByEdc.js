import {
    Alert,
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Modal,
    Progress,
    Radio,
    Row,
    Space,
  } from "antd"
import TextArea from "antd/es/input/TextArea"
  
  import React, { useState, useReducer } from "react"
  export const UpdateByEdc = ({ rowData, mainProps }) => {
    const [open, setOpen] = useState(false)
    const [panelForm] = Form.useForm()
    const [loading, setLoading] = useState(false)
  
    const [formValues, setFormValues] = useState({})
  
    const handleSubmit = values => {
      setLoading(true)
  
      const data = {
        ...values,
        electProjectId: rowData.id,
        electProjectStatusEnum:12
      }
      mainProps.onUpdateByEdc(data)
      setLoading(false)
      setOpen(false)
    }
  
    const handleOpen = () => {
      setOpen(true)
      const FormValue = {
        des: rowData.defectAdminDes,
        ertDefect:false,
        inspectDefect:false
      }
  
      panelForm.setFieldsValue(FormValue)
    }
  
    return (
      <div>
        <Button
          type="default"
          onClick={() => handleOpen()}
          disabled={!(rowData.projectLevelEnum === 8 || rowData.projectLevelEnum === 4 || rowData.projectLevelEnum == 9 || rowData.projectLevelEnum == 5)}
        >
        
          تعیین وضعیت
        </Button>
        <Modal
          title={"اقدامات بر روی پرونده:" + rowData.fileNumber}
          centered
          open={open}
          onCancel={() => setOpen(false)}
          width={"70%"}
          footer={null}
        >
        <Row>
        <Col  span={24}>
          توضیحات شرکت توزیع: <span>{rowData.defectDes}</span>
        </Col>
        <Col  span={24}>
          توضیحات کارشناس: <span>{rowData.defectEngDes}</span>
        </Col>
        <Col  span={24}>
          توضیحات نظام: <span>{rowData.defectAdminDes}</span>
        </Col>
    
     
        </Row>
          <Form
            name="panelForm"
            form={panelForm}
            onFinish={handleSubmit}
            layout="vertical"
            shouldUpdate={true}
            onValuesChange={(_, values) => setFormValues(values)}
          >
            <Row gutter={[8, 8]}>
  
          
              <Col span={24}>
              <Space  direction="horizontal">
                  <Form.Item
                  name="ertDefect"
                  valuePropName="checked"
                  >
                    <Checkbox>نقص در ارت</Checkbox>
                  </Form.Item>
                  <Form.Item
                  name="inspectDefect"
                  valuePropName="checked"
                  >
                    <Checkbox>نقص در بازرسی</Checkbox>
                  </Form.Item>
                  </Space>
              </Col>
              <Col span={24}>
              <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "توضیحات الزامی می باشد",
                    },
                  ]}
                  label="شرح نقص"
                  name="des"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              
              </Col>
            </Row>
            <Row align={"middle"} justify={"space-between"}>
              <Col>
                {mainProps.loading ? (
                  <Progress size={4} percent={100} type="circle" />
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    ذخیره
                  </Button>
                )}
              </Col>
              <Col>
                <Button htmlType="button" onClick={() => panelForm.resetFields()}>
                  ریست فرم
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    )
  }
  