import {
  Button,
  Checkbox,
  Col,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Tag,
} from "antd"
import { isNumber } from "lodash"
import NumberFormat from "react-number-format"

const UpdateApproved = (props, params, value) => {
  props.onEngQuotaBurnApproved({
    id: params.id,
  })
}
export const renderApprovedButton = (params, { props }) => {
  return (
    <Popconfirm
      title="در صورت تایید این مبلغ از کارکرد کارشناس کم میشود"
      description="آیا مطمئن هستید!؟"
      onConfirm={() => UpdateApproved(props, params, !params.approved)}
      okText="Yes"
      cancelText="No"
    >
      <Checkbox checked={params.approved}></Checkbox>
    </Popconfirm>
  )
}

// ----------------------------------------------------------

const UpdateInline = (props, params, pNam, e) => {
  let getValue = e.target.value
  if (pNam === "amountBurning")
    getValue = +e.target.value.replace(/\$\s?|(,*)/g, "") || 0
  if (params[pNam] !== getValue) {
    props.onEngQuotaBurnUpdate({
      id: params.id,
      des: pNam === "des" ? getValue : params.des,
      amountBurning: pNam === "amountBurning" ? getValue : params.amountBurning || 0,
      ertCountBurning: pNam === "ertCountBurning" ? getValue : params.ertCountBurning || 0,
      inspectionDelayFactor: pNam === "inspectionDelayFactor" ? getValue : params.inspectionDelayFactor || 0,
      ertDelayFactor: pNam === "ertDelayFactor" ? getValue : params.ertDelayFactor || 0,
    })
  }
}

export const renderAmountButton = (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={+params.amountBurning}
      width={100}
      onBlur={e => {
        UpdateInline(props, params, "amountBurning", e)
      }}
    />
  )
}

export const renderInspectionDelayFactor= (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={+params.inspectionDelayFactor}
      width={100}
      onBlur={e => {
        UpdateInline(props, params, "inspectionDelayFactor", e)
      }}
    />
  )
}



export const renderCountErtButton = (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={+params.ertCountBurning}
      width={100}
      onBlur={e => {
        UpdateInline(props, params, "ertCountBurning", e)
      }}
    />
  )
}
export const renderErtDelayFactor = (params, { props }) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={+params.ertDelayFactor}
      width={100}
      onBlur={e => {
        UpdateInline(props, params, "ertDelayFactor", e)
      }}
    />
  )
}

export const renderDesButton = (params, { props }) => {
  return (
    <Input.TextArea
      style={{ width: "100%" }}
      rows={1}
      defaultValue={params.des}
      width={100}
      onBlur={e => {
        UpdateInline(props, params, "des", e)
      }}
    />
  )
}

export const EngQuotaBurnColumnsAnt = props =>
  [
    {
      title: "سال",
      key: "year",
      render: params => params.quarterTariff.year,
      width: "3rem",
    },
    {
      title: "دوره",
      key: "period",
      render: params => params.quarterTariff.period,
      width: "3rem",
    },
    {
      title: "فصل",
      key: "period",
      render: params =>
        params.quarterTypeName + "-" + params.allotmentRoundTypeName,
      width: "7rem",
    },
    //fileNumber
    {
      title: "مشخصات کامل کارشناس",
      key: "k",
      render: params => params.quotaDes,
      width: "10rem",
    },
    {
      title: "مبلغ سوخت بازرسی",
      key: "amountBurning",
      render: params => renderAmountButton(params, props),
      width: "8rem",
    },
    {
      title: "ضریب تاخیر بازرسی",
      key: "inspectionDelayFactor",
      render: params => renderInspectionDelayFactor(params, props),
      width: "8rem",
    },
    {
      title: "تعداد سوخت ارت",
      key: "ertCountBurning",
      render: params => renderCountErtButton(params, props),
      width: "8rem",
    },
    {
      title: "ضریب تاخیر ارت",
      key: "ertDelayFactor",
      render: params => renderErtDelayFactor(params, props),
      width: "8rem",
    },
    {
      title: "توضیحات",
      key: "amountBurning",
      render: params => renderDesButton(params, props),
      width: "10rem",
    },
    // {
    //   title: "باقیمانده دوره قبل",
    //   key: "SumEngBalance",
    //   render: params => (
    //     <NumberFormat
    //       displayType={"text"}
    //       value={params.amountRemaining}
    //       thousandSeparator={true}
    //     />
    //   ),
    //   width: "7rem",
    // },
    {
      title: "تایید",
      key: "payByBankReceipt",
      render: params => renderApprovedButton(params, props),
      width: "3rem",
    },
    // {
    //   title: "جمع کل واریزی",
    //   key: "SumEngBalance",
    //   render : params => <NumberFormat
    //   displayType={"text"}
    //   value={params.sumEngBalance}
    //   thousandSeparator={true}
    // />
    // },
    // {
    //   title: "جمع کل مانده",
    //   key: "SumEngBalance",
    //   render : params => <NumberFormat
    //   displayType={"text"}
    //   value={params.sumEngBalance- params.sumAmountEngRealWordThisQuarter - params.sumAmountEngRealWordBefore}
    //   thousandSeparator={true}
    // />
    // }
  ].filter(item => !item.hidden)
