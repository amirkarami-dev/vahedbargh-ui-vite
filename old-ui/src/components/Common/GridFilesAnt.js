import React, { useState } from "react"
import { Table, Checkbox, Image, Button, Space } from "antd"
import {
  getApiUrlElectProjectFiles,
  getUrlElectProjectFiles,
} from "common/global"
import { EyeOutlined } from "@ant-design/icons"

const GridFiles = React.memo(gridProps => {
  const { props } = gridProps
  const [selectedLinks, setSelectedLinks] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [loading, setLoading] = useState(false); 
  const columns = [
    {
      title: <Checkbox  checked={selectAll} onChange={e => handleSelectAll(e)} >فایل</Checkbox>,
      dataIndex: "fileName",
      key: "fileName",
      render: (text, row) => (
        <div>
          <Checkbox
            checked={selectedLinks.includes(
              getUrlElectProjectFiles(row.folderName + "/" + row.fileName)
            )}
            onChange={() => onSelectChange(row)}
          />
          {row.fileName.split(".")[1] === "pdf" ? (
            "PDF"
          ) : (
            <Image
              height={100}
              width={100}
              src={`${getApiUrlElectProjectFiles(
                row.folderName + "/" + row.fileName
              )}`}
                  preview={{
              mask: (
                <Space direction="vertical" align="center" size={2}>
                  <EyeOutlined style={{ fontSize: 20 }} />
                  <span style={{ fontSize: 11 }}>مشاهده</span>
                </Space>
              ),
            }}
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
          href={`${getApiUrlElectProjectFiles(
            row.folderName + "/" + row.fileName
          )}`}
        >
          دانلود
        </a>
      ),
      align: "center",
    },
  ]

  const onSelectChange = row => {
    const link = getUrlElectProjectFiles(row.folderName + "/" + row.fileName)
    setSelectedLinks(prevSelectedLinks =>
      prevSelectedLinks.includes(link)
        ? prevSelectedLinks.filter(l => l !== link)
        : [...prevSelectedLinks, link]
    )
  }

  const handleDownloadLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/Users/GetPhysicalZipFileS3",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filePaths: selectedLinks }),
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "files.zip"
      link.click()
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error("Failed to download files:", error)
    } finally {
      setLoading(false); // Set loading state to false when download completes (or fails)
    }
  }

  const handleSelectAll = e => {
    const checked = e.target.checked
    setSelectAll(checked)
    if (checked) {
      const allLinks = gridProps.lstElectProjectFiles.map(row =>
        getUrlElectProjectFiles(row.folderName + "/" + row.fileName)
      )
      setSelectedLinks(allLinks)
      
    } else {
      setSelectedLinks([])
    }
  }
  return (
    <>
      <Button disabled={selectedLinks.length===0} type="primary" onClick={handleDownloadLinks} loading={loading} >
        دانلود zip
      </Button>
      <Table
        dataSource={gridProps.lstElectProjectFiles}
        columns={columns}
        rowKey="id"
        pagination={false}
        style={{ minWidth: 400 }}
      />
    </>
  )
})

export default GridFiles
