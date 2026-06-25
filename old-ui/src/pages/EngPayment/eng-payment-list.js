import React, { useState, useEffect, useReducer } from "react"
import { connect } from "react-redux"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Form,
  InputNumber,
  Select,
  Checkbox,
  Divider,
  Popconfirm,
  ConfigProvider,
} from "antd"
import { columns } from "./columns"
import { PersianDatePickerInline } from "components/Common/PersianDatePickerInline"
import {
  engPaymentApproved,
  filterEngPaymentList,
  getEngPaymentList,
  getEngPaymentTask,
  resetEngPaymentListFlag,
  updateEngPaymentList,
  upsertEngPaymentList,
} from "store/actions"
import Locations from "components/Common/Locations"
import { withTranslation } from "react-i18next"
import { serializeQuery } from "helpers/service_helper"
import { EngPaymentTaskList } from "./eng-payment-task-list"
import { SaveOutlined, SearchOutlined } from "@ant-design/icons"
import { CityFromSection } from "hooks/returnCityName"

const EngPaymentList = props => {
  const {
    lstEngPayment,
    loading,
    onGetEngPaymentList,
    onUpsertEngPaymentList,
    openNotification,
    onResetEngPaymentListFlag,
    lstEngPaymentTask,
    onFilterEngPaymentList,
    reload,
  } = props
  const [form] = Form.useForm()

  const [errorMessage, setErrorMessage] = useState(null)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      period: 1,
    }
  )
  const [fromSolar, setFromSolar] = useState("")
  const [toSolar, setToSolar] = useState("")
  const [solarApproved, setSolarApproved] = useState("")
  const [countChangeFormInput, setCountChangeFormInput] = useState(0)
  const [engPaymentTaskId, setEngPaymentTaskId] = useState(null)
  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
    setCountChangeFormInput(prev => prev + 1)
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra)

    onFilterEngPaymentList(filters)
  }

  useEffect(async () => {
    if (props.success) openNotification("success", "top", props.success)
    if (props.error) openNotification("error", "top", props.error)
    if (errorMessage) openNotification("warning", "top", errorMessage)
    onResetEngPaymentListFlag()
  }, [errorMessage, props.success, props.error])

  useEffect(async () => {
    await handleSearchSupports()
  }, [])


  useEffect(async () => {
    if (reload) {
      await handleSearchSupports()
    }
    if (countChangeFormInput) {
      await handleSearchSupports()
    }
    if (engPaymentTaskId) {
      await handleSearchSupports()
    }
  }, [reload, countChangeFormInput, engPaymentTaskId])

  const handleSubmit = values => {
    let searchQuery = {
      engPaymentTaskId: engPaymentTaskId ? engPaymentTaskId : "",
    }
    const params = serializeQuery(searchQuery)

    let updatedData = {
      ...values,
      fromSolar: fromSolar.persian,
      toSolar: toSolar.persian,
    }
    delete updatedData.period
    // delete updatedData.julianMembershipDate
    onUpsertEngPaymentList({ updatedData, params })
    form.resetFields()
  }

  const handleSearchSupports = async val => {
    let searchQuery = {
      engPaymentTaskId,
    }

    const params = serializeQuery(searchQuery)
    if (!!engPaymentTaskId) onGetEngPaymentList(params)
  }
  // Function to handle edit button click
  const handleEdit = record => {
    // form.setFieldsValue(record)
    // // setSolarBirthDate(record.solarBirthDate)
    // setEditingId(record.id)
  }

  const handleApproved = () => {
    const { onEngPaymentApproved } = props
    if (engPaymentTaskId && solarApproved) {
      onEngPaymentApproved({
        engPaymentTaskId,
        solarApproved: solarApproved.persian,
      })
    } else {
      setErrorMessage("تاریخ پرداخت بانکی را انتخاب کنید")
    }
  }

  function pad(n, len) {
    return (new Array(len + 1).join("0") + n).slice(-len)
  }

  const exportToBankFile = () => {
    let lines = ""
    let totalAmount = 0
    const solarPay = solarApproved?.persian
    if (solarPay?.length < 8) {
      openNotification("error", "top", "تاریخ پرداخت بانکی را انتخاب کنید")
      return
    }
    const listPayments = lstEngPayment
    listPayments.forEach(element => {
      totalAmount += element.sumAmountWithFish
      let bankAccount = element.engineer.bankAccountNumber
        ?.trim()
        .replace(/[^a-zA-Z0-9]/g, "")

      const line =
        bankAccount +
        element.sumAmountWithFish +
        solarPay.replaceAll("/", "").substring(2)
      const countChar = line.length
      const countZero = 29 - countChar
      let resultLine =
        bankAccount +
        pad("0", +countZero) +
        element.sumAmountWithFish +
        solarPay.replaceAll("/", "").substring(2)

      if (countZero <= 0) {
        openNotification("error", "top", "خطای 29 کاراکتری")
        resultLine = "خطای 29 کاراکتری"
      }
      if (resultLine.length != 29) {
        openNotification("error", "top", "خطای 29 کاراکتری")
        resultLine = `"خطای 29 کاراکتری" : ${element.engineer.fullName}`
      }
      if (!element.engineer.bankAccountNumber) {
        openNotification(
          "error",
          "top",
          `خطا در شماره حساب یا مبلغ : ${element.engineer.fullName}`
        )
        resultLine = `خطا در شماره حساب یا مبلغ : ${element.engineer.fullName}`
      }
      if (element.payByBankReceipt) return
      lines = lines + resultLine + "\r\n"
    })

    // head line add
    const headLine = totalAmount + solarPay.replaceAll("/", "").substring(2)
    const countCharHeadLine = headLine.length
    const countZeroHead = 29 - countCharHeadLine
    lines = pad("0", +countZeroHead) + headLine + "\r\n" + lines
    const task = lstEngPaymentTask.find(x => x.id === engPaymentTaskId)
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" })
    saveAs(
      blob,
      `${
        "خروجی بانک" +
        "_" +
        task.solarCreated.replaceAll("/", "_").split("_").reverse().join("_")
      }.txt`
    )
  }

  const showToPay = () => {
    const listPayments = lstEngPayment
    let payBankAmount = 0
    let payByFish = 0
    let sumPay = 0
    listPayments.forEach(x => {
      sumPay = sumPay + x.sumAmountWithFish

      if (!x.payByBankReceipt) {
        payBankAmount = payBankAmount + x.sumAmountWithFish
      } else {
        payByFish = payByFish + x.sumAmountWithFish
      }
    })
    const RePayBankAmount = String(payBankAmount).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )
    const RePayByFish = String(payByFish).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const ReSumPay = String(sumPay).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    alert(
      `مبلغ پرداخت چک به بانک: ${RePayBankAmount} \n` +
        `مبلغ کل پرداختی: ${ReSumPay} \n`
    )
  }
  const convertToExcel = () => {
    const MYdata = lstEngPayment.map((x, index) => ({
      ردیف: index + 1,
      "نام و نام خانوادگی": x.fullName,
      کدملی: x.engineer.naCode,
      شهر: CityFromSection(x.engineer.idSection),
      "مبلغ سیستمی": x.amountSystem,
      "سهم 5% سازمان": x.deduction1,
      "سهم 1% صندوق حمایت": x.deduction2,
      "سهم 7% واحد برق": x.deduction3,
      "10% ارزش افزوده": x.deduction4,
      "جمع کسورات": x.deduction1 + x.deduction2 + x.deduction3 + x.deduction4,
      "خالص پرداختی": x.sumAmountWithFish,
      // "پرداخت با فیش": x.payByBankReceipt ? "بله" : "خیر",
      "شماره حساب": x.engineer.bankAccountNumber,
    }))
    const worksheet = XLSX.utils.json_to_sheet(MYdata)
    const workbook = XLSX.utils.book_new()
    const task = lstEngPaymentTask.find(x => x.id === engPaymentTaskId)
    const label = "لیست پرداختی دوره:" + task.period

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `پرداختی دوره ${task.period}`
    )
    XLSX.writeFile(
      workbook,
      `${
        label +
        "_" +
        task.solarCreated.replaceAll("/", "_").split("_").reverse().join("_")
      }.xlsx`
    )
  }

  const convertToExcelGroupedData  = () => {
    const groupedData = lstEngPayment.reduce((acc, x) => {
      const sectionId = x.engineer.idSection;
      
      // Initialize the section if it doesn't exist
      if (!acc[sectionId]) {
        acc[sectionId] = {
          شهر: CityFromSection(sectionId),
          "مبلغ سیستمی": 0,
          "سهم 5% سازمان": 0,
          "سهم 1% صندوق حمایت": 0,
          "سهم 7% واحد برق": 0,
          "10% ارزش افزوده": 0,
          "جمع کسورات": 0,
          "خالص پرداختی": 0,
        };
      }
    
      // Sum the values
      acc[sectionId]["مبلغ سیستمی"] += x.amountSystem;
      acc[sectionId]["سهم 5% سازمان"] += x.deduction1;
      acc[sectionId]["سهم 1% صندوق حمایت"] += x.deduction2;
      acc[sectionId]["سهم 7% واحد برق"] += x.deduction3;
      acc[sectionId]["10% ارزش افزوده"] += x.deduction4;
      acc[sectionId]["جمع کسورات"] += (x.deduction1 + x.deduction2 + x.deduction3 + x.deduction4);
      acc[sectionId]["خالص پرداختی"] += x.sumAmountWithFish;
    
      return acc;
    }, {});

    const mappedData = Object.keys(groupedData).map(sectionId => ({
      شهر: CityFromSection(+sectionId),
      "مبلغ سیستمی": groupedData[sectionId]["مبلغ سیستمی"],
      "سهم 5% سازمان": groupedData[sectionId]["سهم 5% سازمان"],
      "سهم 1% صندوق حمایت": groupedData[sectionId]["سهم 1% صندوق حمایت"],
      "سهم 7% واحد برق": groupedData[sectionId]["سهم 7% واحد برق"],
      "10% ارزش افزوده": groupedData[sectionId]["10% ارزش افزوده"],
      "جمع کسورات": groupedData[sectionId]["جمع کسورات"],
      "خالص پرداختی": groupedData[sectionId]["خالص پرداختی"]
    }));

    const worksheet = XLSX.utils.json_to_sheet(mappedData)
    const workbook = XLSX.utils.book_new()
    const task = lstEngPaymentTask.find(x => x.id === engPaymentTaskId)
    const label = "لیست پرداختی دوره:" + task.period

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `تجمیعی دوره ${task.period}`
    )
    XLSX.writeFile(
      workbook,
      `${
        label +
        "_" +
        task.solarCreated.replaceAll("/", "_").split("_").reverse().join("_")
      }.xlsx`
    )
  }



  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const handleExpand = (expanded, record) => {
    const keys = [];
    if(expanded){
        keys.push(record.id); 
    }
    setExpandedRowKeys(keys)
  }

  const expandedRowRender1 = record1 => {
    const transactionIn = record1.transactionIn
    return (
      <ConfigProvider direction="rtl">
      <Table
        columns={[
          {
            title: "تاریخ تراکنش",
            align: "right",
            key: "date",
            render: params => params.transaction.solarCreated,
            width: "3rem",
          },
          {
            title: "مبلغ",
            key: "date",
            align: "right",
            render: params => (
              <span>
                {`${params.transaction.amount}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </span>
            ),
            width: "3rem",
          },
          {
            title: "توضیحات",
            align: "right",
            key: "date",
            render: params => params.transaction.des,
            width: "3rem",
          },
          {
            title: "مالک",
            align: "right",
            key: "date",
            render: params => params.electProject.landlordName,
            width: "3rem",
          },
          {
            title: "تاریخ ثبت فاکتور",
            align: "right",
            key: "date",
            render: params => params.solarCreated,
            width: "3rem",
          },

        ]}
        dataSource={record1.invoices}
        pagination={false}
        rowKey={record1 => record1.id}
        expandable={{
              expandedRowRender: record2 =>{
                const findTr = transactionIn?.find(x=> x.projectId === record2.electProject.id)
                console.log('iddd', findTr)
                  return (
                    <div>
                    <span>تراکنش واریز در تاریخ:</span>
                      <span>{findTr.solarCreated}</span>-
                      <span>{findTr.des}</span>
                    </div>
                  )
              },
              rowExpandable: record2 => record2.id !== "Not Expandable",
              onExpand:handleExpand,
              expandedRowKeys,
            }}
      /></ConfigProvider>
    )
  }
  function getSectionFilterOptions(data, record) {
    const sectionMap = new Map()

    // Group data by engineer.idSection and create the filter options
    data.forEach(item => {
      const sectionText = CityFromSection(item.engineer.idSection)
      if (!sectionMap.has(item.engineer.idSection)) {
        sectionMap.set(item.engineer.idSection, {
          text: sectionText,
          value: item.engineer.idSection,
        })
      }
    })

    return Array.from(sectionMap.values())
  }

  return (
    <>
      <Col className="gutter-row">
        <EngPaymentTaskList
          selectEngPaymentTask={setEngPaymentTaskId}
          props={props}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => handleSearchSupports()}
        >
          جستجو
        </Button>
      </Col>

      <Form name="engForm" form={form} onFinish={handleSubmit}>
        {/* Input fields */}

        <Row gutter={[8, 8]}>
          <Col>
            <Form.Item required label="از تاریخ:" name="fromSolar">
              <PersianDatePickerInline
                defaultDate={form
                  .getFieldValue("fromSolar")
                  ?.toString()
                  ?.substring(0, 10)}
                setPersianDate={setFromSolar}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item required label="تا تاریخ" name="toSolar">
              {/* <MaskedInput
              mask={
                //  https://imask.js.org/guide.html#masked-pattern
                "1000/00/00"
              }
            /> */}
              <PersianDatePickerInline
                defaultDate={form
                  .getFieldValue("toSolar")
                  ?.toString()
                  ?.substring(0, 10)}
                setPersianDate={setToSolar}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="توضیحات" name="description">
              <Input.TextArea rows={1} cols={90} placeholder="توضیحات" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row gutter={[8, 8]}>
            <Col>
              <Button disabled={loading} type="primary" htmlType="submit">
                ذخیره
              </Button>
            </Col>
            <Col>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                ریست فرم
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <ConfigProvider direction="rtl">
          <Table
            loading={loading}
            size="small"
            pagination={true}
            scroll={{
              x: 700,
            }}
             sticky="true"
            columns={columns({
              props,
              handleEdit,
              fullNameFilter: lstEngPayment.map(x => {
                return { text: x.fullName, value: x.fullName }
              }),
              // sectionFilter: lstEngPayment.map(x => {
              //   return { text:x.engineer.idSection, value: x.engineer.idSection }
              // }),
             sectionFilter: getSectionFilterOptions(lstEngPayment),
            })}
            expandable={{
              expandedRowRender: expandedRowRender1,
              rowExpandable: record => record.id !== "Not Expandable",
            }}
            rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
            rowKey={record => record.id}
            dataSource={lstEngPayment}
            onChange={onChange}
          />
          </ConfigProvider>
      </Form>

      <Divider />
      <Row gutter={8}>
        <Col>
          <PersianDatePickerInline
            label={"تاریخ پرداخت بانکی"}
            setPersianDate={setSolarApproved}
          />
        </Col>
        <Col>
          <Popconfirm
            title="بعد از پرداخت قابل ویرایش نمی باشد"
            description="آیا مطمن هستید!؟"
            onConfirm={() => handleApproved()}
            okText="Yes"
            cancelText="No"
          >
            {" "}
            <Button icon={<SaveOutlined />} />{" "}
          </Popconfirm>
        </Col>
        <Col>
          <Button type="primary" onClick={() => exportToBankFile()}>
            خروجی بانک
          </Button>
        </Col>

        <Col>
          <Button type="primary" onClick={() => convertToExcel()}>
            خروجی اکسل
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => convertToExcelGroupedData()}>
            خروجی تجمیعی اکسل
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => showToPay()}>
            محاسبه نحوه پرداخت
          </Button>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = ({ EngPayment }) => ({
  lstEngPayment: EngPayment.lstEngPayment,
  lstEngPaymentTask: EngPayment.lstEngPaymentTask,
  error: EngPayment.error,
  success: EngPayment.success,
  loading: EngPayment.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetEngPaymentList: searchValue => dispatch(getEngPaymentList(searchValue)),
  onGetEngPaymentTasks: () => dispatch(getEngPaymentTask()),
  onUpsertEngPaymentList: data => dispatch(upsertEngPaymentList(data)),
  onUpdateEngPaymentList: data => dispatch(updateEngPaymentList(data)),
  onResetEngPaymentListFlag: () => dispatch(resetEngPaymentListFlag()),
  onEngPaymentApproved: data => dispatch(engPaymentApproved(data)),
  onFilterEngPaymentList: filter => dispatch(filterEngPaymentList(filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EngPaymentList))
