import React from "react"
import { Popconfirm, Switch } from "antd"

const ClosedSupport = ({ rowData, mainProps }) => {
  return (
    <Popconfirm
      title={rowData.closed ? "باز کردن تیکت؟" : "بستن تیکت؟"}
      okText="بله"
      cancelText="خیر"
      onConfirm={async () => {
        const { onClosedSupport } = mainProps
        await onClosedSupport({ id: rowData.id, closed: !rowData.closed })
      }}
    >
      <Switch checked={rowData.closed} size="small" />
    </Popconfirm>
  )
}

export default ClosedSupport
