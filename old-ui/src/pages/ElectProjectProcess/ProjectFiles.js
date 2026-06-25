import React, { useState, useReducer, useEffect } from "react"
import {
  Modal,
  Button,
  Form,
  Select,
  Row,
  Col,
  Alert,
  Typography,
  Space,
  Divider,
} from "antd"
import { FileOutlined } from "@ant-design/icons"
import GridFiles from "components/Common/GridFilesAnt"
import FilePondUpload from "components/Common/FilePondUpload"
import { getCurrentUser, enumToArray } from "helpers/service_helper"
import { FileElectProjectType } from "models/types/file-elect-project-type"

const { Text } = Typography

export const ProjectFiles = ({ rowData, mainProps, setErrorMessage }) => {
  const { lstElectProjectFiles } = mainProps
  const [files, setFiles] = useState([])
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      idElectProject: rowData.id,
      fileTypeEnum: 2,
    }
  )
  const [open, setOpen] = useState(false)
  const [fileElectProjectTypes, setFileElectProjectTypes] = useState([])

  useEffect(() => {
    setFileElectProjectTypes(enumToArray(FileElectProjectType))
  }, [])

  const handleSelectChange = value => {
    setFormInput({ fileTypeEnum: value })
  }

  const saveToDatabase = async values => {
    const { onAddFileElectProjectSingle } = mainProps
    if (!files[0]) {
      setErrorMessage && setErrorMessage("برای ذخیره ابتدا فایل را بارگذاری کنید")
      return
    }
    const file = files[0].file
    const fileName = FileElectProjectType[values.fileTypeEnum]
    const ext = file.name.split(".").pop()
    const formData = new FormData()
    formData.append("file", file, `${fileName}.${ext}`)
    formData.append("electProjectId", JSON.stringify([values.idElectProject]))
    formData.append("name", `elec-${fileName}`)
    formData.append("des", `Upload with-${getCurrentUser().sid}`)
    formData.append("fileTypeEnum", fileName)
    formData.append("FolderName", "ElectProjects")
    formData.append("FileName", `${fileName}.${ext}`)
    formData.append("userId", getCurrentUser().sid)
    formData.append("toUserId", getCurrentUser().sid)
    await onAddFileElectProjectSingle(formData)
  }

  const canUpload =
    rowData.projectLevelEnum !== 2 || getCurrentUser().role === "Administrator"

  const canSave =
    getCurrentUser().role === "Administrator" ||
    getCurrentUser().role === "Section"

  return (
    <>
      <Button
        type="primary"
        size="small"
        icon={<FileOutlined />}
        onClick={async () => {
          const { onGetProjectFiles } = mainProps
          await onGetProjectFiles(rowData.id)
          setOpen(true)
        }}
      >
        فایلها
      </Button>

      <Modal
        open={open}
        title={
          <Space>
            <FileOutlined />
            <span>مدیریت فایل‌های پرونده: {rowData.fileNumber}</span>
          </Space>
        }
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
        width={700}
      >
        <Space direction="vertical" style={{ width: "100%" }} size={16}>
          {mainProps.error ? (
            <Alert type="error" message={mainProps.error} showIcon />
          ) : null}
          {mainProps.success ? (
            <Alert type="success" message={mainProps.success} showIcon />
          ) : null}

          <Text strong>پیوست‌های موجود</Text>
          <GridFiles lstElectProjectFiles={lstElectProjectFiles} props={mainProps} />

          {canUpload && (
            <>
              <Divider style={{ margin: "8px 0" }} />
              <Form
                layout="vertical"
                onFinish={() => saveToDatabase(formInput)}
              >
                <Row gutter={[12, 4]}>
                  <Col span={24}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      نیازی به آپلود روی نقشه نیست
                    </Text>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="نوع فایل" required>
                      <Select
                        value={formInput.fileTypeEnum ?? 2}
                        onChange={handleSelectChange}
                        placeholder="نوع فایل را انتخاب کنید"
                      >
                        {fileElectProjectTypes.map(row => (
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
                      acceptedFileTypes={[
                        "image/png",
                        "image/jpeg",
                        "application/pdf",
                      ]}
                      imagePreviewMaxHeight={600}
                      labelText={`${mainProps.t(
                        "enums." +
                          FileElectProjectType[formInput.fileTypeEnum]
                      )} را اینجا بکشید`}
                      waterMark={false}
                    />
                  </Col>
                  <Col span={24}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={mainProps.loading}
                      disabled={!canSave}
                      block
                    >
                      ذخیره
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </Space>
      </Modal>
    </>
  )
}
