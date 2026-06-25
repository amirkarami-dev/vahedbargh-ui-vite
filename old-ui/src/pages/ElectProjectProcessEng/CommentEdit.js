import React, { useMemo, useState } from "react"
import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd"
import { CommentColumns } from "./comment-columns"
import { getEnums } from "helpers/utilities"
import BranchingTypeEnum from "models/types/BranchingTypeEnum"
import FazNumberEnum from "models/types/FazNumberEnum"

const CommentEdit = ({ mainRowData, rowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md

  const [commentForm] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const branchingTypeEnumWatch = Form.useWatch("branchingTypeEnum", commentForm)

  const handleSubmit = values => {
    const updatedData = {
      ...values,
      id: editingId,
      electProjectId: mainRowData.electProjectId,
      deleteId: null,
      eppId: mainRowData.id,
      power: values.power || 0,
      powerSum: values.powerSum || 0,
    }

    mainProps.onUpsertComment(updatedData)
    setEditingId(null)
    commentForm.resetFields()
  }

  const handleEdit = record => {
    commentForm.setFieldsValue(record)
    setEditingId(record.id)
  }

  const handleDelete = record => {
    const dataDelete = {
      ...record,
      id: null,
      deleteId: record.id,
      electProjectId: mainRowData.electProjectId,
      eppId: mainRowData.id,
    }
    mainProps.onUpsertComment(dataDelete)
  }

  const columnsWithSum = useMemo(
    () => [
      ...CommentColumns({
        mainProps,
        handleEdit,
        handleDelete,
      }),
    ],
    [mainProps, rowData]
  )

  const summaryRow = useMemo(() => {
    let branchingCount = 0
    let ampere = 0
    let power = 0
    let powerSum = 0

    for (const row of rowData) {
      if (row.branchingTypeEnum <= 3) {
        branchingCount += row.branchingCount
        ampere += row.ampere
        power += row.power
        powerSum += row.powerSum
      }
    }

    return {
      key: "total",
      branchingTypeEnum: "-",
      fazNumberEnum: "-",
      des: "مجموع کل (به جز انشعاب موجود در محل)",
      branchingCount,
      ampere,
      power,
      powerSum,
    }
  }, [rowData])

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        ویرایش
      </Button>

      <Modal
        rootClassName="eng-process-modal"
        title={`فرم شماره 3: ${mainRowData.landLordName}`}
        centered={!isMobile}
        open={open}
        onCancel={() => setOpen(false)}
        width={isMobile ? "96vw" : "80vw"}
        styles={{ body: { padding: isMobile ? 12 : 20 } }}
        footer={null}
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Space wrap>
            <Tag color="blue">{`مالک: ${mainRowData.landLordName || "-"}`}</Tag>
            <Tag color="purple">{`پرونده: ${mainRowData.fileNumber || "-"}`}</Tag>
          </Space>

          <Form name="commentForm" form={commentForm} onFinish={handleSubmit} layout="vertical">
            <Row gutter={[8, 8]}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="branchingTypeEnum"
                  label="نوع انشعاب"
                  rules={[{ required: true, message: "الزامی می باشد" }]}
                >
                  <Select
                    options={getEnums(BranchingTypeEnum)}
                    onChange={() => {
                      commentForm.setFieldValue("fazNumberEnum", null)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="fazNumberEnum"
                  label="نوع کنتور"
                  rules={[{ required: true, message: "الزامی می باشد" }]}
                >
                  <Select
                    options={getEnums(FazNumberEnum).filter(
                      item => (item.value > 1 && branchingTypeEnumWatch === 4) || (item.value <= 1 && branchingTypeEnumWatch !== 4)
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="branchingCount" label="تعداد انشعاب" rules={[{ required: true, message: "الزامی می باشد" }]}>
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item name="ampere" label="جریان مورد نیاز-آمپر" rules={[{ required: true, message: "الزامی می باشد" }]}>
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>

              {branchingTypeEnumWatch <= 3 && (
                <>
                  <Col xs={24} md={8}>
                    <Form.Item name="power" label="توان مورد نیاز" rules={[{ required: true, message: "الزامی می باشد" }]}>
                      <InputNumber style={{ width: "100%" }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="powerSum" label="مجموع توان مورد نیاز" rules={[{ required: true, message: "الزامی می باشد" }]}>
                      <InputNumber style={{ width: "100%" }} min={0} />
                    </Form.Item>
                  </Col>
                </>
              )}

              <Col span={24}>
                <Form.Item
                  name="des"
                  label={branchingTypeEnumWatch > 3 ? "شماره اشتراک/رمز رایانه/کنتور" : "توضیحات"}
                  rules={branchingTypeEnumWatch > 3 ? [{ required: true, message: "الزامی می باشد" }] : undefined}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>

            <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
              <Space>
                <Button htmlType="button" onClick={() => commentForm.resetFields()}>
                  ریست فرم
                </Button>
                <Button type="primary" htmlType="submit" loading={mainProps.loading}>
                  {editingId ? "ویرایش" : "ذخیره"}
                </Button>
              </Space>
            </Space>
          </Form>

          <Table
            loading={mainProps.loading}
            size="small"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 780, y: isMobile ? 280 : 520 }}
            columns={columnsWithSum}
            rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
            rowKey={record => record.id || record.key}
            dataSource={[...rowData, summaryRow]}
          />
        </Space>
      </Modal>
    </>
  )
}

export default CommentEdit
