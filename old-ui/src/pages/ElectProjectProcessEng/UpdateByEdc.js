import React, { useState } from "react"
import { Alert, Button, Col, Form, Grid, Input, Modal, Row, Space, Typography } from "antd"

export const UpdateByEdc = ({ rowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md
  const [open, setOpen] = useState(false)
  const [panelForm] = Form.useForm()
  const [formValues, setFormValues] = useState({})

  const canSave = (rowData.electProject?.isDefectEng || rowData.electProject?.solvedDefectEng) && rowData.inspectionStatus === 0

  const handleSubmit = values => {
    const data = {
      ...values,
      electProjectId: rowData.electProjectId,
      electProjectStatusEnum: rowData.electProject.electProjectStatusEnum,
    }
    mainProps.onUpdateByEdc(data)
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
    panelForm.setFieldsValue({ des: rowData.electProject.defectEngDes })
  }

  return (
    <>
      <Button onClick={handleOpen}>تعیین وضعیت</Button>

      <Modal
        rootClassName="eng-process-modal"
        title={`اقدامات بر روی پرونده: ${rowData.fileNumber}`}
        centered={!isMobile}
        open={open}
        onCancel={() => setOpen(false)}
        width={isMobile ? "96vw" : 760}
        styles={{ body: { padding: isMobile ? 12 : 24 } }}
        footer={null}
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Alert
            message="بعد از رفع نقص توضیحات را نوشته و ذخیره کنید. جهت تایید نهایی، اعلام نظر نیز انجام شود."
            type="info"
            showIcon
          />

          <Row gutter={[10, 10]}>
            <Col xs={24} md={8}>
              <Typography.Text strong>توضیحات شرکت توزیع:</Typography.Text>
              <Typography.Paragraph>{rowData.electProject.defectDes || "-"}</Typography.Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <Typography.Text strong>توضیحات کارشناس:</Typography.Text>
              <Typography.Paragraph>{rowData.electProject.defectEngDes || "-"}</Typography.Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <Typography.Text strong>توضیحات نظام:</Typography.Text>
              <Typography.Paragraph>{rowData.electProject.defectAdminDes || "-"}</Typography.Paragraph>
            </Col>
          </Row>

          <Form
            form={panelForm}
            onFinish={handleSubmit}
            layout="vertical"
            onValuesChange={(_, values) => setFormValues(values)}
          >
            <Form.Item
              label="توضیحات"
              name="des"
              rules={[{ required: true, message: "توضیحات الزامی می باشد" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
              <Space>
                <Button type="primary" htmlType="submit" loading={mainProps.loading} disabled={!formValues.des || !canSave}>
                  ذخیره
                </Button>
                {!canSave && (
                  <Typography.Text type="secondary">
                    تعیین وضعیت فقط در حالت انتظار تایید و هنگام ثبت نقص قابل انجام است.
                  </Typography.Text>
                )}
              </Space>
              <Button htmlType="button" onClick={() => panelForm.resetFields()}>
                ریست فرم
              </Button>
            </Space>
          </Form>
        </Space>
      </Modal>
    </>
  )
}

export default UpdateByEdc
