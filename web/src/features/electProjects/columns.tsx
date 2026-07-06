import { Space, Tag, type TableColumnsType } from 'antd'
import { NumberOutlined } from '@ant-design/icons'
import { GetCityWithSection } from '@/shared/geo/cityName'
import { ProjectFilesDialog } from '@/features/electProjects/ProjectFilesDialog'
import { ProjectEditDrawer } from '@/features/electProjects/ProjectEditDrawer'
import { ProjectElectEditModal } from '@/features/electProjects/ProjectElectEditModal'
import { ProjectProcessButton } from '@/features/electProjects/ProjectProcessButton'
import { PanelMakerButton } from '@/features/electProjects/PanelMakerButton'
import { StopProjectButton } from '@/features/electProjects/StopProjectButton'
import {
  AmountSmsTag,
  DeleteProjectButton,
  DocsSmsButton,
  SubmitToElectButton,
} from '@/features/electProjects/actions'
import type { ElectProject } from '@/features/electProjects/types'

// Ported from old-ui ProjectColumnsAnt.js (display + actions; role-gated like the
// original). Role variants (Edc / Eng / Section / PanelMaker) are separate screens.
export function electProjectColumns(roles: string[]): TableColumnsType<ElectProject> {
  const adminOrSection = roles.includes('Administrator') || roles.includes('Section')
  const isElectAdmin = roles.includes('ElectAdmin')
  const cols: TableColumnsType<ElectProject> = []

  if (adminOrSection || isElectAdmin) {
    cols.push({
      title: 'حذف پرونده',
      key: 'delete',
      width: 100,
      render: (_, row) =>
        row.parentElectProject ? (
          <span>p:{row.parentElectProject.fileNumber}</span>
        ) : (
          <DeleteProjectButton project={row} />
        ),
    })
  }

  cols.push({
    title: 'مالک/ آدرس/ ایجادکننده/وضعیت',
    key: 'landlord',
    width: 240,
    render: (_, row) => (
      <Space wrap size={4}>
        <Tag>{row.landlordName}</Tag>
        {row.idSection > 0 && <Tag>{GetCityWithSection(row.idSection)}</Tag>}
        <Tag>{row.projectCreatedTypeName}</Tag>
        <Tag>{row.electProjectStatusName}</Tag>
      </Space>
    ),
  })

  if (adminOrSection) {
    cols.push({
      title: 'شماره پرونده/بالانس/ت-ثبت',
      key: 'fileNumber',
      width: 240,
      render: (_, row) => (
        <Space wrap size={4}>
          <ProjectEditDrawer project={row} />
          <AmountSmsTag project={row} />
          <Tag>{row.solarRegisterDate}</Tag>
          {Number(row.projectBalance) < 0 && row.projectBalanceLinkForPay && (
            <Tag color="green">
              <a href={row.projectBalanceLinkForPay} target="_blank" rel="noreferrer">
                پرداخت مستقیم
              </a>
            </Tag>
          )}
        </Space>
      ),
    })
  } else if (isElectAdmin) {
    cols.push({
      title: 'شماره پرونده/ت-ثبت',
      key: 'fileNumber',
      width: 160,
      render: (_, row) => (
        <Space wrap size={4}>
          <Tag>{row.fileNumber}</Tag>
          <Tag>{row.solarRegisterDate}</Tag>
        </Space>
      ),
    })
  }

  cols.push({
    title: 'فایلها',
    key: 'files',
    width: 160,
    render: (_, row) => (
      <Space wrap size={4}>
        <ProjectFilesDialog project={row} />
        {adminOrSection && <DocsSmsButton project={row} />}
      </Space>
    ),
  })

  if (adminOrSection) {
    cols.push({
      title: 'ارسال پرونده/شماره تقاضا',
      key: 'submit',
      width: 200,
      render: (_, row) => (
        <Space wrap size={4}>
          <SubmitToElectButton project={row} />
          <Tag
            style={{ cursor: 'pointer' }}
            icon={<NumberOutlined />}
            onClick={() => navigator.clipboard.writeText(String(row.electRequestNumber ?? ''))}
          >
            {row.electRequestNumber}
          </Tag>
        </Space>
      ),
    })
  } else if (isElectAdmin) {
    cols.push({
      title: 'شماره تقاضا/وضعیت',
      key: 'request',
      width: 200,
      render: (_, row) => (
        <Space wrap size={4}>
          <ProjectElectEditModal project={row} />
          <Tag>{row.electProjectStatusName}</Tag>
        </Space>
      ),
    })
  } else {
    cols.push({
      title: 'شماره تقاضا',
      key: 'request',
      width: 140,
      render: (_, row) => (
        <Tag
          style={{ cursor: 'pointer' }}
          icon={<NumberOutlined />}
          onClick={() => navigator.clipboard.writeText(String(row.electRequestNumber ?? ''))}
        >
          {row.electRequestNumber}
        </Tag>
      ),
    })
  }

  if (adminOrSection) {
    cols.push({
      title: 'تخصیص/ تابلوساز',
      key: 'process',
      width: 170,
      render: (_, row) => (
        <Space size={4} wrap>
          <ProjectProcessButton project={row} />
          <PanelMakerButton project={row} />
        </Space>
      ),
    })
    cols.push({
      title: 'توقف',
      key: 'stop',
      width: 100,
      render: (_, row) => (row.parentId ? null : <StopProjectButton project={row} />),
    })
  }

  cols.push(
    {
      title: 'فایل',
      key: 'fileFlags',
      width: 110,
      render: (_, row) => (
        <Space size={4}>
          <Tag color={row.isUploadRelatedPermit ? 'green' : 'red'}>جواز</Tag>
          <Tag color={row.isUploadElectPlan ? 'green' : 'red'}>نقشه</Tag>
        </Space>
      ),
    },
    {
      title: 'درخواست',
      key: 'reqFlags',
      width: 170,
      render: (_, row) => (
        <Space size={4} wrap>
          <Tag color={row.isEarthSystem ? 'green' : 'red'}>ارت</Tag>
          <Tag color={row.isBuildingInspection ? 'green' : 'red'}>بازرسی</Tag>
          <Tag color={row.isTestAndDelivery ? 'green' : 'red'}>تست-تحویل</Tag>
        </Space>
      ),
    },
    {
      title: 'مرحله/ کارشناس/ ت-تخصیص',
      key: 'level',
      width: 240,
      render: (_, row) => (
        <Space size={4} wrap>
          <Tag>{row.projectLevel}</Tag>
          <Tag>{row.engCurrentName || 'ندارد'}</Tag>
          {row.solarDateDeliverEngineer && <Tag>{row.solarDateDeliverEngineer}</Tag>}
        </Space>
      ),
    },
    {
      title: 'همبندی/مساحت EB',
      key: 'eb',
      width: 140,
      render: (_, row) => (
        <Space size={4} wrap>
          <Tag color={row.isNeedEb ? 'green' : 'red'}>{row.isNeedEb ? 'دارد' : 'ندارد'}</Tag>
          <Tag>{row.foundationElectrodeArea}</Tag>
        </Space>
      ),
    },
  )

  return cols
}
