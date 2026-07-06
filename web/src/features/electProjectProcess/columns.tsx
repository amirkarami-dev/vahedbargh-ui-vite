import { Space, Tag, Typography, type TableColumnsType } from 'antd'
import { ProjectFilesDialog } from '@/features/electProjects/ProjectFilesDialog'
import { AcceptButton } from '@/features/electProjectProcess/AcceptButton'
import { EppApproveModal } from '@/features/electProjectProcess/EppApproveModal'
import { DefectModal } from '@/features/electProjectProcess/DefectModal'
import { CommentEditModal } from '@/features/electProjectProcess/CommentEditModal'
import { ChecklistEditModal } from '@/features/electProjectProcess/ChecklistEditModal'
import { ErtFormModal } from '@/features/electProjectProcess/ErtFormModal'
import { ProjectDetailsModal } from '@/features/electProjectProcess/ProjectDetailsModal'
import { EdcChecklistModal } from '@/features/electProjectProcess/EdcChecklistModal'
import type { ElectProject } from '@/features/electProjects/types'
import type { EppRow } from '@/features/electProjectProcess/types'

function stageColor(name?: string) {
  if (!name) return 'default'
  if (name.includes('نقص')) return 'volcano'
  if (name.includes('تایید')) return 'green'
  return 'blue'
}

const rial = (n?: number) => `${Math.abs(Math.round(Number(n ?? 0)))}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Minimal ElectProject shape the files dialog needs (id + level + fileNumber).
const asProject = (row: EppRow): ElectProject =>
  ({ id: row.electProjectId, fileNumber: row.fileNumber, projectLevelEnum: row.projectLevel } as ElectProject)

// Engineer-process list columns (old-ui ElectProjectProcessEng/ProjectColumnsAnt.js).
// Form#3 / checklist / ERT editors are a follow-up increment.
export function eppColumns(page: number, pageSize: number): TableColumnsType<EppRow> {
  return [
    { title: '#', key: 'index', width: 50, render: (_, __, i) => (page - 1) * pageSize + i + 1 },
    { title: 'قبول پرونده', key: 'accept', width: 130, render: (_, r) => <AcceptButton row={r} /> },
    { title: 'شماره پرونده', key: 'fileNumber', width: 120, render: (_, r) => <ProjectDetailsModal row={r} /> },
    {
      title: 'مرحله',
      key: 'stage',
      width: 110,
      render: (_, r) => <Tag color={stageColor(r.projectLevelName)}>{r.projectLevelName || '-'}</Tag>,
    },
    {
      title: 'نقص/رفع نقص',
      key: 'defect',
      width: 200,
      render: (_, r) => (
        <Space wrap size={4}>
          <DefectModal row={r} />
          <Tag color={r.electProject?.isDefectEng ? 'error' : 'default'}>نقص</Tag>
          <Tag color={r.electProject?.solvedDefectEng ? 'success' : 'default'}>رفع نقص</Tag>
        </Space>
      ),
    },
    {
      title: 'فرم شماره3',
      key: 'form3',
      width: 100,
      render: (_, r) =>
        r.projectLevel === 1 ? <CommentEditModal row={r} /> : <Typography.Text type="secondary">لازم ندارد</Typography.Text>,
    },
    {
      title: 'چک لیست',
      key: 'checklist',
      width: 100,
      render: (_, r) =>
        r.projectLevel === 1 ? <ChecklistEditModal row={r} /> : <Typography.Text type="secondary">لازم ندارد</Typography.Text>,
    },
    {
      title: 'شناسنامه ارت',
      key: 'ert',
      width: 100,
      render: (_, r) =>
        r.projectLevel === 2 ? <ErtFormModal row={r} /> : <Typography.Text type="secondary">لازم ندارد</Typography.Text>,
    },
    {
      title: 'گزارش توزیع',
      key: 'edcReport',
      width: 110,
      render: (_, r) => (
        <EdcChecklistModal
          project={{ id: r.id, landlordName: r.landLordName, checkListEdcs: r.checkListEdcs } as ElectProject}
        />
      ),
    },
    { title: 'فایلها', key: 'files', width: 90, render: (_, r) => <ProjectFilesDialog project={asProject(r)} /> },
    { title: 'اعلام نظر', key: 'approve', width: 110, render: (_, r) => <EppApproveModal row={r} /> },
    {
      title: 'بالانس پرونده',
      key: 'balance',
      width: 150,
      render: (_, r) =>
        Number(r.projectBalance ?? 0) >= 0 ? (
          <Tag color="green">0</Tag>
        ) : (
          <Space wrap size={4}>
            {r.projectBalanceLinkForPay && (
              <Tag color="green">
                <a href={r.projectBalanceLinkForPay} target="_blank" rel="noreferrer">
                  پرداخت مستقیم
                </a>
              </Tag>
            )}
            <Tag color="red">{rial(r.projectBalance)}</Tag>
          </Space>
        ),
    },
    {
      title: 'وضعیت',
      key: 'status',
      width: 100,
      render: (_, r) => (
        <Tag color={r.inspectionStatus === 1 ? 'success' : 'error'}>{r.inspectionStatusName}</Tag>
      ),
    },
    { title: 'مالک', key: 'owner', width: 120, dataIndex: 'landLordName' },
    { title: 'تاریخ تخصیص', key: 'deliver', width: 120, dataIndex: 'solarDateDeliverEngineer' },
    { title: 'طبقه', key: 'floor', width: 70, dataIndex: 'numberOfFloor' },
    { title: 'تاریخ تایید', key: 'office', width: 120, dataIndex: 'solarDateDeliverOffice' },
  ]
}
