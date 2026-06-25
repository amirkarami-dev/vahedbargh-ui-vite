import React, { useEffect, useState } from "react"
import { Button, Card, Typography, Alert, Spin, Descriptions } from "antd"
import { SendOutlined } from "@ant-design/icons"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import {
  addFileElectProjectSingle,
  getElectProjectFiles,
  getElectProjectInfo,
} from "store/actions"
import logoSm from "../../assets/images/nazamlogo.png"
import { ProjectFilesPublic } from "./ProjectFilesPublic"

const { Title, Text } = Typography

const ProjectPublic = props => {
  const query = new URLSearchParams(props.location.search)
  const { loading, projectInfo, onGetProjectInfo } = props
  const returnFromBank = query.get("result")
  const [returnMessage, setReturnMessage] = useState(null)

  useEffect(() => {
    const gasProjectId = query.get("e")
    if (!gasProjectId) {
      window.alert("مشکل در شماره پارامتر های ارسالی")
    } else {
      onGetProjectInfo(gasProjectId)
    }
  }, [])

  useEffect(() => {
    if (returnFromBank) {
      if (returnFromBank.includes("ok"))
        setReturnMessage(
          `مبلغ به حساب کیف پول واحد برق واریز گردید - کد رهگیری: ${
            returnFromBank.split("-")[1]
          }`
        )
      if (returnFromBank.includes("error")) setReturnMessage("واریز انجام نشد")
    }
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      {loading && (
        <Spin size="large" style={{ width: "100%", marginBottom: 20 }} />
      )}

      {props.error && <Alert type="error" message={props.error} />}
      {returnMessage && <Alert type="info" message={returnMessage} />}

      {!returnFromBank && projectInfo && (
        <Card
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={logoSm}
                alt="Logo"
                style={{ width: 50, marginRight: 10 }}
              />
              <span className="ps-4">
                واحد نظارت برق سازمان نظام مهندسی استان کردستان
              </span>
            </div>
          }
          style={{ marginTop: 20 }}
        >
          <Alert
            type="error"
            message="مالک گرامی درصورت اطمینان از صحت اطلاعات زیر  جهت بارگذاری  مدارک روی فایل کلیک کنید "
          ></Alert>
          <Descriptions bordered column={1}  size="small">
            <Descriptions.Item label="شماره پرونده">
              {projectInfo.fileNumber}
            </Descriptions.Item>
            <Descriptions.Item label="شماره تقاضا">
              {projectInfo.electRequestNumber}
            </Descriptions.Item>
            <Descriptions.Item label="نام مالک">
              {projectInfo.landlordName}
            </Descriptions.Item>
            <Descriptions.Item label="کد ملی مالک">
              {projectInfo.naCode}
            </Descriptions.Item>
            <Descriptions.Item label="آدرس">
              {projectInfo.address}
            </Descriptions.Item>
            <Descriptions.Item label="فایل ها">
              <ProjectFilesPublic mainProps={props} rowData={projectInfo} />
            </Descriptions.Item>
            <Descriptions.Item label="ارتباط با واحد برق">
              <span>087-33564874-33564876 داخلی: 123</span>
            </Descriptions.Item>
            
            <Descriptions.Item label="موبایل پشتیبانی">
              <a href="tel:09372180164">09372180164</a>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  )
}

const mapStateToProps = ({ ElectProjects }) => ({
  error: ElectProjects.error,
  success: ElectProjects.success,
  loading: ElectProjects.loading,
  projectInfo: ElectProjects.projectInfo,
  lstElectProjectFiles: ElectProjects.lstElectProjectFiles,
})

const mapDispatchToProps = dispatch => ({
  onGetProjectInfo: data => dispatch(getElectProjectInfo(data)),
  onAddFileElectProjectSingle: attachData =>
    dispatch(addFileElectProjectSingle(attachData)),
  onGetProjectFiles: data => dispatch(getElectProjectFiles(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ProjectPublic))
