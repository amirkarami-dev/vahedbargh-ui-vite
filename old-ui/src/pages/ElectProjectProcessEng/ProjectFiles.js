import React, { useEffect, useReducer, useState } from "react"
import { Alert, Button, Form, Grid, Modal, Select, Space, Typography } from "antd"
import GridFiles from "components/Common/GridFilesAnt"
import FilePondUpload from "components/Common/FilePondUpload"
import { enumToArray, getCurrentUser } from "helpers/service_helper"
import { FileElectProjectType } from "models/types/file-elect-project-type"

export const ProjectFiles = ({ rowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md
  const { lstElectProjectFiles } = mainProps
  const projectId =
    rowData.electProjectId || rowData.idElectProject || rowData.electProject?.id
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [fileElectProjectTypes, setFileElectProjectTypes] = useState([])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      idElectProject: projectId,
      fileTypeEnum: 2,
    }
  )

  useEffect(() => {
    setFileElectProjectTypes(enumToArray(FileElectProjectType))
  }, [])

  const handleInput = value => {
    setFormInput({ fileTypeEnum: value })
  }

  const saveToDatabase = async values => {
    const { onAddFileEngProjectSingle } = mainProps
    const file = files[0].file
    const fileName = FileElectProjectType[values.fileTypeEnum]
    const extension = file.name.split(".").pop()

    const formData = new FormData()
    formData.append("file", file, `${fileName}.${extension}`)
    formData.append("electProjectId", JSON.stringify([values.idElectProject]))
    formData.append("name", `elec-${fileName}`)
    formData.append("des", `Upload with-${getCurrentUser().sid}`)
    formData.append("fileTypeEnum", fileName)
    formData.append("FolderName", "ElectProjects")
    formData.append("FileName", `${fileName}.${extension}`)
    formData.append("userId", getCurrentUser().sid)
    formData.append("toUserId", getCurrentUser().sid)

    await onAddFileEngProjectSingle(formData)
  }

  const handleSubmitForm = async () => {
    setErrorMessage("")

    if (!formInput.idElectProject || !files[0]) {
      setErrorMessage("برای ذخیره ابتدا فایل را بارگذاری کنید")
      return
    }

    await saveToDatabase(formInput)
  }

  return (
    <>
      <Button
        disabled={!projectId}
        onClick={async () => {
          const { onGetProjectFiles } = mainProps
          await onGetProjectFiles(projectId)
          setOpen(true)
        }}
      >
        فایل
      </Button>

      <Modal
        rootClassName="eng-process-modal"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={isMobile ? "96vw" : 980}
        styles={{ body: { padding: isMobile ? 12 : 24 } }}
        title={
          <Space direction="vertical" size={0}>
            <span className="eng-modal-title">مدیریت فایل های پرونده</span>
            <span className="eng-modal-subtitle">{rowData.fileNumber}</span>
          </Space>
        }
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          {errorMessage && <Alert type="warning" showIcon message={errorMessage} />}
          {mainProps.error && <Alert type="error" showIcon message={mainProps.error} />}
          {mainProps.success && <Alert type="success" showIcon message={mainProps.success} />}

          <Typography.Text type="secondary">لیست فایل های پرونده</Typography.Text>
          <GridFiles lstElectProjectFiles={lstElectProjectFiles} props={mainProps} />

          {(rowData.projectLevel !== 2 || getCurrentUser().role === "Engineer") && (
            <Space direction="vertical" size={10} style={{ width: "100%" }}>
              <Typography.Text type="secondary">نیازی به آپلود روی نقشه نیست.</Typography.Text>
              <Form layout="vertical" onFinish={handleSubmitForm}>
                <Form.Item label="نوع فایل" required>
                  <Select
                    value={formInput.fileTypeEnum ? formInput.fileTypeEnum : 2}
                    onChange={handleInput}
                    options={fileElectProjectTypes
                      .filter(row => row.id !== 4)
                      .map(row => ({ value: row.id, label: mainProps.t(`enums.${row.name}`) }))}
                  />
                </Form.Item>

                <Form.Item label="بارگذاری فایل">
                  <FilePondUpload
                    setFiles={setFiles}
                    maxFileSize="4500KB"
                    allowMultiple={false}
                    maxFiles={1}
                    acceptedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
                    imagePreviewMaxHeight={600}
                    labelText={`${mainProps.t(`enums.${FileElectProjectType[formInput.fileTypeEnum]}`)} را اینجا بکشید`}
                    waterMark={false}
                  />
                </Form.Item>

                <Space style={{ justifyContent: "flex-end", width: "100%" }}>
                  <Button onClick={() => setFiles([])}>حذف فایل انتخابی</Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={mainProps.loading}
                    disabled={rowData.projectLevel === 2 && getCurrentUser().role !== "Engineer"}
                  >
                    ذخیره فایل
                  </Button>
                </Space>
              </Form>
            </Space>
          )}
        </Space>
      </Modal>
    </>
  )
}
