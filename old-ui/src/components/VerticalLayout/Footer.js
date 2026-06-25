import React from "react"
import { ThunderboltOutlined } from "@ant-design/icons"

const Footer = () => {
  return (
    <footer className="footer app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__logo">
          <ThunderboltOutlined />
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="app-footer__title">
            دفتر اجرایی نظارت برق استان کردستان
          </div>
          <div className="app-footer__copy">
            Copyright © {new Date().getFullYear()} - تمامی حقوق محفوظ است
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
