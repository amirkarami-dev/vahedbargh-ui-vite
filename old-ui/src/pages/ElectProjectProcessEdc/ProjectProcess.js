import React, { useMemo, useState } from "react"
import { Button, Card, Col, Empty, Modal, Row, Space, Statistic, Table, Tag, Typography } from "antd"
import { CheckCircleOutlined, ClockCircleOutlined, EyeOutlined, TeamOutlined } from "@ant-design/icons"

const getStatusColor = status => {
  if (!status) return "default"
  const normalized = String(status).trim()
  if (normalized.includes("تایید") || normalized.includes("انجام")) return "success"
  if (normalized.includes("نقص") || normalized.includes("رد")) return "error"
  return "processing"
}

export const ProjectProcess = ({ rowData }) => {
  const [open, setOpen] = useState(false)
  const [descriptionOpen, setDescriptionOpen] = useState(false)
  const [selectedDescription, setSelectedDescription] = useState("")

  const processList = rowData?.electProjectProcessViewModel || []
  const hasProcess = processList.length > 0

  const doneCount = processList.filter(item => !!item.solarDateDeliverOffice).length
  const pendingCount = Math.max(processList.length - doneCount, 0)
  const defectCount = processList.filter(item => !!item.defect).length

  const columns = useMemo(
    () => [
      {
        title: "توضیحات کارشناس",
        dataIndex: "description",
        key: "description",
        align: "center",
        render: description => (
          <Button
            size="small"
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedDescription(description || "نوشته نشده")
              setDescriptionOpen(true)
            }}
          >
            مشاهده
          </Button>
        ),
      },
      {
        title: "نام و نام خانوادگی",
        dataIndex: "engName",
        key: "engName",
        align: "center",
      },
      {
        title: "شماره موبایل",
        dataIndex: "cellPhone",
        key: "cellPhone",
        align: "center",
        render: value => value || "-",
      },
      {
        title: "تاریخ تخصیص",
        dataIndex: "solarDateDeliverEngineer",
        key: "solarDateDeliverEngineer",
        align: "center",
        render: value => value || "-",
      },
      {
        title: "تاریخ انجام",
        dataIndex: "solarDateDeliverOffice",
        key: "solarDateDeliverOffice",
        align: "center",
        render: value => value || "-",
      },
      {
        title: "مرحله پرونده",
        dataIndex: "projectLevelName",
        key: "projectLevelName",
        align: "center",
        render: value => value || "-",
      },
      {
        title: "وضعیت",
        dataIndex: "inspectionStatusName",
        key: "inspectionStatusName",
        align: "center",
        render: value => <Tag color={getStatusColor(value)}>{value || "-"}</Tag>,
      },
      {
        title: "نقص دارد",
        dataIndex: "defect",
        key: "defect",
        align: "center",
        render: value => <Tag color={value ? "error" : "success"}>{value ? "بله" : "خیر"}</Tag>,
      },
    ],
    []
  )

  return (
    <>
      <Button
        type="primary"
        size="small"
        icon={<TeamOutlined />}
        onClick={() => setOpen(true)}
        disabled={!hasProcess}
      >
        کارشناس
      </Button>

      <Modal
        title={`تخصیص پرونده: ${rowData?.fileNumber || "-"}`}
        open={open}
        onCancel={() => setOpen(false)}
        width={980}
        footer={null}
        centered
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={8}>
              <Card size="small">
                <Statistic title="کل تخصیص" value={processList.length} prefix={<TeamOutlined />} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card size="small">
                <Statistic title="در انتظار" value={pendingCount} prefix={<ClockCircleOutlined />} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card size="small">
                <Statistic title="نقص‌دار" value={defectCount} prefix={<CheckCircleOutlined />} />
              </Card>
            </Col>
          </Row>

          <Table
            bordered
            size="small"
            dataSource={processList}
            columns={columns}
            rowKey={record => record.id}
            pagination={false}
            scroll={{ x: 900 }}
            locale={{ emptyText: <Empty description="تخصیصی ثبت نشده است" /> }}
          />
        </Space>
      </Modal>

      <Modal
        title="توضیحات کارشناس"
        open={descriptionOpen}
        onCancel={() => setDescriptionOpen(false)}
        footer={[
          <Button key="close" onClick={() => setDescriptionOpen(false)}>
            بستن
          </Button>,
        ]}
      >
        <Typography.Paragraph style={{ marginBottom: 0, whiteSpace: "pre-line" }}>
          {selectedDescription}
        </Typography.Paragraph>
      </Modal>
    </>
  )
}
