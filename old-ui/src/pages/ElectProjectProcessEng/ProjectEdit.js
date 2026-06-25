import React, { useMemo, useState } from "react"
import {
  Alert,
  Button,
  Col,
  Form,
  Grid,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  Tag,
  Typography,
} from "antd"
import { serializeQuery } from "helpers/service_helper"

const ProjectEdit = ({ rowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const defaultValues = useMemo(
    () => ({
      inspectionStatus: 1,
      description: "",
      defect: false,
      packageNeed: "true",
      isWorkDone: "false",
      isPresentExe: "true",
      totalPipeUse: rowData.totalPipeUse ? rowData.totalPipeUse : 0,
      packageSerialNumber: rowData.packageSerialNumber,
    }),
    [rowData]
  )

  const resetForm = () => {
    form.setFieldsValue(defaultValues)
  }

  const handleOpen = () => {
    resetForm()
    setOpen(true)
  }

  const confirmAction = content =>
    new Promise(resolve => {
      Modal.confirm({
        title: "تایید عملیات",
        content,
        okText: "تایید",
        cancelText: "انصراف",
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      })
    })

  const handleSubmit = async values => {
    const {
      onUpdateProcessExpertStageNew,
      onUpdateProcessMapStageNew,
      onUpdateProcessDefectStageNew,
    } = mainProps

    const mapToSave = {
      ...values,
      inspectionStatus: +values.inspectionStatus,
      solarDateDeliverEngineer: rowData.solarDateDeliverEngineer,
      julianDateDeliverEngineer: rowData.julianDateDeliverEngineer,
      idQuarterTariff: rowData.quarterTariff?.id,
      idElectProject: rowData.idElectProject,
      idElectProjectProcess: rowData.id,
      packageNeed: values.packageNeed === "true" || values.packageNeed === true,
      isWorkDone: values.isWorkDone === "true" || values.isWorkDone === true,
      isPresentExe: values.isPresentExe === "true" || values.isPresentExe === true,
      totalPipeUse: +values.totalPipeUse,
      packageSerialNumber: values.packageSerialNumber,
    }

    const payload = { process: mapToSave, queryString: serializeQuery({ idFile: rowData.idFile }) }

    if (rowData.projectLevel === 4 && mapToSave.inspectionStatus === 2) {
      const ok = await confirmAction("آیا مطمئن هستید که این پرونده را تایید نمی کنید؟")
      if (!ok) return
      await onUpdateProcessExpertStageNew(payload)
    } else if (rowData.projectLevel === 4 && mapToSave.inspectionStatus === 3) {
      const ok = await confirmAction("آیا مطمئن هستید که این پرونده را قبول نمی کنید؟")
      if (!ok) return
      await onUpdateProcessExpertStageNew(payload)
    } else if (rowData.projectLevel === 4) {
      const ok = await confirmAction(
        mapToSave.packageNeed
          ? "گزینه نیاز به پکیج/آبگرمکن دیواری فن دار فعال است. ادامه می دهید؟"
          : "گزینه عدم نیاز به پکیج/آبگرمکن دیواری فن دار فعال است. ادامه می دهید؟"
      )
      if (!ok) return
      await onUpdateProcessExpertStageNew(payload)
    } else if (rowData.projectLevel === 5) {
      const ok = await confirmAction(`آیا از ذخیره مرحله نقشه برای مالک ${rowData.landLordName} مطمئن هستید؟`)
      if (!ok) return
      await onUpdateProcessMapStageNew(payload)
    } else if (rowData.projectLevel === 3) {
      const ok = await confirmAction(`آیا از ذخیره مرحله نقص برای مالک ${rowData.landLordName} مطمئن هستید؟`)
      if (!ok) return
      await onUpdateProcessDefectStageNew(payload)
    } else {
      await onUpdateProcessExpertStageNew(payload)
    }

    setOpen(false)
  }

  if (rowData.inspectionStatus !== 0) {
    return (
      <Button
        onClick={() => {
          Modal.info({
            title: "توضیحات کارشناس",
            content: rowData.description || "نوشته نشده",
            okText: "بستن",
            centered: true,
          })
        }}
      >
        نمایش
      </Button>
    )
  }

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        اعلام نظر
      </Button>

      <Modal
        rootClassName="eng-process-modal"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={isMobile ? "96vw" : 760}
        styles={{ body: { padding: isMobile ? 12 : 24 } }}
        title={
          <Space direction="vertical" size={0}>
            <span className="eng-modal-title">اعلام نظر مرحله کارشناسی</span>
            <span className="eng-modal-subtitle">{rowData.landLordName}</span>
          </Space>
        }
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Space wrap>
            <Tag color="blue">{`پرونده: ${rowData.fileNumber}`}</Tag>
            <Tag color="purple">{`مالک: ${rowData.landLordName}`}</Tag>
            <Tag color="geekblue">{`طبقه: ${
              rowData.numberOfFloor === 0 ? (rowData.unitNumber > 1 ? "چند واحدی" : "همکف") : rowData.numberOfFloor
            }`}</Tag>
          </Space>

          {mainProps.error && <Alert type="error" showIcon message={mainProps.error} />}
          {mainProps.success && <Alert type="success" showIcon message={mainProps.success} />}

          <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={defaultValues}>
            <Form.Item
              label="تعیین وضعیت"
              name="inspectionStatus"
              rules={[{ required: true, message: "انتخاب وضعیت الزامی است" }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>کارشناسی انجام شد</Radio>
                  {rowData.projectLevel === 4 && <Radio value={2}>انشعاب تعلق نمی گیرد / عدم همکاری مجری-مالک</Radio>}
                  <Radio value={3}>عدم قبول پرونده (کنسل)</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="توضیحات"
              name="description"
              rules={[{ required: true, message: "توضیحات الزامی است" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Row justify="space-between" align="middle">
              <Col>
                <Typography.Text type="secondary">پس از بررسی کامل، وضعیت نهایی را ذخیره کنید.</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Button onClick={resetForm}>بازنشانی</Button>
                  <Button type="primary" htmlType="submit" loading={mainProps.loading}>
                    ذخیره
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

export { ProjectEdit }
export default ProjectEdit
