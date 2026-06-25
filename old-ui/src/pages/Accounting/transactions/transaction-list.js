import React, { useEffect, useReducer, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Container from "@mui/material/Container"
import { getTransaction, getTransactionExcel } from "store/actions"
import { columnsClientGrid } from "./columns"
import "./transactions.scss"
import { Button, Checkbox, Col, ConfigProvider, Divider, Empty, Pagination, Radio, Row, Skeleton, Space, Table } from "antd"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { NumericInput } from "components/Common/NumericInput"
import Locations from "components/Common/Locations"
import { SearchOutlined } from "@ant-design/icons"


const TransactionList = props => {
  const { 
    lstTransactions,
    lstTransactionTotal,
    onGetTransaction,
    onGetTransactionExcel, 
    translate, 
    loading } = props
  const [pageSize, setPageSize] = React.useState(10)
  const [pageIndex, setPageIndex] = useState(1)

  const [solarCreated, setSolarCreated] = useState("")
  const [filterCity, setFilterCity] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [dataAddress, setDataAddress] = useState({
    sectionId: 0,
    cityId:31,
    fullAddress: {
      pro: "",
      cit: "",
      sec: "",
      lat: 35.311308,
      lng: 46.991271,
      mainAddress: "",
    },
  })
  useEffect(() => {
    // handleSearchTransaction()
  }, [])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      transactionStatusEnum: 0,
    }
  )
  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
  }
  useEffect(async () => {
    await handleSearchTransaction("pageIndex")
  }, [pageIndex, pageSize, formInput.transactionStatusEnum, dataAddress])


  const handleSearchTransaction = async val => {
    let searchQuery = {
      ...formInput,
      page: val === "search" ? 1 : pageIndex,
      pageSize: val === "search" ? 10 : pageSize,
      idCity: filterCity? +dataAddress.cityId : 0,
      fileNumber: formInput.fileNumber ? +formInput.fileNumber : 0,
      solarCreated: solarCreated?.persian
        ? solarCreated.persian
        : "",
    }
    //const params = serializeQuery(searchQuery)
    onGetTransaction(searchQuery)
  }


  const convertToExcel = async () => {
    let searchQuery = {
      ...formInput,
      page: 1,
      pageSize: lstTransactionTotal,
      idCity: +dataAddress.cityId || 0,
      fileNumber: formInput.fileNumber ? +formInput.fileNumber : 0,
      solarCreated: solarCreated?.persian
        ? solarCreated.persian
        : "",
    }
    //const params = serializeQuery(searchQuery)
    onGetTransactionExcel(searchQuery)

  }

  return (
    <>
    <Row className="align-items-center" gutter={[16]}>
    <Col>
          <Radio.Group
            name="transactionStatusEnum"
            onChange={handleInput}
            value={formInput.transactionStatusEnum}
          >
            <Space>
              <Radio value={0}> واریز</Radio>
              <Radio value={1}> برداشت</Radio>
              <Radio value={2}> واریز+برداشت</Radio>
            </Space>
          </Radio.Group>
        </Col>

        <Col>
          <PersianDatePicker
            label={"تاریخ تراکنش"}
            setDefault={false}
            setPersianDate={setSolarCreated}
          />
        </Col>
        <Col>
          <Checkbox
            onChange={e => {
              setFilterCity(e.target.checked)
            }}
          >
            فیلترشهر
          </Checkbox>
        </Col>
        {filterCity && (
          <Col>
            <Locations
              setDataAddress={setDataAddress}
              isAccessCity={true}
            />
          </Col>
        )}
        <Col>
          <NumericInput
            style={{
              width: 150,
            }}
            value={formInput.fileNumber}
            name="fileNumber"
            onChange={handleInput}
            placeholder="شماره پرونده"
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => handleSearchTransaction("search")}
          >
            جستجو
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => convertToExcel()}>
            خروجی اکسل
          </Button>
        </Col>
    </Row>
    <Divider />
    <ConfigProvider direction="rtl">

      <Table
        size="small"
        locale={{
          emptyText: loading ? <Skeleton active={true} /> : <Empty />,
        }}
        pagination={false}
        scroll={{
          y: 670,
          x: 700,
        }}
        sticky
        columns={columnsClientGrid({
          props,
          t:translate,
          pageIndex,
          pageSize,
        })}
        rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
        rowKey={record => record.id}
        dataSource={lstTransactions}
      />
      <Pagination
        current={pageIndex}
        total={lstTransactionTotal}
        onChange={(page, size) => {
          setPageIndex(page)
          setPageSize(size)
        }}
      />
      تعداد کل : {lstTransactionTotal}
      <Divider />
    </ConfigProvider>
    </>
  )
}

const mapStateToProps = ({ Accounting }) => ({
  lstTransactions: Accounting.lstTransactions,
  lstTransactionTotal: Accounting.lstTransactionTotal,
  error: Accounting.error,
  success: Accounting.success,
  loading: Accounting.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetTransaction: (data) => dispatch(getTransaction(data)),
  onGetTransactionExcel: (data) => dispatch(getTransactionExcel(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)
