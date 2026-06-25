import React, { useEffect, useState } from "react"
import { Card, Row, Col, Input, Radio, Checkbox, Button, Space } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import Locations from "components/Common/Locations"

// Filter toolbar for the engineer list. Owns its own state (decoupled from the
// add/edit form) and dispatches `filterEngineer` via the `onFilter` callback.
const EngineerFilters = ({ onAdd, onFilter, onFilterStart }) => {
  const [searchName, setSearchName] = useState("")
  const [filterAddress, setFilterAddress] = useState(0)
  const [filterAssign, setFilterAssign] = useState(false)
  const [dataAddress, setDataAddress] = useState({ sectionId: 0 })

  useEffect(() => {
    onFilterStart()
    const timeout = setTimeout(() => {
      onFilter({
        fullName: searchName || "",
        idSection: dataAddress.sectionId,
        filterAddress,
        filterAssign,
      })
    }, 1000)
    return () => clearTimeout(timeout)
  }, [searchName, dataAddress, filterAddress, filterAssign])

  return (
    <Card size="small" className="engineer-filter-card" bodyStyle={{ padding: 12 }}>
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="جستجوی نام کارشناس"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
        </Col>

        <Col xs={24} md={16} lg={10}>
          <Locations setDataAddress={setDataAddress} matches_sm={true} />
        </Col>

        <Col xs={24} lg={8}>
          <Space wrap size="middle">
            <Radio.Group
              value={filterAddress}
              onChange={e => setFilterAddress(e.target.value)}
            >
              <Radio value={0}>استان</Radio>
              <Radio value={1}>شهرستان</Radio>
              <Radio value={2}>بخش</Radio>
            </Radio.Group>
            <Checkbox
              checked={filterAssign}
              onChange={e => setFilterAssign(e.target.checked)}
            >
              فیلتر تایید امضا
            </Checkbox>
          </Space>
        </Col>

        <Col xs={24} style={{ textAlign: "start" }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            افزودن کارشناس
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default EngineerFilters
