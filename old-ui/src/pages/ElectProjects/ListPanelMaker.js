import { Col, Form, Modal, Row, Select, Button, Progress, Divider } from "antd"
import { GetCityWithSection } from "hooks/returnCityName"
import React, { useEffect, useState } from "react"

export const ListPanelMaker = ({ rowData, mainProps }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [panelMakers, setPanelMakers] = useState([])

  const { lstPanelMaker } = mainProps


  const onFinish = values => {
    setLoading(true)
    let updatedData = {
      ...values,
      electProjectId: rowData.id,
    }
    mainProps.onAddPanelMaker(updatedData)
    // Perform any actions like API calls with the form values
    setLoading(false)
    setOpen(false)
  }
  const openDialog = () => {
    setOpen(true)
    const { onGetPanelMaker } = mainProps
    onGetPanelMaker()

    if(rowData.panelMaker?.id)
    form.setFieldsValue({
      panelMakerId: rowData.panelMaker.id ? rowData.panelMaker.id : "",
    })
  }

  return (
    <>
      <Button
        disabled={rowData.isTestAndDelivery}
        type={rowData.panelMaker?.id ? "dashed" : "primary"}
        onClick={() => openDialog(true)}
      >
        {rowData.panelMaker?.id ? "انتخاب شده" : "تابلوساز"}
      </Button>

      <Modal
        title={"انتخاب تابلوساز:" + rowData.fileNumber}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="panelMakerId"
                rules={[{ required: true, message: "تابلوساز را انتخاب کنید" }]}
                label="تابلوساز"
              >
                <Select
                  showSearch
                  options={
                    lstPanelMaker &&
                    lstPanelMaker.map(panelMaker => ({
                      value: panelMaker.id,
                      label: `${panelMaker.companyName}-
                      موبایل:${panelMaker.mobileNumber}-
                      شهر:${GetCityWithSection(panelMaker.idSection)}`,
                    }))
                  }
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              {rowData.panelMaker && (
                <span>
                  تابلوساز انتخاب شده: {rowData.panelMaker.companyName}
                </span>
              )}
            </Col>
          </Row>
          <Divider />
          <Row align={"middle"} justify={"space-between"}>
            <Col>
              {mainProps.loading ? (
                <Progress size={4} percent={100} type="circle" />
              ) : (
                <Button type="primary" htmlType="submit">
                  ذخیره
                </Button>
              )}
            </Col>
            <Col>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                ریست فرم
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
