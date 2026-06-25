import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

import { withRouter } from "react-router-dom"
import { Link, useHistory, useLocation } from "react-router-dom"
import { Menu, ConfigProvider } from "antd"
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  FileOutlined,
  LogoutOutlined,
} from "@ant-design/icons"

//i18n
import { withTranslation } from "react-i18next"
import { createImageFromInitials, getRandomColor } from "helpers/create_avatar"
import {
  getRoleUser,
  getValueEnum,
  getCurrentUser,
  currencyFormat,
} from "helpers/service_helper"
import { rolesType } from "common/enums/rolesType"
import DialogBank from "components/Common/DialogBank"
import {  getApiUrlUserFiles } from "common/global"

const { SubMenu } = Menu

// تابع برای تبدیل آیکون MDI به component
const getIconComponent = iconClass => {
  if (!iconClass) return <AppstoreOutlined />

  // می‌توانید mapping دقیق‌تر بسازید
  const iconMap = {
    "mdi-home": <HomeOutlined />,
    "mdi-apps": <AppstoreOutlined />,
    "mdi-account": <UserOutlined />,
    "mdi-file": <FileOutlined />,
    "mdi-cog": <SettingOutlined />,
  }

  const matchedIcon = Object.keys(iconMap).find(key => iconClass.includes(key))
  return matchedIcon ? (
    iconMap[matchedIcon]
  ) : (
    <i className={iconClass} style={{ fontSize: "18px" }} />
  )
}

