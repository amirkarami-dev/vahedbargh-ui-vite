import { useState } from 'react'
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import { Locations, type DataAddress } from '@/shared/components'
import { getRoles } from '@/shared/lib/auth'
import { useUpdateElectProject } from '@/features/electProjects/api/useElectProjectActions'
import { BuildingGroupParams, BuildingGroupTypes, ErtSystemTypes } from '@/shared/enums/buildingGroup'
import type { ElectProject } from '@/features/electProjects/types'

const { Text } = Typography

// Initial form values from the row (old-ui valueItem, with the same defaults).
function baseValues(p: ElectProject) {
  return {
    landlordName: p.landlordName,
    companyName: p.companyName,
    landlordNaCode: p.landlordNaCode,
    landlordPhoneNumber: p.landlordPhoneNumber,
    supervisorName: p.supervisorName,
    supervisorPhoneNumber: p.supervisorPhoneNumber,
    postalCode: p.postalCode,
    area: p.area,
    areaAsBuilt: p.areaAsBuilt ?? 0,
    address: p.address,
    numberOfFloor: p.numberOfFloor,
    licenseNumber: p.licenseNumber,
    buildingGroupTypeEnum: p.buildingGroupTypeEnum ?? 1,
    buildingGroupParameterTypeEnum: p.buildingGroupParameterTypeEnum ?? 1,
    isEarthSystem: !!p.isEarthSystem,
    ertSystemTypeEnum: p.ertSystemTypeEnum ?? 0,
    isBuildingInspection: !!p.isBuildingInspection,
    panelNeed: !!p.panelNeed,
    foundationElectrodeArea: p.foundationElectrodeArea ?? 0,
    isNeedEb: !!p.isNeedEb,
    hasSupervision: !!p.hasSupervision,
    hasRelatedPermit: !!p.hasRelatedPermit,
    childInspectionCount: p.childInspectionCount ?? 0,
    childErtCount: p.childErtCount ?? 0,
  }
}

