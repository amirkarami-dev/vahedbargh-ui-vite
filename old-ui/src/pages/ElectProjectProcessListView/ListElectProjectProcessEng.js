import React, { useState, useEffect, useReducer } from "react"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"
import {
    deleteProjectProcess,
    getListEngineer,
    getListProjectProcessEng,
    getListProjectProcessReport,
    resetElectProcessFlag  } from "store/actions"
import { getCurrentUser, serializeQuery } from "helpers/service_helper"
import "./electProjectProcessList.scss"

import {
  Table,
  Pagination,
  Input,
  Space,
  Button,
  Divider,
  Row,
  Col,
  Radio,
  Checkbox,
} from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { projectColumnsAnt } from "./ProjectColumnsAnt"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { NumericInput } from "components/Common/NumericInput"
import Locations from "components/Common/Locations"
import { ListEngineer } from "./ListEngineer"
const { Search } = Input
const ListElectProjectProcessEng = props => {
  const {
    lstProjectProcessEng,
    lstProjectProcessEngTotal,
    matches_sm,
    handleChangeExpand,
    expanded,
    loading,
    onGetListProjectProcessReport,
    openNotification,
    onResetElectProcessFlag,
    reload,
  } = props

  const [errorMessage, setErrorMessage] = useState(null)
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(1)
  const [deliverEngineer, setDeliverEngineer] = useState("")
  const [filterCity, setFilterCity] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [dataAddress, setDataAddress] = useState({
    sectionId: 0,
    fullAddress: {
      pro: "",
      cit: "",
      sec: "",
      lat: 35.311308,
      lng: 46.991271,
      mainAddress: "",
    },
  })
  const [engineerId, setEngineerId] = useState(null)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
        projectLevelEnum: 1
    }
  )
  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
    

  }
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      handleSearchElectProjectProcessEng("search")
    }
  }, [isFirstRender, formInput.projectLevelEnum]);

  useEffect(async() => {
    if(props.success) openNotification('success','top',props.success)
    if(props.error) openNotification('error','top',props.error)
    if(errorMessage) openNotification('warning','top',props.error)
    onResetElectProcessFlag()
  }, [errorMessage, props.success, props.error])

  useEffect(async() => {
   await handleSearchElectProjectProcessEng('pageIndex')
  }, [pageIndex, pageSize])

  useEffect(async() => {
    if(reload) {
     await handleSearchElectProjectProcessEng()
    }
  }, [reload])

  const handleSearchElectProjectProcessEng = async (val) => {
    let searchQuery = {
      ...formInput,
      page:val=== "search"?1:pageIndex,
      pageSize:val=== "search"?10:pageSize,
      fileNumber: formInput.fileNumber ? formInput.fileNumber : 0,
      solarDateDeliverEngineer: deliverEngineer?.persian ? deliverEngineer.persian : "",
      idSection: filterCity ? +dataAddress?.sectionId : 0,
      landlordName: formInput.landlordName?formInput.landlordName:"",
      executorName: formInput.executorName?formInput.executorName:"",
      engineerId:engineerId?engineerId:""
    }
    
    const params = serializeQuery(searchQuery)
    onGetListProjectProcessReport(params)
  }

  const handleDelete = record => {
    const {onDeleteProjectProcess} = props
    onDeleteProjectProcess (record.id)
    // setSolarBirthday(record.solarBirthDate)
  }

  return (
    <>
          <Row  gutter={[16,6]}>
          <Col span={24}>
                <ListEngineer selectEngineer = {setEngineerId} props={props} />
              </Col>
            <Col  className="gutter-row">
              <Radio.Group
                name="projectLevelEnum"
                onChange={handleInput}
                
                value={formInput.projectLevelEnum}
              >
                <Space  direction={matches_sm?'vertical':'horizontal'}>
                  <Radio value={1}> کارشناسی تایید شده</Radio>
                  <Radio value={2}> نقشه تایید شده</Radio>
                </Space>
              </Radio.Group>
            </Col>
    

            <Col  className="gutter-row">
              <PersianDatePicker
                label={"تاریخ تخصیص"}
                setDefault={false}
                setPersianDate={setDeliverEngineer}
              />{" "}
            </Col>
            <Col  className="gutter-row">
              <Checkbox
                onChange={e => {
                  setFilterCity(e.target.checked)
                }}
              >
                فیلترشهر
              </Checkbox>
            </Col>
            {filterCity && (
              <Col className="gutter-row">
                <Locations
                  setDataAddress={setDataAddress}
                  matches_sm={matches_sm}
                  isAccessCity={true}
                />
              </Col>
            )}
            {/* <Col className="gutter-row">
              <NumericInput
                style={{
                  width: 150,
                }}
                value={formInput.fileNumber}
                name="fileNumber"
                onChange={handleInput}
                placeholder="شماره پرونده"
              />
            </Col> */}

            <Col className="gutter-row">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={()=>handleSearchElectProjectProcessEng("search")}
              >
                جستجو
              </Button>
            </Col>
          </Row>
          <Divider />

          <Table
            loading={loading}
            size="small"
            pagination={false}
            scroll={{x: 700}}
            sticky = "true"
            columns={projectColumnsAnt({
              props,
              handleDelete,
              setErrorMessage,
              currentUser: getCurrentUser(),
              matches_sm,
              handleChangeExpand,
              expanded,
              pageIndex,
              pageSize
            })}
            rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
            rowKey={record => record.id}
            dataSource={lstProjectProcessEng}
          />
          <Pagination
            current={pageIndex}
            total={lstProjectProcessEngTotal}
            onChange={(page, size) => {
              console.log("page,size", page, size)
              setPageIndex(page)
              setPageSize(size)
            }}
          />
          تعداد کل : {lstProjectProcessEngTotal}
          <Divider />
    </>
  )
}


const mapStateToProps = ({
  ElectProjectProcesses,
  Engineers,
}) => ({
  lstEngineer: Engineers.lstEngineer,
    lstProjectProcessEng: ElectProjectProcesses.lstProjectProcessEng,
    lstProjectProcessEngTotal: ElectProjectProcesses.lstProjectProcessEngTotal,
    error: ElectProjectProcesses.error,
    success: ElectProjectProcesses.success,
    loading: ElectProjectProcesses.loading
  })

const mapDispatchToProps = dispatch => ({
  onGetListEngineer: () => dispatch(getListEngineer()),
  onGetListProjectProcessReport: searchValue => dispatch(getListProjectProcessReport(searchValue)),
    onResetElectProcessFlag :()=> dispatch(resetElectProcessFlag())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ListElectProjectProcessEng))
