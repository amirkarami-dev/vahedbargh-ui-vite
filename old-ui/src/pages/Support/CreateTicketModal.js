import React, { useState, useEffect } from "react"
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Checkbox,
  Space,
  Typography,
  Spin,
  message,
} from "antd"
import { PlusOutlined, SendOutlined } from "@ant-design/icons"
import { withTranslation } from "react-i18next"
import FilePondUpload from "components/Common/FilePondUpload"
import { getCurrentUser, serializeQuery, enumToArrayWithoutSort } from "helpers/service_helper"
import { persianToEnglishNumbers } from "helpers/utilities"
import { FileSupportType } from "models/types/file-support-type"

const CreateTicketModal = ({
  visible,
  onCancel,
  onSubmit,
  usersForSupport,
  usersForSupportLoading,
  loading,
  t,
}) => {
  const [form] = Form.useForm()
  const [supportFile, setSupportFile] = useState([])
  const [fileTypes, setFileTypes] = useState([])
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    setFileTypes(enumToArrayWithoutSort(FileSupportType))
  }, [])

  const titleValue = Form.useWatch("title", form)

  const handleFinish = values => {
    let formData = new FormData()

    formData.append("title", values.title)
    formData.append("message", values.message)
    formData.append("sendSms", values.sendSms || false)
    formData.append("fileNumber", persianToEnglishNumbers(values.fileNumber || ""))
    formData.append("toRole", values.toRole || "")
    formData.append("userId", getCurrentUser().sid)
    formData.append("toUserId", form.getFieldValue("toUserId") || "")

    if (supportFile[0]) {
      let file = supportFile[0].file
      const fileName = FileSupportType[values.fileTypeEnum]
      formData.append(
        "file",
        file,
        fileName + "." + file.name.split(".")[file.name.split(".").length - 1]
      )
      formData.append("name", "support-" + fileName)
      formData.append("des", `Upload with-${getCurrentUser().sid}`)
      formData.append("fileTypeEnum", fileName)
      formData.append("FolderName", "Supports")
      formData.append(
        "FileName",
        fileName + "." + file.name.split(".")[file.name.split(".").length - 1]
      )
    }

    onSubmit(formData)
    form.resetFields()
    setSupportFile([])
    message.success("تیکت جدید با موفقیت ارسال شد")
  }

  const handleCancel = () => {
    form.resetFields()
    setSupportFile([])
    onCancel()
  }

  return (
    <Modal
      title={
        <Typography.Title level={4} style={{ margin: 0 }}>
          <PlusOutlined style={{ marginLeft: 8 }} />
          ارسال تیکت جدید
        </Typography.Title>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      destroyOnClose
    >
      <Spin spinning={usersForSupportLoading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onValuesChange={(_, values) => setFormValues(values)}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="موضوع"
                name="title"
                rules={[{ required: true, message: "نباید خالی باشد" }]}
              >
                <Select placeholder="یکی از موضوعات را انتخاب کنید">
                  <Select.Option value="مشکل در پرونده">
                    مشکل در پرونده
                  </Select.Option>
                  <Select.Option value="درخواست افزایش ظرفیت">
                    درخواست افزایش ظرفیت
                  </Select.Option>
                  <Select.Option value="مشکل در حسابداری">
                    مشکل در حسابداری
                  </Select.Option>
                  <Select.Option value="مربوط به اطلاعیه">
                    مربوط به اطلاعیه
                  </Select.Option>
                  <Select.Option value="اخطاریه">اخطاریه</Select.Option>
                  <Select.Option value="سایر">سایر</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="ارسال به"
                name="toUserId"
                rules={[
                  { required: true, message: "انتخاب کاربر الزامی است" },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  loading={usersForSupportLoading}
                  placeholder="کاربر مورد نظر را انتخاب کنید"
                  options={usersForSupport.map(u => ({
                    value: u.id,
                    label: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'بدون نام',
                  }))}
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>

            {titleValue !== "مربوط به اطلاعیه" && (
              <Col xs={24} md={12}>
                <Form.Item label="شماره پرونده" name="fileNumber">
                  <Input
                    style={{ width: "100%" }}
                    placeholder="مثال: 123456"
                  />
                </Form.Item>
              </Col>
            )}

            {getCurrentUser().role === "Administrator" && (
              <Col xs={24} md={12}>
                <Form.Item
                  label="ارسال پیامک"
                  name="sendSms"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
              </Col>
            )}

            <Col span={24}>
              <Form.Item
                rules={[{ required: true, message: "نباید خالی باشد" }]}
                label="توضیحات"
                name="message"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="پیام خود را در اینجا بنویسید"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="نوع فایل را انتخاب کنید"
                name="fileTypeEnum"
              >
                {fileTypes.length > 0 && (
                  <Select
                    defaultActiveFirstOption={true}
                    placeholder="نوع فایل"
                    options={fileTypes.map(row => ({
                      value: row.id,
                      label: t("enums." + row.name),
                    }))}
                  />
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <FilePondUpload
                setFiles={setSupportFile}
                maxFileSize="4500KB"
                allowMultiple={false}
                maxFiles={1}
                acceptedFileTypes={[
                  "image/png",
                  "image/jpeg",
                  "application/pdf",
                ]}
                imagePreviewMaxHeight={300}
                labelText="فایل مربوطه را اینجا بکشید"
              />
            </Col>

            <Col span={24}>
              <Space>
                <Button
                  disabled={loading}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<SendOutlined />}
                >
                  ارسال تیکت
                </Button>
                <Button size="large" onClick={handleCancel}>
                  انصراف
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  )
}

export default withTranslation()(CreateTicketModal)
