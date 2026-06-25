import React, { useEffect, useMemo, useState } from "react"
import { CopyOutlined } from "@ant-design/icons"
import {
  Alert,
  Button,
  Col,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd"
import { serializeQuery } from "helpers/service_helper"

const ProjectDetails = ({ rowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm()

  const ownershipTypeEnum = Form.useWatch("ownershipTypeEnum", form)
  const unitNumber = Form.useWatch("unitNumber", form)

  const initialValues = useMemo(
    () => ({
      landlordName: rowData.landLordName,
      ownershipTypeEnum: rowData.ownershipTypeEnum,
      companyName: rowData.companyName,
      landlordNaCode: rowData.landlordNaCode,
      landlordPhoneNumber: rowData.landlordPhoneNumber,
      postalCode: rowData.postalCode,
      area: rowData.area,
      address: rowData.address,
      numberOfFloor: rowData.numberOfFloor,
      buildingType: rowData.buildingType,
      packageNeed: rowData.packageNeed,
      pipingTypeEnum: rowData.pipingTypeEnum,
      unitNumber: rowData.unitNumber,
    }),
    [rowData]
  )

  useEffect(() => {
    if (open) form.setFieldsValue(initialValues)
  }, [open, initialValues])

  const handleSubmit = async values => {
    const { onUpdateElectProjectEngNew } = mainProps

    const mapToSave = {
      ...values,
      id: rowData.idElectProject,
      buildingTypeEnum: +values.buildingType,
      packageNeed: values.packageNeed === "true" || values.packageNeed === true,
      pipingTypeEnum: +values.pipingTypeEnum,
      unitNumber: +values.unitNumber,
    }

    setSubmitting(true)
    try {
      await onUpdateElectProjectEngNew({
        process: mapToSave,
        queryString: serializeQuery({ idFile: rowData.idFile }),
      })
      setOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Space size={4}>
        <Button type="link" onClick={() => setOpen(true)} style={{ paddingInline: 0 }}>
          {rowData.fileNumber}
        </Button>
        <Tooltip title="کپی شماره پرونده">
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={async () => {
              await navigator.clipboard.writeText(rowData.fileNumber || "")
              message.success("شماره پرونده کپی شد")
            }}
          />
        </Tooltip>
      </Space>

      <Modal
        rootClassName="eng-process-modal"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={isMobile ? "96vw" : 900}
        styles={{ body: { padding: isMobile ? 12 : 24 } }}
        title={
          <Space direction="vertical" size={0}>
            <span className="eng-modal-title">اطلاعات پرونده</span>
            <span className="eng-modal-subtitle">ویرایش اطلاعات مالک و آدرس پرونده</span>
          </Space>
        }
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Space wrap>
            <Tag color="blue">{`پرونده: ${rowData.fileNumber || "-"}`}</Tag>
            <Tag color="purple">{`تاریخ ثبت: ${rowData.solarRegisterDate || "-"}`}</Tag>
          </Space>

          {mainProps.error && <Alert type="error" showIcon message={mainProps.error} />}
          {mainProps.success && <Alert type="success" showIcon message={mainProps.success} />}

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={[12, 8]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="نام و نام خانوادگی مالک"
                  name="landlordName"
                  rules={[{ required: true, message: "نام مالک الزامی است" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              {ownershipTypeEnum === 2 && (
                <Col xs={24} md={12}>
                  <Form.Item
                    label="نام شرکت"
                    name="companyName"
                    rules={[{ required: true, message: "نام شرکت الزامی است" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              )}

              <Col xs={24} md={12}>
                <Form.Item
                  label="کد ملی مالک/شرکت"
                  name="landlordNaCode"
                  rules={[
                    { required: true, message: "کد ملی الزامی است" },
                    { len: 10, message: "کد ملی باید 10 رقم باشد" },
                  ]}
                >
                  <Input maxLength={10} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="شماره تماس مالک"
                  name="landlordPhoneNumber"
                  rules={[
                    { required: true, message: "شماره تماس الزامی است" },
                    { len: 11, message: "شماره تماس باید 11 رقم باشد" },
                  ]}
                >
                  <Input maxLength={11} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="کد پستی"
                  name="postalCode"
                  rules={[
                    { required: true, message: "کد پستی الزامی است" },
                    { len: 10, message: "کد پستی باید 10 رقم باشد" },
                  ]}
                >
                  <Input maxLength={10} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="مساحت (مترمربع)" name="area" rules={[{ required: true, message: "مساحت الزامی است" }]}>
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="تعداد واحد" name="unitNumber" rules={[{ required: true, message: "تعداد واحد الزامی است" }]}>
                  <InputNumber style={{ width: "100%" }} min={1} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="تعداد طبقات" name="numberOfFloor" rules={[{ required: true, message: "تعداد طبقات الزامی است" }]}>
                  <InputNumber style={{ width: "100%" }} min={0} disabled={+unitNumber > 1 || +unitNumber <= 0} />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="آدرس" name="address" rules={[{ required: true, message: "آدرس الزامی است" }]}>
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between" align="middle">
              <Col>
                <Typography.Text type="secondary">برای ذخیره اطلاعات پرونده، دکمه ذخیره را بزنید.</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Button onClick={() => form.resetFields()}>بازنشانی</Button>
                  <Button type="primary" htmlType="submit" loading={submitting || mainProps.loading}>
                    ذخیره تغییرات
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Space>
      </Modal>
    </>
  )
}

export default ProjectDetails