// تابع بازگشتی برای ساخت منو از listMenu
const buildMenuItems = (menuList, t, history) => {
  if (!menuList || menuList.length === 0) return null

  return menuList.map(item => {
    const icon = getIconComponent(item.icon)
    const label = t(item.title)

    if (item.children && item.children.length > 0) {
      // منوی چند سطحی
      return (
        <SubMenu key={item.id} icon={icon} title={label}>
          {buildMenuItems(item.children, t, history)}
        </SubMenu>
      )
    } else {
      // منوی تک سطحی با Link برای پشتیبانی از right-click
      return (
        <Menu.Item key={item.id} icon={icon}>
          <Link
            to={item.path}
          >
            {label}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function scrollElement(item, ref) {
  if (item) {
    const currentPosition = item.offsetTop
    if (currentPosition > window.innerHeight) {
      ref.current.getScrollElement().scrollTop = currentPosition - 300
    }
  }
}

const SidebarContent = props => {
  const [listMenu, setListMenu] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [openKeys, setOpenKeys] = useState([])
  const ref = useRef()
  const history = useHistory()
  const location = useLocation()
  const { userInfo } = props

  useEffect(() => {
    if (ref.current) {
      ref.current.recalculate()
    }
  })

  useEffect(() => {
    if (listMenu.length === 0) {
      setListMenu(props.appMenus)
    }
  }, [props.appMenus])

  // تنظیم منوی فعال بر اساس مسیر فعلی
  useEffect(() => {
    const findMenuKeyByPath = (menus, path) => {
      for (const menu of menus) {
        if (menu.path === path) {
          return menu.id.toString()
        }
        if (menu.children && menu.children.length > 0) {
          const foundKey = findMenuKeyByPath(menu.children, path)
          if (foundKey) {
            // هنگام condensed بودن، باز کردن آکاردئون را مدیریت نکن
            if (!props.isCondensed) {
              setOpenKeys(prev => [...new Set([...prev, menu.id.toString()])])
            }
            return foundKey
          }
        }
      }
      return null
    }

    if (listMenu.length > 0) {
      const activeKey = findMenuKeyByPath(listMenu, location.pathname)
      if (activeKey) {
        setSelectedKeys([activeKey])
      }
    }
  }, [location.pathname, listMenu, props.isCondensed])

  // در حالت condensed، کلیدهای باز را خالی کن تا پاپ‌آپ استاندارد AntD نمایش داده شود
  useEffect(() => {
    if (props.isCondensed && openKeys.length) {
      setOpenKeys([])
    }
  }, [props.isCondensed])

  return (
    <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
      <div>
        {/* Modern User Profile Card */}
        <div>
          <div className="p-2">
            <img
              src={`${getApiUrlUserFiles(getCurrentUser().sid + "/F8.jpg")}`}
              onError={e => {
                const img = e.target
                const sid = getCurrentUser().sid

                if (img.src.includes(".jpg")) {
                  img.src = `${getApiUrlUserFiles(sid + "/F8.png")}`
                } else if (img.src.includes(".png")) {
                  img.src = `${getApiUrlUserFiles(sid + "/F8.jpeg")}`
                }
              }}
              alt=""
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "16px",
                border: "3px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                objectFit: "cover",
              }}
            />

            <div className="info p-2">
              <h5
                style={{ color: "#fff", fontWeight: 600, marginBottom: "8px" }}
              >
                {getCurrentUser().name}
              </h5>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  display: "inline-block",
                }}
              >
                <label
                  style={{ color: "#fff", fontSize: "12px", marginBottom: 0 }}
                >
                  سمت:{" "}
                </label>
                {getRoleUser()?.map((item, index) => {
                  return (
                    <label
                      className=""
                      key={index}
                      style={{ color: "#fff", fontSize: "12px" }}
                    >
                      {index ? "،" : ""} {getValueEnum(rolesType, item).value}
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="info">
            {getCurrentUser().role === "Engineer" && (
              <>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    padding: "12px",
                    marginTop: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <i
                    className="mdi mdi-wallet"
                    style={{ fontSize: "24px", color: "#fff" }}
                  ></i>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "12px",
                        display: "block",
                      }}
                    >
                      کل مبلغ واریزی
                    </span>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {currencyFormat(props?.userBalance)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    padding: "12px",
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <i
                    className="mdi mdi-wallet"
                    style={{ fontSize: "24px", color: "#fff" }}
                  ></i>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "12px",
                        display: "block",
                      }}
                    >
                      کل مبلغ پرونده ها با کسورات
                    </span>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {currencyFormat(userInfo?.sumAmountEngInvoice)}
                    </span>
                  </div>
                </div>
              </>
            )}

            {getCurrentUser().role === "Administrator" && (
              <div style={{ marginTop: "12px" }}>
                <DialogBank />
              </div>
            )}
          </div>
        </div>

        {/* Modern Menu with Ant Design */}
        <div >
          {listMenu && listMenu.length > 0 && (
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    itemBg: "transparent",
                    subMenuItemBg: "transparent",
                    itemColor: "rgba(255, 255, 255, 0.85)",
                    itemHoverColor: "#ffffff",
                    itemHoverBg: "rgba(255, 255, 255, 0.08)",
                    itemSelectedColor: "#ffffff",
                    itemSelectedBg: "rgba(255, 255, 255, 0.16)",
                    itemActiveBg: "rgba(255, 255, 255, 0.12)",
                    popupBg: "#004943",
                    iconSize: 18,
                  },
                },
              }}
            >
              <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                openKeys={props.isCondensed ? undefined : openKeys}
                onOpenChange={
                  props.isCondensed ? undefined : keys => setOpenKeys(keys)
                }
                inlineCollapsed={props.isCondensed}
                triggerSubMenuAction={props.isCondensed ? "click" : "hover"}
                style={{ background: "transparent", border: "none" }}
              >
                {buildMenuItems(listMenu, props.t, history)}
              </Menu>
            </ConfigProvider>
          )}

          <Link
            to="/logout"
            className="dropdown-item logout-btn hide-in-minimal"
            style={{
              background: "rgba(255, 77, 79, 0.1)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginTop: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.background = "rgba(255, 77, 79, 0.2)")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.background = "rgba(255, 77, 79, 0.1)")
            }
          >
            <LogoutOutlined style={{ fontSize: "20px", color: "#ff4d4f" }} />
            {props.isCondensed ? null :      <span style={{ color: "#ff4d4f", fontWeight: 500 }}>
              {props.t("Logout")}
            </span>}
       
          </Link>
        </div>
      </div>
    </SimpleBar>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
