import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
  Table,
  Row,
  Col,
  ConfigProvider
} from "antd"
import {
  getEngWork,
  getListEngineer,
  getListQuarterTariff,
  resetAccountingFlag,
} from "store/actions"
import { serializeQuery } from "helpers/service_helper"
import { ListQuarterTariff } from "./ListQuarterTariff"
import { engWorkColumnsAnt } from "./engWorkColumnsAnt"
import { ListEngineer } from "./ListEngineer"
import "./engWork.scss"
const ListEngWork = props => {
  const { lstEngWork, loading, onGetEngWork, onGetListQuarterTariff } = props

  const [quarterId, setQuarterId] = useState(null)
  const [engineerId, setEngineerId] = useState(null)

  const onChange = (pagination, filters, sorter, extra) => {
  }

  useEffect(async () => {
    if(quarterId) handleSearchEngWork()
  }, [quarterId,engineerId])
  // Fetch data or set initial values if needed
  const handleSearchEngWork = async val => {
    let searchQuery = {
      qtId: quarterId ? quarterId : "",
      engId: engineerId ? engineerId : "",
    }

    const params = serializeQuery(searchQuery)
    onGetEngWork(params)
  }

  return (
    <>
      <Row gutter={[16, 6]}>
        <Col span={12}>
          <ListQuarterTariff selectQuarter={setQuarterId} props={props} />
        </Col>
        <Col span={12}>
          <ListEngineer selectEngineer={setEngineerId} props={props} />
        </Col>
      </Row>
      <div style={{minHeight:'700px'}}>
      <ConfigProvider direction="ltr"> 
      <Table
        loading={loading}
        size="small"
        pagination={{pageSize:20}}
        sticky
        scroll={{ y: 450 }}
        columns={engWorkColumnsAnt({
          props,
          fullNameFilter: lstEngWork.map(x => {
            return { text: x.fullName, value: x.fullName }
          }),
        period: props.lstQuarterTariff.find(x=>x.id === quarterId)?.period
        })}
        rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
        rowKey={record => record.id}
        dataSource={lstEngWork}
        onChange={onChange}
        style={{zIndex:99999}}
      />
      </ConfigProvider>
      </div>

    </>
  )
}

const mapStateToProps = ({ Accounting, QuarterTariff, Engineers}) => ({
  lstEngWork: Accounting.lstEngWork,
  lstQuarterTariff: QuarterTariff.lstQuarterTariff,
  lstEngineer: Engineers.lstEngineer,
  error: Accounting.error,
  success: Accounting.success,
  loading: Accounting.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetEngWork: (query) => dispatch(getEngWork(query)),
  onGetListQuarterTariff: () => dispatch(getListQuarterTariff()),
  onGetListEngineer: () => dispatch(getListEngineer()),
  onResetAccountingFlag: () => dispatch(resetAccountingFlag()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListEngWork)
