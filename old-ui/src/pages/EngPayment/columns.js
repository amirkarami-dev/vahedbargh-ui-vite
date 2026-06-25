import { Button, InputNumber, Popconfirm, Row, Tag } from "antd"
import { CityFromSection } from "hooks/returnCityName"

const UpdatePayment = (props, params, pNam, e) => {
  const getValue = +e.target.value.replace(/\$\s?|(,*)/g, "")
  if (params[pNam] !== getValue) {
    props.onUpdateEngPaymentList({
      id: params.id,
      amountSystem: pNam === "amountSystem" ? getValue : params.amountSystem,
      deduction2: pNam === "deduction2" ? getValue : params.deduction2,
      deduction3: pNam === "deduction3" ? getValue : params.deduction3,
      deduction4: pNam === "deduction4" ? getValue : params.deduction4,
      addition1: pNam === "addition1" ? getValue : params.addition1,
      addition2: 0,
    })
  }
}
const UpdatePayByBankReceipt = (props, params, value) => {
    props.onUpdateEngPaymentList({
      id: params.id,
      amountSystem:params.amountSystem,
      deduction2: params.deduction2,
      deduction3: params.deduction3,
      deduction4: params.deduction4,
      addition1:params.addition1,
      payByBankReceipt: value,
      addition2: 0,
    })
}

export const renderAmountSystemButton = (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      disabled
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={params.amountSystem}
      width={100}
      onBlur={e => {
        UpdatePayment(props, params, "amountSystem", e)
      }}
    />
  )
}
export const renderDeduction2Button = (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      disabled={params.approved}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={params.deduction2}
      onBlur={e => {
        UpdatePayment(props, params, "deduction2", e)
      }}
    />
  )
}

export const renderDeduction3Button = (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      disabled={params.approved}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={params.deduction3}
      onBlur={e => {
        UpdatePayment(props, params, "deduction3", e)
      }}
    />
  )
}

export const renderDeduction4Button = (params, { props }) => {
  return (
    
    <InputNumber
      style={{ width: "100%" }}
      disabled={params.approved}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={params.deduction4}
      onBlur={e => {
        UpdatePayment(props, params, "deduction4", e)
      }}
    />
  )
}
export const renderAddition1Button = (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      disabled={params.approved}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={params.addition1}
      onBlur={e => {
        UpdatePayment(props, params, "addition1", e)
      }}
    />
  )
}
export const renderAddition2Button = (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      disabled={params.approved}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={params.addition2}
      onBlur={e => {
        UpdatePayment(props, params, "addition2", e)
      }}
    />
  )
}

export const renderPayByBankReceiptButton = (params, { props }) => {
  return (
    <Popconfirm
      disabled={params.approved}
    title="درصورت پرداخت با فیش در خروجی بانک حذف میشود"
    description="آیا مطمن هستید!؟"
    onConfirm={() =>  UpdatePayByBankReceipt(props, params, !params.payByBankReceipt)}
    okText="Yes"
    cancelText="No"
  >
    <Button 
    style={{"borderColor": params.payByBankReceipt ? "" : "green"}}
      type={params.payByBankReceipt ? "primary" : "Dashed"}>
        {params.payByBankReceipt ? "بله" : "خیر"}
      </Button>
  </Popconfirm>

  )
}

export const columns = props =>
  [
    // {
    //   title: "ایندکس",
    //   key: "sortIndex",
    //   dataIndex: "sortIndex",
    //   width: "3rem",
    // },
    {
      title: "نام و نام خانوادگی",
      key: "fullName",
      dataIndex: "fullName",
      filters: props.fullNameFilter,
      filterSearch: true,
      width: "9rem",
      onFilter: (value, record) => record.fullName.startsWith(value),
    },
    {
      title: "شهر",
      key: "section",
      filters: props.sectionFilter,
      render: params => {
        let returnValue = "-"
        if (params.engineer.idSection > 0) {
          returnValue = CityFromSection(params.engineer.idSection)
        }
        return returnValue
      },
      width: "6rem",
    },
    {
      title: "مبلغ سیستمی",
      key: "amountSystem",
      render: params => renderAmountSystemButton(params, props),
      width: "7rem",
    },
    {
      title: "5% سازمان",
      key: "deduction1",
      render: params => (
        <span>
          {`${params.deduction1}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      ),
      width: "5rem",
    },
    {
      title: "1% صندوق حمایت",
      key: "deduction2",
      render: params => renderDeduction2Button(params, props),
      width: "6rem",
    },
    {
      title: "7% واحد برق",
      key: "deduction3",
      render: params => (
        <span>
          {`${params.deduction3}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      ),
      width: "7rem",
    },
    {
      title: "10% ارزش افزوده ",
      key: "deduction3",
      render: params => (
        <span>
          {`${params.deduction4}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      ),
      width: "7rem",
    },
    // {
    //   title: "فیش کاغذی",
    //   key: "addition1",
    //   render: params => renderAddition1Button(params, props),
    //   width: "8rem",
    // },
    // {
    //   title: "جمع/8درصد/92درصد",
    //   key: "sum89",
    //   render: params => (
    //     <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
    //       <Tag color="green">       {`${params.amountSystem + params.addition1}`.replace(
    //         /\B(?=(\d{3})+(?!\d))/g,
    //         ","
    //       )}</Tag>
    //       <Tag>{`${params.deduction1}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Tag>
    //       <Tag>     {`${
    //         params.amountSystem + params.addition1 - params.deduction1
    //       }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Tag>
    //     </Row>
    //   ),
    //   width: "6rem",
    // },
    // {
    //   title: "کسورات علی الحساب",
    //   key: "deduction3",
    //   render: params => renderDeduction3Button(params, props),
    //   width: "7rem",
    // },
    // {
    //   title: "سایر کسورات",
    //   key: "deduction4",
    //   render: params => renderDeduction4Button(params, props),
    //   width: "7rem",
    // },
    {
      title: "خالص پرداختی",
      key: "sumAmountWithFish",
      render: params => (
        <span>
          {`${params.sumAmountWithFish}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      ),
      width: "7rem",
    },
    {
      title: "شماره حساب",
      key: "bankAccountNumber",
      render: params => params.engineer.bankAccountNumber,
      width: "7rem",
    },
    {
      title: "کدملی",
      key: "sum89",
      render: params => params.engineer.naCode,
      width: "6rem",
    }
  ].filter(f => !f.hidden)
