import { useState } from 'react'
import {
  App,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Steps,
  Typography,
  Upload,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {
  Locations,
  PersianDatePicker,
  type DataAddress,
  type PersianDateValue,
} from '@/shared/components'
import { getCurrentUser } from '@/shared/lib/auth'
import { useUserInfo } from '@/shared/api/useUserInfo'
import { GetSectionIdWithCityId } from '@/shared/geo/cityName'
import { BuildingGroupParams, BuildingGroupTypes, ErtSystemTypes } from '@/shared/enums/buildingGroup'
import {
  useAddProjectFile,
  useUpsertElectProject,
} from '@/features/electProjects/api/useElectProjectActions'

const { Text } = Typography
const DEFAULT_LAT = 35.311308
const DEFAULT_LNG = 46.991271

const initialValues = {
  projectTypeRequestEnum: 0,
  licenseNumber: '',
  numberOfFloor: 1,
  buildingGroupTypeEnum: 1,
  buildingGroupParameterTypeEnum: 1,
  area: undefined,
  areaAsBuilt: 0,
  isEarthSystem: true,
  isBuildingInspection: true,
  panelNeed: true,
  isTestAndDelivery: false,
  ertSystemTypeEnum: 0,
  isNeedEb: false,
  foundationElectrodeArea: 0,
  childInspectionCount: 0,
  childErtCount: 0,
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
}

const STEPS = ['نوع درخواست', 'مشخصات فنی', 'مالک', 'محل و آدرس', 'بارگذاری جواز']

// Full project-registration wizard (old-ui Projects, Admin/Section). The old
// Leaflet map is simplified to lat/lng inputs.
export function ProjectsWizardPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const upsert = useUpsertElectProject()
  const { data: userInfo } = useUserInfo()

  // old-ui: a user bound to a city (idSection !== 0) is locked to it; idSection 0
  // can pick any city. idSection feeds Locations as the city's central section.
  const userIdSection = userInfo ? GetSectionIdWithCityId(userInfo.idSection) : undefined
  const canPickCity = userInfo?.idSection === 0

  const [step, setStep] = useState(0)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const [date, setDate] = useState<PersianDateValue | null>(null)
  const [newId, setNewId] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const addFile = useAddProjectFile(newId)

  const typeRequest = Form.useWatch('projectTypeRequestEnum', form)
  const group = Form.useWatch('buildingGroupTypeEnum', form)
  const isEarthSystem = Form.useWatch('isEarthSystem', form)
  const isBuildingInspection = Form.useWatch('isBuildingInspection', form)
  const isTestAndDelivery = Form.useWatch('isTestAndDelivery', form)
  const ertSystemTypeEnum = Form.useWatch('ertSystemTypeEnum', form)

  const paramOptions = BuildingGroupParams.filter(p => p.group === Number(group ?? 1))

  // Same derived flags old-ui set when the request type changes.
  const onTypeChange = (val: number) => {
    const isTd = val === 2
    form.setFieldsValue({
      isEarthSystem: !isTd,
      panelNeed: !isTd,
      isBuildingInspection: !isTd,
      isTestAndDelivery: isTd,
      ertSystemTypeEnum: 0,
    })
  }

  // Fields to validate per step — conditionally-rendered fields are only included
  // when active, mirroring old-ui handleValidEventSubmitProject's checks.
  const fieldsForStep = (s: number): string[] => {
    switch (s) {
      case 0:
        return ['projectTypeRequestEnum']
      case 1:
        return [
          'licenseNumber',
          'buildingGroupTypeEnum',
          'buildingGroupParameterTypeEnum',
          'numberOfFloor',
          'area',
          ...(isEarthSystem ? ['ertSystemTypeEnum'] : []),
          ...(isEarthSystem && Number(ertSystemTypeEnum) === 6 ? ['foundationElectrodeArea'] : []),
          ...(!isTestAndDelivery ? ['childInspectionCount', 'childErtCount'] : []),
        ]
      case 2:
        return [
          'landlordName',
          'landlordNaCode',
          'landlordPhoneNumber',
          ...(typeRequest === 2 ? ['supervisorName', 'supervisorPhoneNumber'] : []),
        ]
      case 3:
        return ['postalCode', 'lat', 'lng']
      default:
        return []
    }
  }

  const next = async () => {
    try {
      await form.validateFields(fieldsForStep(step))
      setStep(s => s + 1)
    } catch {
      /* validation errors shown inline */
    }
  }

  const create = async () => {
    try {
      await form.validateFields(fieldsForStep(3))
    } catch {
      return
    }
    if (!dataAddress.mainAddress?.trim()) {
      message.error('آدرس کامل را وارد کنید')
      return
    }
    const v = form.getFieldsValue(true)
    const payload = {
      ...v,
      area: Number(v.area ?? 0),
      areaAsBuilt: Number(v.areaAsBuilt ?? 0),
      numberOfFloor: Number(v.numberOfFloor ?? 0),
      buildingGroupTypeEnum: Number(v.buildingGroupTypeEnum ?? 1),
      buildingGroupParameterTypeEnum: Number(v.buildingGroupParameterTypeEnum ?? 0),
      ertSystemTypeEnum: Number(v.ertSystemTypeEnum ?? 0),
      foundationElectrodeArea: Number(v.foundationElectrodeArea ?? 0),
      childInspectionCount: Number(v.childInspectionCount ?? 0),
      childErtCount: Number(v.childErtCount ?? 0),
      projectTypeRequestEnum: Number(v.projectTypeRequestEnum ?? 0),
      requesterTypeEnum: 0,
      projectCreatedTypeEnum: 0,
      description: '',
      companyName: v.companyName ?? '',
      hasSupervision: Number(v.areaAsBuilt ?? 0) > 0,
      address: dataAddress.mainAddress?.trim() ?? '',
      idSection: +dataAddress.sectionId,
      idCity: +(dataAddress.cityId ?? 0),
      idProvince: +(dataAddress.provinceId ?? 0),
      lat: Number(v.lat ?? DEFAULT_LAT),
      lng: Number(v.lng ?? DEFAULT_LNG),
      solarRegisterDate: date?.persian ?? '',
    }
    try {
      const id = (await upsert.mutateAsync(payload)) as string
      setNewId(typeof id === 'string' ? id : String(id ?? ''))
      setStep(4)
    } catch {
      /* error toast shown by the hook */
    }
  }

  const finish = () => {
    if (!file || !newId) {
      navigate('/projects/ElectProjects')
      return
    }
    const user = getCurrentUser()
    const ext = file.name.split('.').pop() ?? ''
    const fd = new FormData()
    fd.append('file', file, `RelatedPermit.${ext}`)
    fd.append('electProjectId', JSON.stringify([newId]))
    fd.append('name', 'elec-RelatedPermit')
    fd.append('des', `Upload with-${user?.sid}`)
    fd.append('fileTypeEnum', '3') // RelatedPermit
    fd.append('FolderName', 'ElectProjects')
    fd.append('FileName', `RelatedPermit.${ext}`)
    fd.append('userId', String(user?.sid ?? ''))
    fd.append('toUserId', String(user?.sid ?? ''))
    addFile.mutate(fd, { onSuccess: () => navigate('/projects/ElectProjects') })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>درخواست انشعاب برق دائم/موقت</Typography.Title>

      <Card size="small" styles={{ body: { padding: 20 } }}>
        <Steps current={step} items={STEPS.map(t => ({ title: t }))} style={{ marginBottom: 24 }} />

        <Form form={form} layout="vertical" initialValues={initialValues}>
          {/* Step 0 — request type */}
          <div style={{ display: step === 0 ? 'block' : 'none' }}>
            <Form.Item name="projectTypeRequestEnum" label="نوع درخواست" rules={[{ required: true }]}>
              <Radio.Group onChange={e => onTypeChange(e.target.value)}>
                <Space direction="vertical">
                  <Radio value={0}>انشعاب دائم/موقت</Radio>
                  <Radio value={1} disabled>
                    فیبر نوری
                  </Radio>
                  <Radio value={2}>تست و تحویل</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Step 1 — technical */}
          <div style={{ display: step === 1 ? 'block' : 'none' }}>
            <Row gutter={12}>
              <Col xs={24} md={6}>
                <Form.Item name="licenseNumber" label="شماره جواز" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item name="buildingGroupTypeEnum" label="گروه ساختمانی">
                  <Select
                    options={BuildingGroupTypes}
                    onChange={() => form.setFieldValue('buildingGroupParameterTypeEnum', 0)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  name="buildingGroupParameterTypeEnum"
                  label="گروه طبقات"
                  rules={[{ validator: (_, v) => (Number(v) > 0 ? Promise.resolve() : Promise.reject(new Error('گروه طبقات را انتخاب کنید'))) }]}
                >
                  <Select options={paramOptions.map(o => ({ value: o.value, label: o.label }))} />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item name="numberOfFloor" label="تعداد طبقات" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} min={1} />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item name="area" label="مساحت (مترمربع)" rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} min={1} />
                </Form.Item>
              </Col>
              {isBuildingInspection && (
                <Col xs={24} md={6}>
                  <Form.Item name="areaAsBuilt" label="مساحت ازبیلت (مترمربع)">
                    <InputNumber style={{ width: '100%' }} min={0} />
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Space size="large" wrap style={{ marginBottom: 12 }}>
              <Form.Item name="isEarthSystem" valuePropName="checked" noStyle>
                <Checkbox disabled={typeRequest === 2}>اجرای سیستم زمین</Checkbox>
              </Form.Item>
              <Form.Item name="isBuildingInspection" valuePropName="checked" noStyle>
                <Checkbox disabled={typeRequest === 2}>بازرسی ساختمان</Checkbox>
              </Form.Item>
              <Form.Item name="panelNeed" valuePropName="checked" noStyle>
                <Checkbox disabled={typeRequest === 2}>نیاز به تابلوساز</Checkbox>
              </Form.Item>
              <Form.Item name="isTestAndDelivery" valuePropName="checked" noStyle>
                <Checkbox disabled>تست و تحویل</Checkbox>
              </Form.Item>
            </Space>

            {isEarthSystem && (
              <Row gutter={12}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="ertSystemTypeEnum"
                    label="نوع ارت"
                    rules={[
                      {
                        validator: (_, v) =>
                          Number(v) > 0
                            ? Promise.resolve()
                            : Promise.reject(new Error('نوع ارت را مشخص کنید')),
                      },
                    ]}
                  >
                    <Select options={ErtSystemTypes} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="isNeedEb" valuePropName="checked" label=" ">
                    <Checkbox>نیاز به همبندی</Checkbox>
                  </Form.Item>
                </Col>
                {Number(ertSystemTypeEnum) === 6 && (
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="foundationElectrodeArea"
                      label="مساحت فونداسیون الکترود"
                      rules={[
                        {
                          validator: (_, v) =>
                            Number(v) > 0
                              ? Promise.resolve()
                              : Promise.reject(new Error('مساحت فونداسیون باید بیشتر از صفر باشد')),
                        },
                      ]}
                    >
                      <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>
                  </Col>
                )}
              </Row>
            )}

            {!isTestAndDelivery && (
              <>
                <Divider />
                <Text type="danger">
                  در پارامترهای زیر دقت کنید؛ به ازای هر مورد همان تعداد زیر پرونده ایجاد می‌شود و بعداً
                  قابل ویرایش نیست.
                </Text>
                <Row gutter={12} style={{ marginTop: 8 }}>
                  <Col xs={24} md={6}>
                    <Form.Item name="childInspectionCount" label="تعداد زیر پرونده بازرسی" rules={[{ required: true }]}>
                      <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item name="childErtCount" label="تعداد زیر پرونده ارت" rules={[{ required: true }]}>
                      <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </div>

          {/* Step 2 — landlord */}
          <div style={{ display: step === 2 ? 'block' : 'none' }}>
            <Row gutter={12}>
              <Col xs={24} md={8}>
                <Form.Item name="landlordName" label="نام کامل مالک" rules={[{ required: true }, { min: 5, message: 'حداقل ۵ نویسه' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="landlordNaCode" label="کدملی مالک/شرکت" rules={[{ required: true }, { len: 10, message: 'باید ۱۰ رقم باشد' }]}>
                  <Input dir="ltr" maxLength={10} inputMode="numeric" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="landlordPhoneNumber" label="شماره تماس" rules={[{ required: true }, { len: 11, message: 'باید ۱۱ رقم باشد' }]}>
                  <Input dir="ltr" maxLength={11} inputMode="numeric" placeholder="09123456789" />
                </Form.Item>
              </Col>
              {typeRequest === 2 && (
                <>
                  <Col xs={24} md={8}>
                    <Form.Item name="supervisorName" label="نام ناظر" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="supervisorPhoneNumber" label="شماره تماس ناظر" rules={[{ required: true }, { len: 11, message: 'باید ۱۱ رقم باشد' }]}>
                      <Input dir="ltr" maxLength={11} inputMode="numeric" />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>
          </div>

          {/* Step 3 — location */}
          <div style={{ display: step === 3 ? 'block' : 'none' }}>
            <Form.Item label="محل خدمت و آدرس" required>
              <Locations
                setDataAddress={setDataAddress}
                idSection={userIdSection}
                isAccessCity={canPickCity}
                showAddress
                addressLabel="آدرس کامل"
              />
            </Form.Item>
            <Row gutter={12}>
              <Col xs={24} md={8}>
                <Form.Item name="postalCode" label="کد پستی" rules={[{ required: true }, { len: 10, message: 'باید ۱۰ رقم باشد' }]}>
                  <Input dir="ltr" maxLength={10} inputMode="numeric" />
                </Form.Item>
              </Col>
              <Col xs={24} md={5}>
                <Form.Item name="lat" label="عرض جغرافیایی">
                  <InputNumber dir="ltr" style={{ width: '100%' }} step={0.0001} />
                </Form.Item>
              </Col>
              <Col xs={24} md={5}>
                <Form.Item name="lng" label="طول جغرافیایی">
                  <InputNumber dir="ltr" style={{ width: '100%' }} step={0.0001} />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item label="تاریخ ثبت (امروز)">
                  <PersianDatePicker setPersianDate={setDate} disable closable={false} />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Step 4 — permit file */}
          <div style={{ display: step === 4 ? 'block' : 'none' }}>
            <Text type="success">پرونده ثبت شد. در صورت تمایل فایل اسکن جواز را بارگذاری کنید.</Text>
            <div style={{ marginTop: 12 }}>
              <Upload
                beforeUpload={f => {
                  setFile(f)
                  return false
                }}
                maxCount={1}
                accept=".png,.jpg,.jpeg,.pdf"
                onRemove={() => setFile(null)}
              >
                <Button icon={<UploadOutlined />}>انتخاب فایل جواز</Button>
              </Upload>
            </div>
          </div>
        </Form>

        <Divider />
        <Space>
          {step > 0 && step < 4 && <Button onClick={() => setStep(s => s - 1)}>مرحله قبل</Button>}
          {step < 3 && (
            <Button type="primary" onClick={next}>
              مرحله بعد
            </Button>
          )}
          {step === 3 && (
            <Button type="primary" loading={upsert.isPending} onClick={create}>
              ثبت پرونده
            </Button>
          )}
          {step === 4 && (
            <Button type="primary" loading={addFile.isPending} onClick={finish}>
              پایان
            </Button>
          )}
        </Space>
      </Card>
    </motion.div>
  )
}
