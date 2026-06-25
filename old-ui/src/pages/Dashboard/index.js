import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { Link } from "react-router-dom"

// Custom Scrollbar
import SimpleBar from "simplebar-react"

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png"

// Charts
import LineAreaChart from "../AllCharts/apex/lineareachart"
import RadialChart from "../AllCharts/apex/apexdonut"
import Apexdonut from "../AllCharts/apex/apexdonut1"
import SparkLine from "../AllCharts/sparkline/sparkline"
import SparkLine1 from "../AllCharts/sparkline/sparkline1"
import Salesdonut from "../AllCharts/apex/salesdonut"

import "chartist/dist/scss/chartist.scss"

//i18n
import { withTranslation } from "react-i18next"
import { getUSERs, getUserBalance } from "store/actions"
import { currencyFormat, getCurrentUser } from "helpers/service_helper"
import { Alert, Divider } from "@mui/material"
import Timer from "components/Common/Timer/TimerSimple"
import { initializeSocket, connection } from "helpers/signalr_helper"
import { getDashboardToken } from "helpers/backend_helper"

const Dashboard = props => {
  const { lstUSERs, userInfo } = props
  const search = props.location.search
  const params = new URLSearchParams(search)
  const returnFromBank = params.get("result")
  const [returnMessage, setReturnMessage] = useState(null)
  const [menu, setMenu] = useState(false)

  // Add Metabase dashboard embedding logic
  const [iframeUrl, setIframeUrl] = useState("")

  const toggle = () => {
    setMenu(!menu)
  }
  useEffect(async () => {
    const { onGetUSERs } = props
    onGetUSERs()
    // Initialize SignalR connection
    const initSocket = async () => {
      try {
        const connection = await initializeSocket()
        console.log("Socket connection:", connection)
      } catch (err) {
        console.error("Failed to initialize socket:", err)
      }
    }

    initSocket()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setReturnMessage(null)
    }, 5000)
  }, [returnMessage])

  useEffect(() => {
    const user = getCurrentUser()

    if (returnFromBank) {
      if (returnFromBank.indexOf("ok") !== -1) props.onGetUserBalance()
      setReturnMessage("کیف پول با موفقیت شارژ شد")
      if (returnFromBank.indexOf("error") !== -1)
        setReturnMessage("شارژ کیف پول انجام نشد")
    }
  }, [])

  useEffect(async () => {
    const user = getCurrentUser()
    let dashboardId = 0
    if (user?.role === "Administrator") {
      dashboardId = 34
    }
    const fetchIframeUrl = await getDashboardToken(dashboardId)
    setIframeUrl(fetchIframeUrl?.iframeUrl)
  }, [])

  return (
    <div className="page-content">
      <MetaTags>
        <title>داشبورد | واحد برق </title>
      </MetaTags>
      <Container fluid>
        <Row>
          <Col className="col-12">
            {returnMessage && returnMessage ? (
              <Alert color="info">{returnMessage}</Alert>
            ) : null}
          </Col>
        </Row>
          <Divider
          sx={{
            height: "1px",
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            margin: "20px 0",
          }}
        />
        <Row>
          <Col md={12}>
            <h4 className="alert-heading">اطلاعیه</h4>

            <Alert color="info">
              همکاران محترم تازه‌وارد که موفق به اخذ گواهینامه بازرسی برق اماکن
              شده‌اند مدارک مورد نیاز از جمله کارت ملی، پروانه، مهر و امضا،
              گواهینامه بازرسی و فرم دوره کارآموزی را در قسمت «فایلهای من»
              بارگذاری نموده، سپس در قسمت پشتیبانی درخواست خود را به مدیریت
              ارسال فرمایند.
            </Alert>
            <Alert color="info">
              همکاران محترمی که قصد تغییر صلاحیت در ۶ ماهه « اردیبهشت تا آبان
              ماه» ۱۴۰۴ را دارند درخواست خود را در قسمت پشتیبانی به مدیریت ارسال
              فرمایند.
            </Alert>
            <Alert color="info">
              همکاران محترمی که پروانه خود را تمدید کرده یا ارتقا پایه دریافت
              کرده‌اند در قسمت پشتیبانی ضمن پیوست کردن فایل پروانه جدید به
              مدیریت ارسال فرمایند.
            </Alert>
          </Col>
        </Row>
        <Divider
          sx={{
            height: "1px",
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            margin: "20px 0",
          }}
        />
        {getCurrentUser().role === "Administrator" && (
          <Row>
            <Col className="col-12">
              {iframeUrl ? (
                <iframe
                  src={iframeUrl}
                  title="Metabase Dashboard"
                  width="97%"
                  height="800px"
                  className="metabase-iframe"
                  style={{ border: "none" }}
                />
              ) : (
                <p>در حال بارگذاری داشبورد...</p>
              )}
            </Col>
          </Row>
        )}
        <Row>
          <Col xl={3} md={6}>
            <Card className="mini-stat bg-primary text-white">
              <CardBody>
                <div className="mb-4">
                  <div className="float-start mini-stat-img me-4">
                    <img src={servicesIcon1} alt="" />
                  </div>
                  <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                    آخرین شماره پرونده
                  </h5>
                  <h4 className="fw-medium font-size-24">...</h4>
                </div>
                <div className="pt-2">
                  <div className="float-end">
                    <Link to="#" className="text-white-50">
                      <i className="mdi mdi-arrow-right h5"></i>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl={3} md={6}>
            <Card className="mini-stat bg-primary text-white">
              <CardBody>
                <div className="mb-4">
                  <div className="float-start mini-stat-img me-4">
                    <img src={servicesIcon1} alt="" />
                  </div>
                  <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                    آخرین شماره تقاضا
                  </h5>
                  <h4 className="fw-medium font-size-24">...</h4>
                </div>
                <div className="pt-2">
                  <div className="float-end">
                    <Link to="#" className="text-white-50">
                      <i className="mdi mdi-arrow-right h5"></i>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl={3} md={6}>
            <Card className="mini-stat bg-primary text-white">
              <CardBody>
                <div className="mb-4">
                  <div className="float-start mini-stat-img me-4">
                    <img src={servicesIcon1} alt="" />
                  </div>
                  <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                    وضعیت درگاه
                  </h5>
                  <h4 className="fw-medium font-size-24">...</h4>
                </div>
                <div className="pt-2">
                  <div className="float-end">
                    <Link to="#" className="text-white-50">
                      <i className="mdi mdi-arrow-right h5"></i>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl={3} md={6}>
            <Card className="mini-stat bg-primary text-white">
              <CardBody>
                <div className="mb-4">
                  <div className="float-start mini-stat-img me-4">
                    <img src={servicesIcon1} alt="" />
                  </div>
                  <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                    آخرین تاریخ ثبت
                  </h5>
                  <h4 className="fw-medium font-size-24">...</h4>
                </div>
                <div className="pt-2">
                  <div className="float-end">
                    <Link to="#" className="text-white-50">
                      <i className="mdi mdi-arrow-right h5"></i>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col xl={4}>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">آخرین گزارشات پیشرفت کار</h4>
                <Col className="activity-feed">

                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                       پیاده سازی فرم تابلو ساز
                      </span>
                      <span className="date">
                        <span className="text-info">در حال انجام</span>
                      </span>
                    </div>
                  </li>
                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        مدیریت پرونده تخصیصی توسط کارشناس
                      </span>
                      <span className="date">
                        <span className="text-info">انجام شده</span>
                      </span>
                    </div>
                  </li>
                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                      پیاده سازی فرم شماره 3 و فرم مربوط به مجری ارت
                      </span>
                      <span className="date">
                        <span className="text-info">انجام شده</span>
                      </span>
                    </div>
                  </li>
                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        پیاده سازی سیستم پرداخت آنلاین ایران کیش
                      </span>
                      <span className="date">
                        <span className="text-info">در حال انجام</span>
                      </span>
                    </div>
                  </li>
                <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        پیاده سازی تخصیص پرونده به کارشناس
                      </span>
                      <span className="date">
                        <span className="text-info">انجام شده</span>
                      </span>
                    </div>
                  </li>
                <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        ایجاد پرونده به صورت  ثبت عادی در سامانه
                      </span>
                      <span className="date">
                        <span className="text-info">انجام شده-انجام شده</span>
                      </span>
                    </div>
                  </li>

                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        راه اندازی سرور تستی جهت انجام فرایندهای سامانه
                      </span>
                      <span className="date">
                        <span className="text-info">انجام شده</span>
                      </span>
                    </div>
                  </li>

                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        ایجاد زیرساخت ارسال پیامک در سامانه
                      </span>
                      <span className="date">
                        <Link to="#" className="text-info">
                          {" "}
                          انجام شده
                        </Link>
                      </span>
                    </div>
                  </li>
                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        ایجاد سرور دیتابیس و سرور s3 جهت ذخیره فایل ها
                      </span>
                      <span className="date">
                        <Link to="#" className="text-info">
                          {" "}
                          انجام شده
                        </Link>
                      </span>
                    </div>
                  </li>
                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        ایجاد کاربری برای کلیه کارشناسان و مجریان ارت
                      </span>
                      <span className="date">
                        <Link to="#" className="text-info">
                          {" "}
                          انجام شده
                        </Link>
                      </span>
                    </div>
                  </li>
      
                  <li className="feed-item">
                    <div className="feed-item-list">
                      <span className="date"></span>
                      <span className="activity-text">
                        انجام فرایند دریافت نماد اعتماد برای سامانه
                      </span>
                      <span className="date">
                        <span className="text-info">انجام شده</span>
                      </span>
                    </div>
                  </li>
                </Col>

              </CardBody>
            </Card>
          </Col>

          <Col xl={5}>
            <Row>
              <Col md={6}>
                <Card className="text-center">
                  <CardBody>
                    <div className="py-4">
                      <i className="ion ion-ios-checkmark-circle-outline display-4 text-success"></i>

                      <h5 className="text-primary mt-4">نسخه آزمایشی</h5>
                      <p className="text-muted">سامانه </p>
                      <div className="mt-4">
                        <Link to="" className="btn btn-primary btn-sm">
                          آخرین وضعیت
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-primary">
                  <CardBody>
                    <div className="text-center text-white py-4">
                      <h5 className="mt-0 mb-4 text-white-50 font-size-16">
                        <Timer />
                        روز
                      </h5>
                      <p className="font-size-14 pt-1">
                        {" "}
                        مانده تا بهره برداری اولیه
                      </p>
                      <p className="text-white-50 mb-0">
                        <Link to="#" className="text-white"></Link>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                      <h4 className="card-title mb-4">آخرین وضعیت سامانه</h4>
                    <p className="text-muted mb-3 pb-4">
                      تعداد کاربران سیستم تا کنون: 747 کاربر
                      <br />
                      وضعیت سرور: پایدار
                    </p>
                    <div className="float-end mt-2">
                        <i className="mdi mdi-arrow-right h7">جلسات</i>
                        
                    </div>
                    <div className="float-start mt-2">
                      <Link to="#" className="text-primary">
                        <i>.....</i>

                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl={3}>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">گزارشات درصد پیشرفت</h4>
                <div className="cleafix">
                  <p className="float-start">
                    <i className="mdi mdi-calendar me-1 text-primary" />
                  </p>
                  <h5 className="font-18 text-end">1402/11/23</h5>
                </div>
                <div id="ct-donut" className="ct-chart wid pt-4">
                  <Salesdonut />
                </div>
                <div className="mt-4">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <td>
                          <span className="badge bg-success">انجام شده</span>
                        </td>
                        <td>50 درصد</td>
                        <td className="text-end">...</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="badge bg-primary">درحال تست</span>
                        </td>
                        <td>15 درصد</td>
                        <td className="text-end">...</td>
                      </tr>

                      <tr>
                        <td>
                          <span className="badge bg-warning">شروع نشده</span>
                        </td>
                        <td>35 درصد</td>
                        <td className="text-end">...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        {/* <Row>
          <Col xl={9}>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">تعداد پرونده ها در یک ماه</h4>
                <Row>
                  <Col lg={7}>
                    <div>
                      <LineAreaChart />
                    </div>
                  </Col>
                  <Col lg={5}>
                    <Row>
                      <Col md={6}>
                        <div className="text-center">
                          <p className="text-muted mb-4">ماه جاری</p>
                          <h3>...</h3>
                          <p className="text-muted mb-5">
                            تعداد کارهای انجام شده در یک ماه
                          </p>
                          <RadialChart />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text-center">
                          <p className="text-muted mb-4">سال جاری</p>
                          <h3>...</h3>
                          <p className="text-muted mb-5">
                            تعداد کارهای انجام شده در یک سال
                          </p>
                          <Apexdonut />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col xl={3}>
            <Card>
              <CardBody>
                <div>
                  <h4 className="card-title mb-4">Connections Analytics</h4>
                </div>
                <div className="wid-peity mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <p className="text-muted">کاربران</p>
                        <h5 className="mb-4"> 923</h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <SparkLine />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wid-peity mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <p className="text-muted">وضعیت سرور</p>
                        <h5 className="mb-4"> OK</h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <SparkLine1 />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <p className="text-muted">وضعیت دیتابیس</p>
                        <h5>OK</h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <SparkLine />
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </div>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  lstUSERs: PropTypes.any,
  onGetUSERs: PropTypes.func,
  onGetUserBalance: PropTypes.func,
}

const mapStateToProps = ({ USERs }) => ({
  lstUSERs: USERs.lstUSERs,
  userBalance: USERs.userBalance,
  userInfo: USERs.userInfo,
})

const mapDispatchToProps = dispath => ({
  onGetUSERs: () => dispath(getUSERs()),
  onGetUserBalance: () => dispath(getUserBalance()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Dashboard))
