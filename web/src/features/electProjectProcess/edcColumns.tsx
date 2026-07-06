import { Space, Tag, type TableColumnsType } from 'antd'
import { GetCityWithSection } from '@/shared/geo/cityName'
import { ProjectFilesDialog } from '@/features/electProjects/ProjectFilesDialog'
import { ProjectEditDrawer } from '@/features/electProjects/ProjectEditDrawer'
import { EdcChecklistModal } from '@/features/electProjectProcess/EdcChecklistModal'
import { EdcDefectModal } from '@/features/electProjectProcess/EdcDefectModal'
import type { ElectProject } from '@/features/electProjects/types'

// ElectAdmin EDC-review columns (old-ui ElectProjectProcessEdc/ProjectColumnsAnt.js).
export function edcColumns(): TableColumnsType<ElectProject> {
  return [
    {
      title: 'مالک/آدرس',
      key: 'landlord',
      width: 200,
      render: (_, r) => (
        <Space wrap size={4}>
          <Tag>{r.landlordName}</Tag>
          {r.idSection > 0 && <Tag>{GetCityWithSection(r.idSection)}</Tag>}
        </Space>
      ),
    },
    {
      title: 'شماره تقاضا',
      key: 'request',
      width: 110,
      render: (_, r) => (
        <Tag color={Number(r.electRequestNumber) > 0 ? 'green' : 'red'}>{r.electRequestNumber}</Tag>
      ),
    },
    {
      title: 'فایل‌ها',
      key: 'files',
      width: 90,
      render: (_, r) => (r.parentId ? <span>-</span> : <ProjectFilesDialog project={r} />),
    },
    { title: 'شماره پرونده', key: 'fileNumber', width: 110, render: (_, r) => <ProjectEditDrawer project={r} /> },
    { title: 'چک لیست توزیع', key: 'edcChecklist', width: 120, render: (_, r) => <EdcChecklistModal project={r} /> },
    { title: 'عملیات', key: 'defect', width: 120, render: (_, r) => <EdcDefectModal project={r} /> },
    {
      title: 'فایل',
      key: 'fileFlags',
      width: 100,
      render: (_, r) => (
        <Space size={4}>
          <Tag color={r.isUploadRelatedPermit ? 'green' : 'red'}>جواز</Tag>
          <Tag color={r.isUploadElectPlan ? 'green' : 'red'}>نقشه</Tag>
        </Space>
      ),
    },
    {
      title: 'ت-ثبت/ تخصیص',
      key: 'dates',
      width: 160,
      render: (_, r) => (
        <Space size={4} wrap>
          <Tag>{r.solarRegisterDate}</Tag>
          {r.solarDateDeliverEngineer && <Tag>{r.solarDateDeliverEngineer}</Tag>}
        </Space>
      ),
    },
    {
      title: 'درخواست',
      key: 'reqFlags',
      width: 160,
      render: (_, r) => (
        <Space size={4} wrap>
          <Tag color={r.isEarthSystem ? 'green' : 'red'}>ارت</Tag>
          <Tag color={r.isBuildingInspection ? 'green' : 'red'}>بازرسی</Tag>
          <Tag color={r.isTestAndDelivery ? 'green' : 'red'}>تست-تحویل</Tag>
        </Space>
      ),
    },
    {
      title: 'مرحله/ کارشناس',
      key: 'level',
      width: 180,
      render: (_, r) => (
        <Space size={4} wrap>
          <Tag>{r.projectLevel}</Tag>
          <Tag>{r.engCurrentName || 'ندارد'}</Tag>
        </Space>
      ),
    },
  ]
}
