import React, { useState } from "react"
import { Alert, Button, Col, Form, Grid, Input, Modal, Radio, Row, Space, Tag, Typography } from "antd"

export const EppApproved = ({ rowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md

  const [open, setOpen] = useState(false)
  const [panelForm] = Form.useForm()
  const [formValues, setFormValues] = useState({})

  const needElectNetwork = Form.useWatch("needElectNetwork", panelForm)

  const handleSubmit = values => {
    const searchQuery = {
      ...values,
      eppId: rowData.id,
    }
    mainProps.onEppApproved(searchQuery)
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
    panelForm.setFieldsValue({
      des: rowData.description ? rowData.description : "",
      inspectionStatusEnum: 1,
      needElectNetwork: false,
    })
  }

  return (
    <>
      <Button disabled={rowData.electProject.isOk || rowData.inspectionStatus === 3} type="primary" onClick={handleOpen}>
        اعلام نظر
      </Button>

      <Modal
        rootClassName="eng-process-modal"
        title={`تایید پرونده شماره: ${rowData.fileNumber}`}
        centered={!isMobile}
        open={open}
        onCancel={() => setOpen(false)}
        width={isMobile ? "96vw" : 760}
        footer={null}
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Space wrap>
            <Tag color="blue">{`مرحله: ${rowData.projectLevelName || "-"}`}</Tag>
            <Tag color={rowData.electProject.isOk ? "success" : "default"}>
              {rowData.electProject.isOk ? "قبلا تایید شده" : "در انتظار اعلام نظر"}
            </Tag>
          </Space>

          {rowData.projectLevel === 2 && (
            <Alert
              type="warning"
              showIcon
              message="ابتدا برای محاسبه مبلغ تاییدیه ارت، گزینه ذخیره را انتخاب کنید. پس از محاسبه، امکان کنسل پرونده وجود نخواهد داشت."
            />
          )}

          {needElectNetwork && (
            <Alert
              type="info"
              showIcon
              message="در صورت نیاز به احداث شبکه، کروکی احداث شبکه را بارگذاری نمایید."
            />
          )}

          <Form
            form={panelForm}
            onFinish={handleSubmit}
            layout="vertical"
            onValuesChange={(_, values) => setFormValues(values)}
          >
            <Row gutter={[8, 8]}>
              {rowData.projectLevel === 1 && (
                <Col xs={24} md={12}>
                  <Form.Item
                    label="نیاز به احداث شبکه"
                    name="needElectNetwork"
                    rules={[{ required: true, message: "انتخاب این گزینه الزامی است" }]}
                  >
                    <Radio.Group>
                      <Space direction={isMobile ? "vertical" : "horizontal"}>
                        <Radio value={true}>نیاز دارد</Radio>
                        <Radio value={false}>نیاز ندارد</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              )}

              <Col xs={24} md={12}>
                <Form.Item
                  label="وضعیت پرونده"
                  name="inspectionStatusEnum"
                  rules={[{ required: true, message: "یک گزینه را انتخاب کنید" }]}
                >
                  <Radio.Group>
                    <Space direction={isMobile ? "vertical" : "horizontal"}>
                      <Radio value={1}>تایید</Radio>
                      <Radio value={3}>کنسل</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="توضیحات"
                  name="des"
                  rules={[{ required: true, message: "توضیحات الزامی می باشد" }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>

            <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
              <Space>
                <Button htmlType="button" onClick={() => panelForm.resetFields()}>
                  ریست فرم
                </Button>
                <Button
                  disabled={rowData.electProject.isOk || !formValues.des}
                  type="primary"
                  htmlType="submit"
                  loading={mainProps.loading}
                >
                  ذخیره
                </Button>
              </Space>
              <Typography.Text type="secondary">پس از تایید، پرونده وارد مرحله بعد می شود.</Typography.Text>
            </Space>
          </Form>
        </Space>
      </Modal>
    </>
  )
}

export default EppApproved
