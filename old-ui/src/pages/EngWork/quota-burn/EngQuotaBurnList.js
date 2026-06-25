import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
  Table,
  Row,
  Col,
  Button,
  InputNumber,
  Input,
  Divider,
  Tag,
} from "antd"
import { getListEngineer, getListQuarterTariff } from "store/actions"
import { serializeQuery } from "helpers/service_helper"
import { ListQuarterTariff } from "../common/ListQuarterTariff"
import { EngQuotaBurnColumnsAnt } from "./EngQuotaBurnColumnsAnt"
import { ListEngineer } from "../common/ListEngineer"
import "./quotaBurn.scss"
import {
  engQuotaBurnApproved,
  engQuotaBurnUpdate,
  getEngQuotaBurnList,
  getEngQuotaBurnListSuccess,
  resetEngQuota,
} from "store/quotas/actions"
const ListEngQuotaBurn = props => {
  const {
    lstEngQuotaBurn,
    loading,
    onGetEngQuotaBurn,
    onGetEngQuotaBurnSuccess,
    onEngQuotaBurnUpdate,
  } = props

  const [quarterId, setQuarterId] = useState(null)
  const [engineerId, setEngineerId] = useState(null)
  const [des, setDes] = useState("")
  const [amountBurning, setAmountBurning] = useState(0)
  const [ertCountBurning, setErtCountBurning] = useState(0)

  const onChange = (pagination, filters, sorter, extra) => {}

  const insert = () => {
    onEngQuotaBurnUpdate({
      id: null,
      qtId: quarterId,
      engId: engineerId,
      des: des,
      amountBurning: amountBurning,
      ertCountBurning: ertCountBurning,
    })
  }

  useEffect(async () => {
    if (quarterId) {
      handleSearchEngQuotaBurn()
    } else {
      onGetEngQuotaBurnSuccess()
    }
  }, [quarterId, engineerId])
  // Fetch data or set initial values if needed
  const handleSearchEngQuotaBurn = async val => {
    let searchQuery = {
      qtId: quarterId ? quarterId : "",
      engId: engineerId ? engineerId : "",
    }

    const params = serializeQuery(searchQuery)
    onGetEngQuotaBurn(params)
  }

  return (
    <>
      <Row gutter={[16, 6, 16, 6]}>
        <Col span={24}>
          <ListQuarterTariff selectQuarter={setQuarterId} props={props} />
        </Col>
        <Col span={24}>
          <ListEngineer selectEngineer={setEngineerId} props={props} />
        </Col>
        <Col span={12}>
          <label htmlFor="amountBurning" style={{ fontWeight: 500 }}>
            مبلغ سوخت/افزایش سهمیه بازرسی
          </label>
          <InputNumber
            style={{ width: "100%",direction:"ltr" }}
        
            formatter={value =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            defaultValue={0}
            width={100}
            onChange={e => setAmountBurning(e)}
          />
        </Col>
        <Col span={12}>
          <label htmlFor="ertCountBurning" style={{ fontWeight: 500 }}>
            تعداد کاهش یا افزایش سهمیه ارت
          </label>
          <InputNumber
            style={{ width: "100%",direction:"ltr" }}
        
            formatter={value =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            defaultValue={0}
            width={100}
            onChange={e => setErtCountBurning(e)}
          />
        </Col>
        <Col span={24}>
          <Tag color="blue" 
            
          >
            در اینجا اگر مثب وارد شود از سهمیه ها کسر میگردد و اگر منفی باشد به سهمیه اضافه میشود
          </Tag>
        </Col>
        <Col span={24}>
          <label htmlFor="des" style={{ fontWeight: 500 }}>
            توضیحات 
          </label>
          <Input.TextArea
            style={{ width: "100%" }}
            rows={2}
            width={100}
            onChange={e => setDes(e.target.value)}
            placeholder="توضیحات"
          />
        </Col>
        <Col span={24}>
          <Button
            disabled={loading || !quarterId || !quarterId}
            onClick={() => insert()}
            type="primary"
          >
            ذخیره
          </Button>
          <Button
            className="ms-3"
            onClick={() => handleSearchEngQuotaBurn()}
            type="default"
          >
            Reset Table
          </Button>
        </Col>
      </Row>
      <Divider />
      <div style={{ minHeight: "700px" }}>
      {props.lstQuarterTariff && 
        <Table
          loading={loading}
          size="small"
          pagination={{ pageSize: 20 }}
          sticky
          scroll={{ y: 450 }}
          columns={EngQuotaBurnColumnsAnt({
            props,
            period: props.lstQuarterTariff.find(x => x.id === quarterId)
              ?.period,
          })}
          rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
          rowKey={record => record.id}
          dataSource={lstEngQuotaBurn}
          onChange={onChange}
          style={{ zIndex: 99999 }}
        />
        }
      </div>
    </>
  )
}

const mapStateToProps = ({ Quotas, QuarterTariff, Engineers }) => ({
  lstEngQuotaBurn: Quotas.lstEngQuotaBurn,
  lstQuarterTariff: QuarterTariff.lstQuarterTariff,
  lstEngineer: Engineers.lstEngineer,
  error: Quotas.error,
  success: Quotas.success,
  loading: Quotas.loading,
  engLoading: Engineers.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetEngQuotaBurn: query => dispatch(getEngQuotaBurnList(query)),
  onGetEngQuotaBurnSuccess: () => dispatch(getEngQuotaBurnListSuccess([])),
  onGetListQuarterTariff: () => dispatch(getListQuarterTariff()),
  onGetListEngineer: filter => dispatch(getListEngineer(filter)),
  onResetEngQuota: () => dispatch(resetEngQuota()),
  onEngQuotaBurnApproved: data => dispatch(engQuotaBurnApproved(data)),
  onEngQuotaBurnUpdate: data => dispatch(engQuotaBurnUpdate(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListEngQuotaBurn)

