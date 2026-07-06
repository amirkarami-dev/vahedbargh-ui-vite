import { useState } from 'react'
import { App, Button, Card, Col, Form, Input, InputNumber, Popconfirm, Radio, Row, Typography } from 'antd'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {
  Locations,
  PersianDatePicker,
  type DataAddress,
  type PersianDateValue,
} from '@/shared/components'
import { useUserInfo } from '@/shared/api/useUserInfo'
import { GetSectionIdWithCityId } from '@/shared/geo/cityName'
import { useUpsertElectProject } from '@/features/electProjects/api/useElectProjectActions'

const DEFAULT_LAT = 35.311308
const DEFAULT_LNG = 46.991271

// New project request (old-ui CreateProject, ElectAdmin). Single-step create form.
// The old interactive map is simplified to editable lat/lng inputs.
export function CreateProjectPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const upsert = useUpsertElectProject()
  const { data: userInfo } = useUserInfo()
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const [date, setDate] = useState<PersianDateValue | null>(null)

  const userIdSection = userInfo ? GetSectionIdWithCityId(userInfo.idSection) : undefined
  const canPickCity = userInfo?.idSection === 0

  const submit = () => {
    if (!dataAddress.mainAddress?.trim()) {
      message.error('آدرس کامل را وارد کنید')
      return
    }
    const v = form.getFieldsValue()
    const data = {
      area: 0,
      numberOfFloor: 1,
      requesterTypeEnum: 0,
      projectTypeRequestEnum: 0,
      projectCreatedTypeEnum: 1,
      buildingGroupTypeEnum: 0,
      buildingGroupParameterTypeEnum: 0,
      isEarthSystem: false,
      isErtTest: false,
      isBuildingInspection: false,
      panelNeed: false,
      description: '',
      postalCode: '1234567890',
      landlordNaCode: '1234567890',
      companyName: '',
      landlordName: v.landlordName,
      landlordPhoneNumber: v.landlordPhoneNumber,
      electRequestNumber: v.electRequestNumber,
      hasRelatedPermit: v.hasRelatedPermit === true || v.hasRelatedPermit === 'true',
      address: dataAddress.mainAddress?.trim() ?? '',
      idSection: +dataAddress.sectionId,
      idCity: +(dataAddress.cityId ?? 0),
      idProvince: +(dataAddress.provinceId ?? 0),
      lat: Number(v.lat ?? DEFAULT_LAT),
      lng: Number(v.lng ?? DEFAULT_LNG),
      solarRegisterDate: date?.persian ?? '',
    }
    upsert.mutate(data, { onSuccess: () => navigate('/projects/ElectProjects') })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>درخواست انشعاب برق دائم/موقت</Typography.Title>

      <Card size="small" styles={{ body: { padding: 20 } }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ hasRelatedPermit: true, lat: DEFAULT_LAT, lng: DEFAULT_LNG }}
          onFinish={submit}
        >
          <Form.Item label="محل خدمت و آدرس" required>
            <Locations
              setDataAddress={setDataAddress}
              idSection={userIdSection}
              isAccessCity={canPickCity}
              showAddress
              addressLabel="آدرس کامل"
            />
          </Form.Item>

          <Form.Item name="hasRelatedPermit" label="وضعیت جواز">
            <Radio.Group>
              <Radio value={true}>دارد</Radio>
              <Radio value={false}>ندارد</Radio>
            </Radio.Group>
          </Form.Item>

          <Row gutter={12}>
            <Col xs={24} md={8}>
              <Form.Item
                name="electRequestNumber"
                label="شماره تقاضا"
                rules={[
                  { required: true, message: 'شماره تقاضا را وارد کنید' },
                  { len: 10, message: 'باید ۱۰ رقم باشد' },
                ]}
              >
                <Input dir="ltr" maxLength={10} inputMode="numeric" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="landlordName"
                label="نام کامل مالک"
                rules={[
                  { required: true, message: 'نام مالک را وارد کنید' },
                  { min: 5, message: 'حداقل ۵ نویسه' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="landlordPhoneNumber"
                label="شماره تماس"
                rules={[
                  { required: true, message: 'شماره تماس را وارد کنید' },
                  { len: 11, message: 'باید ۱۱ رقم باشد' },
                ]}
              >
                <Input dir="ltr" maxLength={11} inputMode="numeric" placeholder="09123456789" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col xs={24} md={8}>
              <Form.Item name="lat" label="عرض جغرافیایی">
                <InputNumber dir="ltr" style={{ width: '100%' }} step={0.0001} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="lng" label="طول جغرافیایی">
                <InputNumber dir="ltr" style={{ width: '100%' }} step={0.0001} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="تاریخ ثبت (امروز)">
                <PersianDatePicker setPersianDate={setDate} disable closable={false} />
              </Form.Item>
            </Col>
          </Row>

          <Popconfirm
            title="ثبت پرونده"
            description="پرونده برای ثبت آماده می‌باشد. آیا مطمئن هستید؟"
            okText="بله"
            cancelText="خیر"
            onConfirm={() => form.submit()}
          >
            <Button type="primary" loading={upsert.isPending}>
              ذخیره
            </Button>
          </Popconfirm>
        </Form>
      </Card>
    </motion.div>
  )
}
