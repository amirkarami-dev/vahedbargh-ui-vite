import { useState, useEffect } from "react"
import { withRouter, useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { loginUser, requestDemo, resetRequestDemo } from "../../store/actions"
import MetaTags from "react-meta-tags"
import {
  LockOutlined,
  UserOutlined,
  NotificationTwoTone,
  ExperimentTwoTone,
  DeploymentUnitOutlined,
} from "@ant-design/icons"
import {
  Form,
  Input,
  Button,
  Card,
  Alert,
  Modal,
  Checkbox,
  Row,
  Col,
  Typography,
  theme,
} from "antd"
import logoSm from "../../assets/images/nazamlogo.png"
import "./gasProjectEng.scss"

const { Title, Text } = Typography
const { useToken } = theme

const Login = ({ loginUser, error, loading, history, requestDemo, requestDemoState, resetRequestDemo }) => {
  const { token } = useToken()
  const location = useLocation()
  const [form] = Form.useForm()
  const [isHovered, setIsHovered] = useState(false)
  const [demoVisible, setDemoVisible] = useState(false)
  const [demoForm] = Form.useForm()

  useEffect(() => {
    if (requestDemoState && requestDemoState.message) {
      // reset form and close modal after success
      demoForm.resetFields()
      setTimeout(() => {
        setDemoVisible(false)
        resetRequestDemo()
      }, 1200)
    }
  }, [requestDemoState, demoForm, resetRequestDemo])

  // Sample news and updates
  const appUpdates = [
    {
      date: "1404/01/28",
      title: "نسخه 2.1 منتشر شد!",
      content: ["انجام آخرین تغییرات در فرایند تایید طراحی و نقشه"],
      icon: <DeploymentUnitOutlined />,
      color: "blue",
    },
    {
      date: "1404/01/20",
      title: "به روزرسانی امنیتی",
      content: [
        "1. بهبود مکانیزم احراز هویت دو مرحله ای",
        "2. افزایش امنیت API های سیستمی",
        "3. ایجاد سامانه auditLog برای ردیابی فعالیت‌ها",
      ],
      icon: <ExperimentTwoTone twoToneColor="#eb2f96" />,
      color: "red",
    },
    {
      date: "1404/01/05",
      title: "ویژگی جدید",
      content: [
        "1. انجام آخرین تغییرات در فرایند تایید طراحی و نقشه",
        "2. بهبود سیستم گزارشگیری خودکار",
        "3. افزودن قابلیت خروجی Excel پیشرفته",
      ],
      icon: <NotificationTwoTone />,
      color: "green",
    },
  ]

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const initialValues = {
      userName: query.get("u") || "",
      password: query.get("p") || "",
    }
    form.setFieldsValue(initialValues)
  }, [location.search, form])

  const handleSubmit = async values => {
    try {
      await loginUser(values, history)
    } catch (err) {
      console.error("Login failed:", err)
    }
  }

  return (
    <div className="modern-login-container">
      <MetaTags>
        <title>ورود | واحد نظارت برق - نسخه 2.1</title>
      </MetaTags>

      <Row justify="center" align="middle" className="min-h-screen">
        <Col xs={24} md={12} className="login-column">
          <Card
            className="glassmorphism-card"
            hoverable
            style={{
              transform: isHovered ? "translateY(-5px)" : "none",
              transition: "all 0.3s ease-in-out",
              margin: 16,
            }}
          >
            <div className="text-center mb-6">
              <img
                src={logoSm}
                alt="Logo"
                className="logo-hover-transform"
                style={{ height: 80, marginBottom: token.marginMD }}
              />
              <Title level={3} className="gradient-text">
                سامانه نظارت برق نظام مهندسی استان کردستان
              </Title>
              <Text type="secondary">نسخه 2.1 - 1404</Text>
            </div>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  closable
                  className="mb-4"
                />
              )}

              <Form.Item
                name="userName"
                label="نام کاربری"
                rules={[
                  { required: true, message: "لطفا نام کاربری را وارد کنید" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="example@domain.com"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="رمز عبور"
                rules={[
                  { required: true, message: "لطفا رمز عبور را وارد کنید" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="••••••••"
                  size="large"
                />
              </Form.Item>

              <Row justify="space-between" align="middle">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>مرا به خاطر بسپار</Checkbox>
                </Form.Item>
                <Button type="link" href="/forgot-password" className="p-0">
                  بازیابی رمز عبور
                </Button>
              </Row>

              <Form.Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  className="gradient-btn"
                >
                  {loading ? "در حال ورود..." : "ورود به سیستم"}
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-4">
              <Button type="default" onClick={() => setDemoVisible(true)}>
                درخواست دمو
              </Button>
            </div>

            <div className="text-center mt-4 trust-seal-section">
            <a referrerPolicy="origin"    
         target="_blank"
          href="https://trustseal.enamad.ir/?id=447340&Code=N1jQYqWl5N3kn4ThI4ZFmw5VHzH4scbm">
            <img referrerPolicy="origin"
             src="https://trustseal.enamad.ir/logo.aspx?id=447340&Code=N1jQYqWl5N3kn4ThI4ZFmw5VHzH4scbm" 
             alt="" className="trust-seal-image" id="nHJ5DfcRppVkF57irimx" />
            </a>
            </div>
          </Card>
        </Col>

        <Modal
          title="درخواست دمو"
          visible={demoVisible}
          onCancel={() => setDemoVisible(false)}
          footer={null}
        >
          {requestDemoState && requestDemoState.error && (
            <Alert message={requestDemoState.error} type="error" showIcon className="mb-4" />
          )}
          {requestDemoState && requestDemoState.message && (
            <Alert message={requestDemoState.message} type="success" showIcon className="mb-4" />
          )}
          <Form form={demoForm} layout="vertical" onFinish={values => requestDemo(values)}>
            <Form.Item
              name="name"
              label="نام"
              rules={[{ required: true, message: "لطفا نام را وارد کنید" }]}
            >
              <Input placeholder="نام" />
            </Form.Item>
            <Form.Item
              name="mobile"
              label="شماره موبایل"
              rules={[{ required: true, message: "لطفا شماره موبایل را وارد کنید" }]}
            >
              <Input placeholder="0901xxxxxxx" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={requestDemoState && requestDemoState.loading}>
                ارسال درخواست
              </Button>
            </Form.Item>
          </Form>
        </Modal>

      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.Login.error,
  loading: state.Login.loading,
  requestDemoState: state.RequestDemo,
})

export default withRouter(connect(mapStateToProps, { loginUser, requestDemo, resetRequestDemo })(Login))
