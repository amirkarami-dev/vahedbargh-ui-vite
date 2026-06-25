import React, { useState } from "react"
import { Table, Checkbox, Image, Button, Popconfirm } from "antd"
import {
   getApiUrlSupportFiles
} from "common/global"

import "./GridFilesAnt.scss"
import { DeleteTwoTone } from "@ant-design/icons"

export const renderDeleteButton = (params, props) => {
  return <Popconfirm
  title="حذف تخصیص"
  description="مطمئنی یا نه؟"
  onConfirm={() => props.onDeleteSupportFiles(params.id)}
  okText="Yes"
  cancelText="No"

>  <Button icon={<DeleteTwoTone />} /> </Popconfirm>
 }

const GridSupportFilesAnt = React.memo(gridProps => {
  const { props } = gridProps
  const columns = [
    {
      title: "فایل",
      dataIndex: "fileName",
      key: "fileName",
      render: (text, row) => (
        <div>
          {row.fileName.split(".")[1] === "pdf" ? (
            "PDF"
          ) : (
            <Image
              height={100}
              width={100}
              src={`${getApiUrlSupportFiles(
                    row.folderName + "/" + row.fileName
                  )}`}
            />
          )}
        </div>
      ),
    },
    {
      title: "نوع فایل",
      dataIndex: "fileTypeName",
      key: "fileTypeName",
      render: text => `${props.t("enums." + text)}`,
      align: "right",
    },
    {
      title: "لینک دانلود",
      key: "download",
      render: (text, row) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          download
          href={`${getApiUrlSupportFiles(
                    row.folderName + "/" + row.fileName
                  )}`}
        >
          دانلود
        </a>
      ),
      align: "center",
    },
    {
      title: "حذف",
      key: "delete",
      render: params => renderDeleteButton(params, props),
      width: "3rem",
    },
  ]


  return (
      <Table
        dataSource={gridProps.lstSupportFiles}
        columns={columns}
        rowKey="id"
        pagination={false}
        style={{ minWidth: 400 }}
      />
  )
})


export default  GridSupportFilesAnt
