import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Card, Table, Empty } from "antd"
import { columns } from "./columns"
import EngineerFilters from "./EngineerFilters"
import EngineerFormDrawer from "./EngineerFormDrawer"
import {
  addUserFile,
  deleteUserFile,
  filterEngineer,
  filterLoading,
  getListEngineer,
  getUserFiles,
  resetUSERFlag,
  upsertEngHistory,
  upsertEngineer,
} from "store/actions"
import { withTranslation } from "react-i18next"
import "./baseInfo.scss"

// Orchestrates the engineer screen: filter toolbar + table + add/edit drawer.
// The add/edit form (drawer) and the list filters (toolbar) now own separate
// state, untangling the old single-form-does-everything coupling.
const EngineerList = props => {
  const {
    lstEngineer,
    loading,
    openNotification,
    onGetListEngineer,
    onUpsertEngineer,
    onFilterEngineer,
    onFilterLoading,
  } = props

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)

  useEffect(() => {
    onGetListEngineer()
  }, [])

  useEffect(() => {
    if (props.success && openNotification)
      openNotification("success", "top", props.success)
    if (props.error && openNotification)
      openNotification("error", "top", props.error)
  }, [props.success, props.error])

  const openAdd = () => {
    setEditingRecord(null)
    setDrawerOpen(true)
  }
  const openEdit = record => {
    setEditingRecord(record)
    setDrawerOpen(true)
  }
  const closeDrawer = () => setDrawerOpen(false)
  const handleSave = payload => {
    onUpsertEngineer(payload)
    setDrawerOpen(false)
  }

  return (
    <div className="engineer-list">
      <EngineerFilters
        onAdd={openAdd}
        onFilterStart={() => onFilterLoading(true)}
        onFilter={payload => onFilterEngineer(payload)}
      />

      <Card
        size="small"
        className="engineer-table-card"
        bordered={false}
        bodyStyle={{ padding: 8 }}
        style={{ marginTop: 12 }}
      >
        <Table
          size="small"
          locale={{ emptyText: <Empty description="کارشناسی یافت نشد" /> }}
          pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
          scroll={{ y: 600, x: 1400 }}
          sticky
          columns={columns({ props, handleEdit: openEdit })}
          rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
          rowKey={record => record.id}
          dataSource={lstEngineer}
          loading={loading}
        />
      </Card>

      <EngineerFormDrawer
        open={drawerOpen}
        editingRecord={editingRecord}
        loading={loading}
        onClose={closeDrawer}
        onSave={handleSave}
      />
    </div>
  )
}

const mapStateToProps = ({ Engineers, USERs }) => ({
  lstEngineer: Engineers.lstEngineer,
  error: Engineers.error,
  success: Engineers.success,
  loading: Engineers.loading,
  lstUserFiles: USERs.lstUserFiles,
  errorUser: USERs.error,
  successUser: USERs.success,
})

const mapDispatchToProps = dispatch => ({
  onGetListEngineer: () => dispatch(getListEngineer()),
  onUpsertEngineer: data => dispatch(upsertEngineer(data)),
  onUpsertEngHistory: data => dispatch(upsertEngHistory(data)),
  onGetUserFiles: searchValue => dispatch(getUserFiles(searchValue)),
  onAddUserFile: attachData => dispatch(addUserFile(attachData)),
  onDeleteUserFile: id => dispatch(deleteUserFile(id)),
  onResetUSERFlag: searchValue => dispatch(resetUSERFlag(searchValue)),
  onFilterEngineer: data => dispatch(filterEngineer(data)),
  onFilterLoading: data => dispatch(filterLoading(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EngineerList))
