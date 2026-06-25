import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"

import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import {
  getEppByEpId,
  getListEngineer,
  projectProcess,
  resetElectProcessFlag,
} from "store/actions"
import { getCurrentUser } from "helpers/service_helper"
import "./electProjectProcess.scss"

import {
  Layout,
  Button,
  Row,
  Col,
  notification,
  Radio,
  InputNumber,
  Divider
} from "antd"
import {
  DeliveredProcedureOutlined,
} from "@ant-design/icons"
const { Header, Footer, Sider, Content } = Layout
import { ListEngineer } from "./ListEngineer"
import ListElectProject from "./ListElectProject"
notification.config({
  duration: 1,
  rtl: true,
})
const Index = props => {
  const {
    matches_sm,
    loading,
    selectedProject,
    countSelectedProject,
    onProjectProcess,
    flatSelectedProject,
    triggerReload‌ByProject,
    triggerReload‌ByProcess,
    onResetElectProcessFlag,
  } = props

  const [api, contextHolder] = notification.useNotification()
  const [errorMessage, setErrorMessage] = useState(null)
  const [idEngineer, setIdEngineer] = useState(null)
  const [projectProcessType, setProjectProcessType] = useState(0)
  const [ertAmount, setErtAmount] = useState(0)
  const [projectLevelEnum, setProjectLevelEnum] = useState(0)
  const [isTestAndDelivery, setIsTestAndDelivery] = useState(false)
  const openNotification = (type, placement, message) => {
    api[type]({
      message,
      placement,
    })
  }


  useEffect(() => {
    if(flatSelectedProject.length>0){
     const testAndDelivery = flatSelectedProject.filter(item=>item.isTestAndDelivery===true)
     if(testAndDelivery && testAndDelivery.length>0){
      setIsTestAndDelivery(true)
     }
    }
  }, [flatSelectedProject])

  useEffect(() => {
    setProjectProcessType(projectLevelEnum <= 1 ? projectLevelEnum : -1)
  }, [projectLevelEnum])
  useEffect(() => {
    if (props.success) openNotification("success", "top", props.success)
    if (props.error) openNotification("error", "top", props.error)
    if (errorMessage) openNotification("warning", "top", props.error)
    onResetElectProcessFlag()
  }, [errorMessage, props.success, props.error])

  // useEffect(() => {
  //   // Set the browser zoom level to 80%
  //   const zoomLevel = 0.9;
  //   const contentScale = 1 / window.devicePixelRatio * zoomLevel;
  //   document.body.style.transform = `scale(${contentScale})`;
  //   document.body.style.transformOrigin = 'top right';
  // }, []);

  const contentStyle = {
    backgroundColor: "#fff",
    margin: 2,
    paddingInline: 2,
    borderRadius: 2,
  }

  const saveProjectProcess = async () => {
    console.log("flatSelectedProject", flatSelectedProject.projectId)
    if (flatSelectedProject.projectId.length > 0 && idEngineer !== null)
      await onProjectProcess({
        IdElectProjects: flatSelectedProject.projectId,
        IdEngineer: idEngineer,
        projectProcessTypeEnum: projectProcessType,
        ertAmount: ertAmount || 0,
      })
  }

  return (
    <div className="page-content">
      <MetaTags>
        <title>پرونده | واحد برق</title>
      </MetaTags>
      <Layout>
        <Breadcrumb title={props.t("electUnit")} breadcrumbItem="تخصیص" />
        {contextHolder}
        <Content>
          {/* تعداد کل انتخابی:{countSelectedProject} */}
          {getCurrentUser().role && (
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <ListEngineer
                  openNotification={openNotification}
                  selectEngineer={setIdEngineer}
                  projectLevelEnum ={projectLevelEnum}
                  isTestAndDelivery = {isTestAndDelivery}
                  props={props}
                />
              </Col>
              <Col>
                <Radio.Group
                  name="projectProcessType"
                  onChange={evt => setProjectProcessType(+evt.target.value)}
                  value={projectProcessType}
                  optionType="default"
                  buttonStyle="solid"
                >
                  <Radio.Button disabled={projectLevelEnum !== 0} value={0}>
                    {" "}
                    تخصیص به کارشناس
                  </Radio.Button>
                  <Radio.Button disabled={ (projectLevelEnum!== 0 && projectLevelEnum!== 1) || isTestAndDelivery} value={1}>
                    {" "}
                    تخصیص به مجری ارت
                  </Radio.Button>
                </Radio.Group>
              </Col>
              <Col>
                {/* {projectProcessType === 1 && !isTestAndDelivery && (
                  <> <span>این مبلغ به تعرفه ارت اضافه میگردد</span>
                 <InputNumber
                    value={ertAmount}
                    formatter={value =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    min={0}
                    onChange={value => setErtAmount(value)}
                    placeholder="مبلغ"
                    style={{ width: "100%" }}
                  /></>
                )} */}
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  icon={<DeliveredProcedureOutlined />}
                  disabled={
                    loading ||
                    projectLevelEnum > 1 ||
                    !idEngineer ||
                    flatSelectedProject.projectId.length === 0 ||
                    (projectProcessType === 1 && +ertAmount < 0)
                  }
                  onClick={saveProjectProcess}
                >
                  ذخیره
                </Button>
              </Col>
            </Row>
          )}
          <ListElectProject
            openNotification={openNotification}
            reload={triggerReload‌ByProject + triggerReload‌ByProcess}
            setProjectLevelEnum={setProjectLevelEnum}
            mainProps={props}
          />
        </Content>
      </Layout>
    </div>
  )
}


const mapStateToProps = ({ USERs, ElectProjectProcesses,ElectProjects, Engineers }) => ({
  loading: ElectProjectProcesses.loading,
  lstEpp: ElectProjectProcesses.lstEpp,
  error: ElectProjectProcesses.error,
  success: ElectProjectProcesses.success,
  userBalance: USERs.userBalance,
  selectedProject: ElectProjectProcesses.selectedProject,
  countSelectedProject: ElectProjectProcesses.countSelectedProject,
  flatSelectedProject: ElectProjectProcesses.flatSelectedProject,
  triggerReload‌ByProcess: ElectProjectProcesses.triggerReload,
  triggerReload‌ByProject:  ElectProjects.triggerReload,
  
  lstEngineer: Engineers.lstEngineer,
  engLoading: Engineers.loading,
  engError: Engineers.error,
  engSuccess: Engineers.success,
})

const mapDispatchToProps = dispatch => ({
  onGetEppByEpId: electProjectId => dispatch(getEppByEpId(electProjectId)),
  onGetListEngineer: filter => dispatch(getListEngineer(filter)),
  onProjectProcess: data => dispatch(projectProcess(data)),
  onResetElectProcessFlag: () => dispatch(resetElectProcessFlag()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Index))
