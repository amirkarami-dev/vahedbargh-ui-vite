import { Button, Tag } from "antd"
import NumberFormat from "react-number-format"



export const engWorkColumnsAnt = props => [


  //fileNumber
  {
    title: "نام و نام خانوادگی",
    key: "fullName",
    dataIndex: "fullName",
  },
  {
    title: "ورود به سامانه",
    key: "defaultQuota",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.defaultQuota}
    thousandSeparator={true}
  />,
  hidden : props.period !== 1
  },
  {
    title: "تخصیص این دوره",
    key: "sumAmountEngQuota",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.sumAmountEngQuota}
    thousandSeparator={true}
  />
  },
  {
    title: "تخصیص دوره های قبل",
    key: "sumAmountEngQuotaBeforePeriod",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.sumAmountEngQuotaBeforePeriod}
    thousandSeparator={true}
  />
  },
  {
    title: "ارجاعی این دوره",
    key: "sumAmountEngProcessFee",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.sumAmountEngProcessFee}
    thousandSeparator={true}
  />
  },
  {
    title: "ارجاعی دوره های قبل",
    key: "sumAmountEngProcessFeeBeforePeriod",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.sumAmountEngProcessFeeBeforePeriod}
    thousandSeparator={true}
  />
  },
  {
    title: "انجام شده این دوره",
    key: "sumAmountEngRealWordThisQuarter",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.sumAmountEngRealWordThisQuarter}
    thousandSeparator={true}
  />
  },
  {
    title: "انجام شده دوره های قبل",
    key: "sumAmountEngRealWordBefore",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.sumAmountEngRealWordBefore}
    thousandSeparator={true}
  />
  },
  {
    title: "مانده طبق انجام شده",
    key: "SumEngBalance",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.sumAmountEngQuota + params.sumAmountEngQuotaBeforePeriod - params.sumAmountEngRealWordThisQuarter - params.sumAmountEngRealWordBefore }
    thousandSeparator={true}
  />
  },
  {
    title: "مانده طبق ارجاعی",
    key: "SumEngBalance",
    render : params => <NumberFormat
    displayType={"text"}
    value={params.sumAmountEngQuota + params.sumAmountEngQuotaBeforePeriod - params.sumAmountEngProcessFee - params.sumAmountEngProcessFeeBeforePeriod }
    thousandSeparator={true}
  />
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
