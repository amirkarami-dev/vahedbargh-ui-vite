import { Checkbox, Col, Progress, Radio, Row, Select, Space } from "antd"
import { GetCityWithSection } from "hooks/returnCityName"
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { serializeQuery } from "helpers/service_helper"
import Locations from "components/Common/Locations"
export const ListEngineer = ({ props, selectEngineer, projectLevelEnum }) => {
  const { lstEngineer, engLoading, engError, engSuccess } = props
  const [engGrad, setEngGrad] = useState(4)

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
  const [filterCity, setFilterCity] = useState(false)
  const [isFilterCert, setIsFilterCert] = useState(true)
  const [filterCert, setFilterCert] = useState(0)

  useEffect(() => {
    const { onGetListEngineer } = props
    let searchQuery = {
      engineerGradeTypeEnum: projectLevelEnum === 1 ? 4 : engGrad,
      filterCertEnum: filterCert,
    }

    const params = serializeQuery(searchQuery)
    onGetListEngineer(params)
  }, [engGrad, projectLevelEnum, filterCert])

  const handleChange = value => {
    console.log(value)
    selectEngineer(value)
  }
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col>
          <Radio.Group
            onChange={e => setEngGrad(e.target.value)}
            defaultValue={4}
            disabled={projectLevelEnum === 1 || engLoading}
          >
            <Space direction="horizontal">
              <Radio.Button value={4}>
                {engGrad === 4 ? lstEngineer?.length : ""} همه
              </Radio.Button>
              <Radio.Button value={0}>
                {engGrad === 0 ? lstEngineer?.length : ""}ارشد
              </Radio.Button>
              <Radio.Button value={1}>
                {engGrad === 1 ? lstEngineer?.length : ""} پایه 1
              </Radio.Button>
              <Radio.Button value={2}>
                {engGrad === 2 ? lstEngineer?.length : ""} پایه 2
              </Radio.Button>
              <Radio.Button value={3}>
                {engGrad === 3 ? lstEngineer?.length : ""} پایه 3
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Col>
        <Row gutter={[8, 8]}>
          <Col>
            <Checkbox
              onChange={e => {
                setIsFilterCert(e.target.checked)
              }}
              checked={isFilterCert}
              disabled={engLoading}
            >
              فیلتر صلاحیت
            </Checkbox>
          </Col>
          {isFilterCert && (
            <Col>
              <Radio.Group
                onChange={e => setFilterCert(e.target.value)}
                value={filterCert}
                disabled={engLoading}
              >
                <Space direction="horizontal">
                  <Radio value={0}> همه</Radio>
                  <Radio value={1}> بازرسی</Radio>
                  <Radio value={2}> ارت</Radio>
                  <Radio value={3}> تست و تحویل</Radio>
                </Space>
              </Radio.Group>
            </Col>
          )}
        </Row>

        <Row gutter={[8, 8]}>
          <Col>
            <Checkbox
              onChange={e => {
                setFilterCity(e.target.checked)
              }}
              disabled={engLoading}
            >
              فیلتر شهر
            </Checkbox>
          </Col>
          {filterCity && (
            <Col className="gutter-row">
              <Locations setDataAddress={setDataAddress} isAccessCity={true} />
            </Col>
          )}
        </Row>
      </Row>
      {engLoading && <div>در حال بارگذاری </div>}
      <Select
        style={{ width: "100%" }}
        showSearch
        placeholder="انتخاب کارشناس"
        onChange={handleChange}
        filterOption={(input, option) =>
          (option.label || "").toLowerCase().includes(input.toLowerCase())
        }
      >
        {lstEngineer
          ?.filter(
            d =>
              !d.inactive &&
              (engGrad === 4 || d.engineerGradeTypeEnum === engGrad) &&
              (filterCity === false || d.idSection === dataAddress.sectionId)
          )
          ?.map(engineer => (
            <Select.Option
              key={engineer.id}
              value={engineer.id}
              label={
                engineer.fullDescription +
                GetCityWithSection(engineer.idSection)
              }
            >
              <div
                      style={{
                        whiteSpace: 'normal', // Allow text to wrap
                        wordWrap: 'break-word', // Break long words
                    // backgroundImage: `linear-gradient(to left, burlywood ${engineer.sumAmountEngQuota/engineer.sumAmountEngProcessFee}%, transparent ${engineer.sumAmountEngQuota/engineer.sumAmountEngProcessFee}%)`,
                    color: engineer.totalQuotaBalance < 0 || engineer.fullDescription.indexOf('ندارد')!==-1? "red" : "green",
                  }}>
                <span
          
                >
                  {engineer.fullDescription +
                    GetCityWithSection(engineer.idSection)}
                </span>
                {/* <Progress
                  percent={engineer.countErtProcess}
                  strokeWidth={20}
                  style={{
                    paddingInlineStart: "15px",
                    width: "100%",
                  }}
                /> */}
              </div>
            </Select.Option>
          ))}
      </Select>
    </>
  )
}
