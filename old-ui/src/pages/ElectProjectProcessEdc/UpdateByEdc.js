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
      }
      mainProps.onUpdateByEdc(data)
      setLoading(false)
      setOpen(false)
    }
  
    const handleOpen = () => {
      setOpen(true)
      const FormValue = {
        des: rowData.defectDes,
        electProjectStatusEnum: rowData.electProjectStatusEnum
      }
  
      panelForm.setFieldsValue(FormValue)
    }
  
    return (
      <div>
        <Button
          type="default"
          onClick={() => handleOpen()}
          disabled={rowData.projectLevelEnum !==8}
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
          <Form
            name="panelForm"
            form={panelForm}
            onFinish={handleSubmit}
            layout="vertical"
            shouldUpdate={true}
            onValuesChange={(_, values) => setFormValues(values)}
          >
            <Row gutter={[8, 8]}>
  
              <Col span={16}>
                {panelForm.getFieldValue("needElectNetwork") && (
                  <Alert
                    type="info"
                    message="در صورت نیاز به احداث شبکه=> کروکی احداث شبکه را آپلود نمایید"
                  />
                )}
              </Col>
              {rowData.projectLevel ===1 && (
                <Col span={16}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "الزامی می باشد",
                      },
                    ]}
                    label="نیاز به احداث شبکه"
                    name="needElectNetwork"
                    initialValue={false}
                  >
                    <Radio.Group>
                      <Space direction="horizontal">
                        <Radio value={true}> نیاز دارد</Radio>
                        <Radio value={false}> نیاز ندارد</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              )}
              <Col span={16}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "الزامی می باشد",
                    },
                  ]}
                  label="یک گزینه را انتخاب کنید"
                  name="electProjectStatusEnum"
                  initialValue={1}
                >
                  <Radio.Group>
                    <Space direction="horizontal">
                      <Radio value={8}> تایید</Radio>
                      <Radio value={6}> نقص</Radio>
                      <Radio value={10}> بایگان</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
              {panelForm.getFieldValue("electProjectStatusEnum") === 6 && 
              <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "توضیحات الزامی می باشد",
                    },
                  ]}
                  label="توضیحات"
                  name="des"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              }
              
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
  