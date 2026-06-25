import React, { useState } from "react"
import {
  Grid,
  Form,
  Input,
  Select,
  Button,
  Modal,
  Row,
  Col,
  InputNumber,
  Divider,
} from "antd"
import { MaskedInput } from "antd-mask-input"
import BuildingTypeEnum from "models/types/BuildingTypeEnum"
import { getEnums } from "helpers/utilities"

const { Option } = Select

const ErtFormEdit = ({ mainRowData, mainProps }) => {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md
  const [ertForm] = Form.useForm()
    const [open, setOpen] = useState(false)
  
  const onFinish = values => {
        let updatedData = {
      ...values,
      id: mainRowData.electProjectErtForm.id,
      eppId: mainRowData.id,
    }
    // delete updatedData.julianValidityDate
    mainProps.onUpsertErtForm(updatedData)
    console.log("Received values:", values)
    // Perform any actions like API calls with the ertForm values
      }

  const openDialog = () => {
    setOpen(true)
    const ertFormValue = {
      ...mainRowData.electProjectErtForm,
      constructionDate:
        mainRowData.electProjectErtForm.constructionDate?.replaceAll("/", ""),
      measurementDate:
        mainRowData.electProjectErtForm.measurementDate?.replaceAll("/", ""),
      buildingTypeEnum: mainRowData.electProject.buildingTypeEnum,
    }

    ertForm.setFieldsValue(ertFormValue)
    setTimeout(() => {
      ertForm.validateFields(["electrodeUsageTypeEnum", "electrodeTypeEnum"])
    }, 0)
  }

  return (
    <>
      <Button type="primary" onClick={() => openDialog()}>
        ارت
      </Button>

      <Modal
        rootClassName="eng-process-modal"
        title={"شناسنامه سیستم ارت:" + mainRowData.landLordName}
        centered={!isMobile}
        open={open}
        onCancel={() => setOpen(false)}
        width={isMobile ? "96vw" : "80vw"}
        styles={{ body: { padding: isMobile ? 12 : 20 } }}
        footer={null}
      >
        <div
          style={{ maxHeight: "76vh", overflowY: "auto", overflowX: "hidden" }}
        >
          <Form
            name="ertForm"
            form={ertForm}
            onFinish={onFinish}
            layout="vertical"
          >
            <Divider>مشخصات کلی الکترود</Divider>
            <Row align={"middle"} justify={"space-between"} gutter={16}>
              {/* کاربری ساختمان  */}
              <Col xs={24} md={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "الزامی می باشد",
                    },
                    {
                      validator: async (_, value) => {
                        if (value === 0 || value === "0" || !value) {
                          throw new Error("لطفا نوع ساختمان را انتخاب کنید")
                        }
                      },
                    },
                  ]}
                  label="کاربری ساختمان"
                  name="buildingTypeEnum"
                  initialValue={ertForm.getFieldValue("buildingTypeEnum")}
                >
                  <Select
                    name="buildingTypeEnum"
                    options={getEnums(BuildingTypeEnum)}
                  />
                </Form.Item>
              </Col>
              {/* آدرس محل قرارگیری */}
              <Col xs={24} md={16}>
                <Form.Item
                  width={"100%"}
                  name="electrodeAddress"
                  label="آدرس محل قرارگیری الکترود"
                  rules={[
                    {
                      required: true,
                      message: "آدرس محل قرارگیری الکترود را وارد کنید",
                    },
                  ]}
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            </Row>

            {/* مختصات جغرافیایی */}
            <Row align={"middle"} justify={"space-between"}>
              <Col xs={24} md={6}>
                <Form.Item
                  label="مختصات جغرافیایی قرارگیری الکترود"
                  rules={[
                    {
                      required: true,
                      message: "مختصات جغرافیایی قرارگیری الکترود را وارد کنید",
                    },
                  ]}
                ></Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  name="utmX"
                  dir="ltr"
                  label="x"
                  rules={[{ required: true, message: "مختصات x را وارد کنید" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  dir="ltr"
                  name="utmY"
                  label="y"
                  rules={[{ required: true, message: "مختصات y را وارد کنید" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  name="constructionDate"
                  label="تاریخ احداث الکترود"
                  rules={[
                    {
                      required: true,
                      message: "تاریخ احداث الکترود را وارد کنید",
                    },
                  ]}
                >
                  <MaskedInput
                    dir="ltr"
                    mask={"1400/00/00"}
                    placeholder="1403/12/12"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* نوع روش نوع الکترود جنس الکترود */}
            <Row align={"middle"} justify={"space-between"}>
              {/* نوع کاربری الکترود */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="electrodeUsageTypeEnum"
                  label="نوع کاربری الکترود"
                  rules={[
                    {
                      required: true,
                      message: "نوع کاربری الکترود را وارد کنید",
                      validator: (_, value) => {
                        if (value === 0 || value === "0") {
                          return Promise.reject(
                            new Error(" نوع کاربری را وارد کنید")
                          )
                        }
                        return Promise.resolve()
                      },
                    },
                  ]}
                >
                  <Select
                    fieldNames={{ value: "value", label: "children" }}
                    placeholder="انتخاب کنید"
                  >
                    <Option value={0}>نامشخص</Option>
                    <Option value={5}>الکترود زمین حفاظتی</Option>
                    <Option value={1}>الکترود زمین ایمنی</Option>
                    <Option value={2}>الکترود زمین صاعفه گیر</Option>
                    <Option value={3}>الکترود زمین عملکردی</Option>
                    <Option value={4}>سایر</Option>
                  </Select>
                </Form.Item>
              </Col>
              {ertForm.getFieldValue("electrodeUsageTypeEnum") === 4 && (
                <Col xs={24} md={12}>
                  <Form.Item
                    width={"100%"}
                    name="electrodeUsageTypeOther"
                    label="سایر نوع کاربری"
                    rules={[
                      {
                        required: true,
                        message: "سایر نوع کاربری را وارد کنید",
                      },
                    ]}
                  >
                    <Input.TextArea rows={1} />
                  </Form.Item>
                </Col>
              )}
              {/* روش اجرای الکترود */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="electrodeExecuteTypeEnum"
                  label="روش اجرای الکترود"
                  rules={[
                    {
                      required: true,
                      message: "روش اجرای الکترود را وارد کنید",
                    },
                  ]}
                >
                  <Select placeholder="انتخاب کنید">
                    <Option value={0}>نامشخص</Option>
                    <Option value={1}>قائم - کوبشی</Option>
                    <Option value={2}>قائم - عمیق</Option>
                    <Option value={3}>قائم - حفر چاه</Option>
                    <Option value={4}>افقی</Option>
                    <Option value={5}>سایر</Option>
                  </Select>
                </Form.Item>
              </Col>
              {ertForm.getFieldValue("electrodeExecuteTypeEnum") === 5 && (
                <Col xs={24} md={12}>
                  <Form.Item
                    width={"100%"}
                    name="electrodeExecuteTypeOther"
                    label="سایر روش اجرایی"
                    rules={[
                      {
                        required: true,
                        message: "سایر روش اجرایی را وارد کنید",
                      },
                    ]}
                  >
                    <Input.TextArea rows={1} />
                  </Form.Item>
                </Col>
              )}
              {/* نوع الکترود */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="electrodeTypeEnum"
                  label="نوع الکترود"
                  rules={[
                    {
                      required: true,
                      message: "نوع الکترود را وارد کنید",
                      validator: (_, value) => {
                        if (value === 0 || value === "0") {
                          return Promise.reject(
                            new Error(" نوع الکترود را وارد کنید")
                          )
                        }
                        return Promise.resolve()
                      },
                    },
                  ]}
                >
                  <Select placeholder="انتخاب کنید">
                    <Option value={0}>نامشخص</Option>
                    <Option value={1}>میله</Option>
                    <Option value={2}>لوله </Option>
                    <Option value={3}>تسمه</Option>
                    <Option value={4}>سیم</Option>
                    <Option value={5}>صفحه</Option>
                    <Option value={6}>سایر</Option>
                  </Select>
                </Form.Item>
              </Col>
              {ertForm.getFieldValue("electrodeTypeEnum") === 6 && (
                <Col xs={24} md={12}>
                  <Form.Item
                    width={"100%"}
                    name="electrodeTypeOther"
                    label="سایر نوع الکترود"
                    rules={[
                      {
                        required: true,
                        message: "سایر نوع الکترود را وارد کنید",
                      },
                    ]}
                  >
                    <Input.TextArea rows={1} />
                  </Form.Item>
                </Col>
              )}
              {/* جنس الکترود */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="electrodeMaterialTypeEnum"
                  label="جنس الکترود"
                  rules={[
                    { required: true, message: "جنس الکترود را وارد کنید" },
                  ]}
                >
                  <Select placeholder="انتخاب کنید">
                    <Option value={0}>نامشخص</Option>
                    <Option value={1}>مس</Option>
                    <Option value={2}>فولاد گالوانیزه </Option>
                    <Option value={3}>فولاد زد زنگ</Option>
                    <Option value={4}>سایر</Option>
                  </Select>
                </Form.Item>
              </Col>
              {ertForm.getFieldValue("electrodeMaterialTypeEnum") === 4 && (
                <Col xs={24} md={12}>
                  <Form.Item
                    width={"100%"}
                    name="electrodeMaterialTypeOther"
                    label="سایر جنس الکترود"
                    rules={[
                      {
                        required: true,
                        message: "سایر جنس الکترود را وارد کنید",
                      },
                    ]}
                  >
                    <Input.TextArea rows={1} />
                  </Form.Item>
                </Col>
              )}
            </Row>

            {/* طول قطر */}
            <Row align={"middle"} justify={"space-between"}>
              <Col xs={24} md={6}>
                <Form.Item name="electrodeLength" label="طول الکترود">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item name="electrodeDiameter" label="قطر الکترود">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  width={"100%"}
                  name="otherElectrodeMeasure"
                  label="سایر اندازه گیری ها"
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            </Row>

            {/* سایر توضیحات لازم */}
            <Row align={"middle"} justify={"space-between"}>
              <Col xs={24} md={24}>
                <Form.Item width={"100%"} name="des" label="سایر توضیحات لازم">
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            </Row>

            {/* برند اقلام ارتینگ */}
            <Row align={"middle"} justify={"space-between"}>
              <Col xs={24} md={24}>
                <Form.Item
                  width={"100%"}
                  name="ertBrand"
                  label="برند اقلام ارتینگ"
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            </Row>

            {/* برند و مدل ارت تستر */}
            <Row align={"middle"} justify={"space-between"}>
              <Col xs={24} md={24}>
                <Form.Item
                  width={"100%"}
                  name="ertTesterBrand"
                  label="برند و مدل ارت تستر"
                >
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            </Row>

            <Divider>اولین سابقه اندازه گیری مقاومت الکترود</Divider>

            <Row gutter={[16]} align={"middle"} justify={"space-evenly"}>
              <Col xs={24} md={4}>
                <Form.Item
                  name="measurementDate"
                  label="تاریخ "
                  rules={[
                    {
                      required: true,
                      message: "تاریخ  را وارد کنید",
                    },
                  ]}
                >
                  <MaskedInput
                    dir="ltr"
                    placeholder="1403/12/12"
                    mask={"1400/00/00"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={4}>
                <Form.Item
                  name="measurementHour"
                  label="ساعت "
                  rules={[
                    {
                      required: true,
                      message: "ساعت  را وارد کنید",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={4}>
                <Form.Item
                  name="temperature"
                  label="دمای هوا "
                  rules={[
                    {
                      required: true,
                      message: "دمای هوا  را وارد کنید",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="rainfallAmount"
                  label="مقدار بارندگی 48 ساعت اخیر"
                  rules={[
                    {
                      required: true,
                      message: "مقدار بارندگی 48 ساعت اخیر را وارد کنید",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="electrodeResistanceValue"
                  label="مقاومت الکترود (اهم)"
                  rules={[
                    {
                      required: true,
                      message: "مقاومت الکترود (اهم) را وارد کنید",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="measurementMethod"
                  label="روش اندازه گیری مقاومت"
                  rules={[
                    {
                      required: true,
                      message: "روش اندازه گیری مقاومت را وارد کنید",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            {/* ذخیره */}
            <Row align={"middle"} justify={"space-between"}>
              <Col>
                <Button type="primary" htmlType="submit" loading={mainProps.loading}>ذخیره</Button>
              </Col>
              <Col>
                <Button htmlType="button" onClick={() => ertForm.resetFields()}>
                  ریست فرم
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default ErtFormEdit