// Edit project (old-ui ProjectMainEdit.js), as an antd Form drawer. Booleans are
// real booleans here (no "true" string coercion). Triggered by the file number.
export function ProjectEditDrawer({ project }: { project: ElectProject }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: project.idSection })
  const update = useUpdateElectProject()

  const roles = getRoles()
  const isAdminOrSection = roles.includes('Administrator') || roles.includes('Section')
  const isLicenseRequest = project.projectTypeRequestEnum === 2
  const hasProcesses = (project.electProjectProcessViewModel?.length ?? 0) > 0
  const canSave = project.projectLevelEnum === 0 || isAdminOrSection

  const buildingGroupType = Form.useWatch('buildingGroupTypeEnum', form)
  const isEarthSystem = Form.useWatch('isEarthSystem', form)
  const ertSystemTypeEnum = Form.useWatch('ertSystemTypeEnum', form)
  const isBuildingInspection = Form.useWatch('isBuildingInspection', form)

  const paramOptions = BuildingGroupParams.filter(b => b.group === Number(buildingGroupType ?? 1))

  const onFinish = (values: Record<string, unknown>) => {
    const data = {
      ...baseValues(project),
      ...values,
      id: project.id,
      idSection: +dataAddress.sectionId,
      idCity: +(dataAddress.cityId ?? 0),
      idProvince: +(dataAddress.provinceId ?? 0),
      buildingGroupTypeEnum: Number(values.buildingGroupTypeEnum ?? 1),
      buildingGroupParameterTypeEnum: Number(values.buildingGroupParameterTypeEnum ?? 0),
      ertSystemTypeEnum: Number(values.ertSystemTypeEnum ?? 0),
      foundationElectrodeArea: Number(values.foundationElectrodeArea ?? 0),
      area: Number(values.area ?? 0),
      areaAsBuilt: Number(values.areaAsBuilt ?? 0),
      numberOfFloor: Number(values.numberOfFloor ?? 0),
      childInspectionCount: Number(values.childInspectionCount ?? 0),
      childErtCount: Number(values.childErtCount ?? 0),
    }
    update.mutate(data, { onSuccess: () => setOpen(false) })
  }

  return (
    <>
      <Button type="link" style={{ padding: 0 }} onClick={() => setOpen(true)}>
        #{project.fileNumber}
      </Button>
      <Drawer
        title={`ویرایش پرونده - ${project.fileNumber}`}
        width={620}
        open={open}
        onClose={() => setOpen(false)}
        destroyOnClose
        footer={
          canSave ? (
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setOpen(false)}>انصراف</Button>
              <Button type="primary" loading={update.isPending} onClick={() => form.submit()}>
                ذخیره
              </Button>
            </Space>
          ) : (
            <Text type="secondary">جهت تغییر مشخصات به واحد برق مراجعه نمایید</Text>
          )
        }
      >
        <Space size={16} wrap style={{ marginBottom: 12 }}>
          <Text type="secondary">تاریخ ثبت: {project.solarRegisterDate}</Text>
          <Text type="secondary">ثبت‌کننده: {project.projectCreatedTypeName}</Text>
          <Text type="secondary">نوع درخواست: {project.projectTypeRequestName}</Text>
        </Space>

        <Form form={form} layout="vertical" initialValues={baseValues(project)} onFinish={onFinish}>
          <Form.Item name="hasRelatedPermit" label="وضعیت جواز">
            <Radio.Group>
              <Radio value={true}>دارد</Radio>
              <Radio value={false}>ندارد</Radio>
            </Radio.Group>
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="licenseNumber" label="شماره جواز" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="landlordName" label="نام و نام خانوادگی مالک" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            {project.ownershipTypeEnum === 2 && (
              <Col span={12}>
                <Form.Item name="companyName" label="نام شرکت" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            )}
            <Col span={12}>
              <Form.Item name="landlordNaCode" label="کدملی مالک/شرکت" rules={[{ required: true }]}>
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="landlordPhoneNumber" label="شماره تماس" rules={[{ required: true }]}>
                <Input maxLength={11} />
              </Form.Item>
            </Col>
            {isLicenseRequest && (
              <>
                <Col span={12}>
                  <Form.Item name="supervisorName" label="نام ناظر" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="supervisorPhoneNumber" label="شماره تماس ناظر" rules={[{ required: true }]}>
                    <Input maxLength={11} />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col span={12}>
              <Form.Item name="postalCode" label="کد پستی" rules={[{ required: true }]}>
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="numberOfFloor" label="تعداد طبقه" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          {isAdminOrSection && (
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="buildingGroupTypeEnum" label="گروه ساختمانی">
                  <Select
                    options={BuildingGroupTypes}
                    onChange={() => form.setFieldValue('buildingGroupParameterTypeEnum', 0)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="buildingGroupParameterTypeEnum"
                  label="گروه طبقات"
                  rules={[
                    {
                      validator: (_, v) =>
                        Number(v) > 0
                          ? Promise.resolve()
                          : Promise.reject(new Error('گروه طبقات را انتخاب کنید')),
                    },
                  ]}
                >
                  <Select options={paramOptions.map(o => ({ value: o.value, label: o.label }))} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="area" label="مساحت (مترمربع)" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="areaAsBuilt" label="مساحت ازبیلت (مترمربع)">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Form.Item label="محل خدمت">
            <Locations setDataAddress={setDataAddress} idSection={project.idSection} isAccessCity={false} />
          </Form.Item>
          <Form.Item name="address" label="آدرس" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>

          {isAdminOrSection && (
            <>
              <Divider />
              <Text type="warning">
                توجه: فقط یک‌بار می‌توانید اجرای ارت یا بازرسی ساختمان را تغییر دهید.
              </Text>
              <Space size="large" wrap style={{ display: 'flex', marginTop: 8 }}>
                <Form.Item name="isEarthSystem" valuePropName="checked" noStyle>
                  <Checkbox disabled={isLicenseRequest || hasProcesses}>اجرای ارت</Checkbox>
                </Form.Item>
                <Form.Item name="isBuildingInspection" valuePropName="checked" noStyle>
                  <Checkbox disabled={isLicenseRequest || hasProcesses}>بازرسی ساختمان</Checkbox>
                </Form.Item>
                <Form.Item name="panelNeed" valuePropName="checked" noStyle>
                  <Checkbox disabled={isLicenseRequest}>نیاز به تابلوساز</Checkbox>
                </Form.Item>
              </Space>

              {isEarthSystem && (
                <Row gutter={12} style={{ marginTop: 12 }}>
                  <Col span={12}>
                    <Form.Item name="ertSystemTypeEnum" label="نوع ارت">
                      <Select options={ErtSystemTypes} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="isNeedEb" valuePropName="checked" label=" ">
                      <Checkbox>نیاز به همبندی</Checkbox>
                    </Form.Item>
                  </Col>
                  {Number(ertSystemTypeEnum) === 6 && (
                    <Col span={12}>
                      <Form.Item
                        name="foundationElectrodeArea"
                        label="مساحت فونداسیون الکترود"
                        rules={[{ required: true }]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              )}

              {isBuildingInspection && (
                <Form.Item name="hasSupervision" valuePropName="checked">
                  <Checkbox disabled={isLicenseRequest || hasProcesses}>نیاز به نظارت/ازبیلت</Checkbox>
                </Form.Item>
              )}

              {!project.isTestAndDelivery && (
                <>
                  <Divider />
                  <Text type="danger">
                    دقت کنید: به ازای هر مورد همان تعداد زیر پرونده ایجاد می‌شود و بعداً قابل ویرایش
                    نیست.
                  </Text>
                  <Row gutter={12} style={{ marginTop: 8 }}>
                    <Col span={12}>
                      <Form.Item
                        name="childInspectionCount"
                        label="تعداد زیر پرونده بازرسی"
                        rules={[{ required: true }]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="childErtCount"
                        label="تعداد زیر پرونده ارت"
                        rules={[{ required: true }]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </Form>
      </Drawer>
    </>
  )
}
