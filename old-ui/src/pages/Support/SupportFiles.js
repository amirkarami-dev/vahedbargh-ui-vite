import React, { useState, useReducer, useEffect } from "react"
import { Modal, Button, Form, Select, Row, Col, Alert, Typography, Space, Divider } from "antd"

import FilePondUpload from "components/Common/FilePondUpload"
import { getCurrentUser, enumToArrayWithoutSort } from "helpers/service_helper"

import GridSupportFiles from "components/Common/GridSupportFiles"
import GridSupportFilesAnt from "components/Common/GridSupportFilesAnt"
import { FileSupportType } from "models/types/file-support-type"

export const SupportFiles = ({ rowData, mainProps, setErrorMessage }) => {
  const { lstSupportFiles } = mainProps
  const [files, setFiles] = useState([])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      supportId: rowData.id,
      fileTypeEnum: 2,
    }
  )
  const [open, setOpen] = useState(false)
  const [fileTypes, setFileTypes] = useState([])
  useEffect(() => {
    setFileTypes(enumToArrayWithoutSort(FileSupportType))
  }, [])

  const handleSelectChange = value => {
    setFormInput({ fileTypeEnum: value })
  }

  const saveToDatabase = async values => {
    const { onAddSupportFile } = mainProps
    if (!files[0]) {
      setErrorMessage && setErrorMessage("برای ذخیره ابتدا فایل را بارگذاری کنید")
      return
    }
    const file = files[0].file
    const fileName = FileSupportType[values.fileTypeEnum]
    const ext = file.name.split(".").pop()
    const formData = new FormData()
    formData.append("file", file, `${fileName}.${ext}`)
    formData.append("supportId", JSON.stringify(values.supportId))
    formData.append("name", `support-${fileName}`)
    formData.append("des", `Upload with-${getCurrentUser().sid}`)
    formData.append("fileTypeEnum", fileName)
    formData.append("FolderName", "Supports")
    formData.append("FileName", `${fileName}.${ext}`)
    formData.append("userId", getCurrentUser().sid)
    formData.append("toUserId", getCurrentUser().sid)
    await onAddSupportFile(formData)
  }

  return (
    <>
      <Button
        size="small"
        type="primary"
        onClick={async () => {
          const { onGetSupportFiles } = mainProps
          await onGetSupportFiles(rowData.id)
          setOpen(true)
        }}
      >
        فایلها
      </Button>

      <Modal
        open={open}
        title={`مدیریت فایل ها: ${rowData.fileNumber}`}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Space direction="vertical" style={{ width: "100%" }} size={12}>
          {mainProps.error ? <Alert type="error" message={mainProps.error} /> : null}
          {mainProps.success ? <Alert type="success" message={mainProps.success} /> : null}

          <Typography.Text strong>پیوست های موجود</Typography.Text>
          <div>
            <GridSupportFilesAnt lstSupportFiles={lstSupportFiles} props={mainProps} />
          </div>

          <Divider />

          <Form layout="vertical" onFinish={() => saveToDatabase(formInput)}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Form.Item label="نوع فایل" required>
                  <Select
                    value={formInput.fileTypeEnum}
                    onChange={handleSelectChange}
                    placeholder="نوع فایل"
                  >
                    {fileTypes
                      .filter(row => row.id !== 0 && row.id !== 3 && row.id !== 5 && row.id !== 6)
                      .map(row => (
                        <Select.Option key={row.id} value={row.id}>
                          {mainProps.t(`enums.${row.name}`)}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <FilePondUpload
                  setFiles={setFiles}
                  maxFileSize="4500KB"
                  allowMultiple={false}
                  maxFiles={1}
                  acceptedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
                  imagePreviewMaxHeight={600}
                  labelText={`${mainProps.t("enums." + FileSupportType[formInput.fileTypeEnum])} را اینجا بکشید`}
                  waterMark={false}
                />
              </Col>
              <Col span={24}>
                <Space>
                  <Button htmlType="submit" type="primary" loading={mainProps.loading}>
                    ذخیره
                  </Button>
                  <Button onClick={() => setOpen(false)}>بستن</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Space>
      </Modal>
    </>
  )
}
