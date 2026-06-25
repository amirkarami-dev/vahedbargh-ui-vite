import React, { useState } from "react"
import {
  Grid,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Modal,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd"
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  TeamOutlined,
} from "@ant-design/icons"

const getStatusColor = status => {
  if (!status) return "default"
  const normalized = String(status).trim()
  if (normalized.includes("تایید") || normalized.includes("انجام")) return "success"
  if (normalized.includes("نقص") || normalized.includes("عدم")) return "error"
  return "processing"
}

export const ProjectProcess = ({ rowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md

  const [open, setOpen] = useState(false)
  const [descriptionOpen, setDescriptionOpen] = useState(false)
  const [selectedDescription, setSelectedDescription] = useState("")
  const [fetching, setFetching] = useState(false)

  const processList = mainProps?.lstEpp || []
  const projectId =
    rowData?.electProject?.id ||
    rowData?.idElectProject ||
    rowData?.electProjectId
  const canOpen = !!projectId

  const doneCount = processList.filter(item => !!item?.solarDateDeliverOffice).length
  const defectCount = processList.filter(item => !!item?.defect).length
  const pendingCount = Math.max(processList.length - doneCount, 0)

  const translateProjectValue = value => {
    if (!value) return "-"
    const key = `project.${value}`
    const translated = mainProps?.t ? mainProps.t(key) : value
    return translated === key ? value : translated
  }

  const openDescription = description => {
    setSelectedDescription(description || "نوشته نشده")
    setDescriptionOpen(true)
  }

  const desktopColumns = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      render: value => value || "-",
    },
    {
      title: "توضیحات کارشناس",
      dataIndex: "description",
      key: "description",
      align: "center",
      render: description => (
        <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => openDescription(description)}>
          مشاهده
        </Button>
      ),
    },
    {
      title: "تاریخ تخصیص",
      dataIndex: "solarRegisterDate",
      key: "solarRegisterDate",
      align: "center",
      render: value => value || "-",
    },
    {
      title: "نوع بازرسی",
      dataIndex: "inspectionTypeName",
      key: "inspectionTypeName",
      align: "center",
      render: value => value || "-",
    },
    {
      title: "مرحله پرونده",
      dataIndex: "projectLevelName",
      key: "projectLevelName",
      align: "center",
      render: value => <Tag color="blue">{translateProjectValue(value)}</Tag>,
    },
    {
      title: "وضعیت",
      dataIndex: "inspectionStatusName",
      key: "inspectionStatusName",
      align: "center",
      render: value => {
        const label = translateProjectValue(value)
        return <Tag color={getStatusColor(label)}>{label}</Tag>
      },
    },
    {
      title: "نقص دارد",
      dataIndex: "defect",
      key: "defect",
      align: "center",
      render: value => <Tag color={value ? "error" : "success"}>{value ? "بله" : "خیر"}</Tag>,
    },
    {
      title: "حضور مجری",
      key: "isPresentExe",
      align: "center",
      render: (_, record) => (
        <Tag color={record?.electProject?.isPresentExe ? "success" : "default"}>
          {record?.electProject?.isPresentExe ? "بله" : "خیر"}
        </Tag>
      ),
    },
    {
      title: "کار انجام شده",
      key: "isWorkDone",
      align: "center",
      render: (_, record) => (
        <Tag color={record?.electProject?.isWorkDone ? "success" : "default"}>
          {record?.electProject?.isWorkDone ? "بله" : "خیر"}
        </Tag>
      ),
    },
    {
      title: "شماره موبایل",
      dataIndex: "cellPhone",
      key: "cellPhone",
      align: "center",
      render: value => value || "-",
    },
  ]

  const mobileColumns = [
    {
      title: "کارشناس",
      dataIndex: "fullName",
      key: "fullName",
      render: value => value || "-",
    },
    {
      title: "وضعیت",
      key: "statusMobile",
      render: (_, record) => {
        const label = translateProjectValue(record?.inspectionStatusName)
        return (
          <Space direction="vertical" size={2}>
            <Tag color={getStatusColor(label)} style={{ marginInlineEnd: 0 }}>
              {label}
            </Tag>
            <Tag color={record?.defect ? "error" : "success"} style={{ marginInlineEnd: 0 }}>
              {record?.defect ? "نقص‌دار" : "بدون نقص"}
            </Tag>
          </Space>
        )
      },
    },
    {
      title: "عملیات",
      dataIndex: "description",
      key: "description",
      render: description => (
        <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => openDescription(description)}>
          مشاهده
        </Button>
      ),
    },
  ]

  const columns = isMobile ? mobileColumns : desktopColumns

  const handleOpen = async () => {
    setOpen(true)
    if (!projectId || !mainProps?.onGetEppByEpId) return
    setFetching(true)
    try {
      await mainProps.onGetEppByEpId(projectId)
    } finally {
      setFetching(false)
    }
  }

  return (
    <>
      <Button
        type="primary"
        size="small"
        icon={<TeamOutlined />}
        onClick={handleOpen}
        disabled={!canOpen}
      >
        نظر کارشناس
      </Button>

      <Modal
        rootClassName="eng-process-modal"
        title={`تخصیص مربوط به پرونده: ${rowData?.fileNumber || "-"}`}
        open={open}
        onCancel={() => setOpen(false)}
        width={isMobile ? "96vw" : 1200}
        styles={{ body: { padding: isMobile ? 12 : 24 } }}
        footer={null}
        centered={!isMobile}
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
            loading={fetching}
            dataSource={processList}
            columns={columns}
            rowKey={record => record.id}
            pagination={false}
            scroll={isMobile ? undefined : { x: 1100 }}
            expandable={
              isMobile
                ? {
                    expandedRowRender: record => (
                      <Descriptions column={1} size="small" colon={false}>
                        <Descriptions.Item label="تاریخ تخصیص">
                          {record?.solarRegisterDate || "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="نوع بازرسی">
                          {record?.inspectionTypeName || "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="مرحله پرونده">
                          {translateProjectValue(record?.projectLevelName)}
                        </Descriptions.Item>
                        <Descriptions.Item label="حضور مجری">
                          {record?.electProject?.isPresentExe ? "بله" : "خیر"}
                        </Descriptions.Item>
                        <Descriptions.Item label="کار انجام شده">
                          {record?.electProject?.isWorkDone ? "بله" : "خیر"}
                        </Descriptions.Item>
                        <Descriptions.Item label="شماره موبایل">
                          {record?.cellPhone || "-"}
                        </Descriptions.Item>
                      </Descriptions>
                    ),
                    expandRowByClick: true,
                  }
                : undefined
            }
            locale={{ emptyText: <Empty description="نظر کارشناس ثبت نشده است" /> }}
          />
        </Space>
      </Modal>

      <Modal
        rootClassName="eng-process-modal"
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
