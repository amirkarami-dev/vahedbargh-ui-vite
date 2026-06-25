import React, { useState, useRef } from "react"
import { Button, Space, message } from "antd"
import {
  DownloadOutlined,
  SaveOutlined,
  FileImageOutlined,
  FilePdfOutlined,
} from "@ant-design/icons"
import MetaTags from "react-meta-tags"
import Breadcrumb from "../../components/Common/Breadcrumb"

const { DrawIoEmbed } = require("react-drawio")

export default function GasPlanEditor() {
  const [xml, setXml] = useState("")
  const drawioRef = useRef(null)

  // Handle diagram changes
  const handleChange = xmlData => {
    setXml(xmlData)
    console.log("Diagram updated:", xmlData)
  }

  // Save diagram as XML
  const handleSave = () => {
    if (xml) {
      const blob = new Blob([xml], { type: "application/xml" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "elec-plan.drawio"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      message.success("فایل XML با موفقیت ذخیره شد")
    } else {
      message.info({
        content:
          "برای ذخیره: از منوی File > Download یا کلیدهای Ctrl+S در ویرایشگر استفاده کنید",
        duration: 5,
      })
    }
  }

  // Capture diagram XML from drawio events
  const handleAutoSave = event => {
    // Only update XML if we have substantial content to avoid clearing during exports
    if (event.xml && event.xml.length > 100) {
      setXml(event.xml)
    }
  }

  // Export diagram in different formats
  const handleExport = format => {
    if (!drawioRef.current?.exportDiagram) {
      message.error("امکان خروجی‌گیری وجود ندارد")
      return
    }
    const options = {
      format,
      border: "10", // Add small border to ensure content visibility
      scale: 1, // 100% scale
      transparent: false, // Always use opaque background
      background: "#FFFFFF", // White background for all formats
      keepTheme: true,
      size: "page",
      appearance: "light",
    }
    drawioRef.current.exportDiagram(options)
  }

  // Handle draw.io export payload and download safely
  const handleExportEvent = event => {
    const { format, data } = event
    const mime = format === "pdf" ? "application/pdf" : `image/${format}`
    try {
      if (!data || data.length === 0) {
        message.error("خطا: داده خروجی دریافت نشد")
        return
      }

      const dataUrl = data.startsWith("data:")
        ? data
        : `data:${mime};base64,${data}`
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `elec-plan.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      message.success(`${format.toUpperCase()} با موفقیت دانلود شد`)
    } catch (e) {
      console.error("Export handling error", e)
      message.error("خطا در دریافت خروجی")
    }
  }

  return (
    <div className="page-content">
      <MetaTags>
        <title>واحد گاز | ویرایش پلان</title>
      </MetaTags>

      <Breadcrumb title="پلان اولیه" breadcrumbItem="ترسیم " />

      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
          >
            ذخیره فایل XML
          </Button>
          {/* <Button
            icon={<FileImageOutlined />}
            onClick={() => handleExport("png")}
          >
            خروجی عکس
          </Button> */}
   
        </Space>
      </div>

      {/* React DrawIO Component */}
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          backgroundColor: "#fff",
          height: "800px",
        }}
      >
        <DrawIoEmbed
          ref={drawioRef}
          xml={xml}
          autosave={true}
          onAutoSave={handleAutoSave}
          onSave={handleAutoSave}
          onExport={handleExportEvent}
          baseUrl="https://draw.myceo.ir"
          config={{
            defaultLibraries:
              "general;basic;arrows2;flowchart;electrical;er;network;infographic;sitemap",
            css: "",
            libraries: true,
            darkMode: false,
          }}
          urlParameters={{
            lang: "fa",
            darkMode: false
            // use a light theme always for consistency
          }}
          onLoad={() => {
            console.log("DrawIO loaded successfully")
            //message.success("ویرایشگر پلان بارگذاری شد")
          }}
          onError={error => {
            console.error("DrawIO error:", error)
            message.error("خطا در بارگذاری ویرایشگر")
          }}
        />
      </div>
    </div>
  )
}
