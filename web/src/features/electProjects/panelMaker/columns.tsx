import type { TableColumnsType } from 'antd'
import { GetCityWithSection } from '@/shared/geo/cityName'
import { ProjectFilesDialog } from '@/features/electProjects/ProjectFilesDialog'
import { PanelSubmitButton } from '@/features/electProjects/panelMaker/PanelSubmitButton'
import { PanelEditModal } from '@/features/electProjects/panelMaker/PanelEditModal'
import { Form3Modal } from '@/features/electProjects/panelMaker/Form3Modal'
import { ChecklistModal } from '@/features/electProjects/panelMaker/ChecklistModal'
import type { ElectProject } from '@/features/electProjects/types'

// Panel-maker list columns (old-ui ElectProjectsPanelMaker/ProjectColumnsAnt.js).
export function panelMakerColumns(): TableColumnsType<ElectProject> {
  return [
    { title: 'تایید', key: 'submitPanel', width: 70, render: (_, r) => <PanelSubmitButton project={r} /> },
    { title: 'شماره پرونده', key: 'fileNumber', width: 110, render: (_, r) => <PanelEditModal project={r} /> },
    { title: 'فایلها', key: 'files', width: 90, render: (_, r) => <ProjectFilesDialog project={r} /> },
    { title: 'فرم شماره3', key: 'form3', width: 90, render: (_, r) => <Form3Modal project={r} /> },
    { title: 'چک لیست', key: 'checklist', width: 90, render: (_, r) => <ChecklistModal project={r} /> },
    { title: 'تاریخ ثبت', dataIndex: 'solarDatePanelRegister', key: 'solarDatePanelRegister', width: 110 },
    { title: 'تاریخ تایید', dataIndex: 'solarDatePanelSubmit', key: 'solarDatePanelSubmit', width: 110 },
    { title: 'شماره سریال تابلو', dataIndex: 'panelSerialNumber', key: 'panelSerialNumber', width: 160 },
    { title: 'مالک', dataIndex: 'landlordName', key: 'landlordName', width: 120 },
    {
      title: 'شهر',
      key: 'section',
      width: 110,
      render: (_, r) => (r.idSection > 0 ? GetCityWithSection(r.idSection) : '-'),
    },
    { title: 'مرحله پرونده', dataIndex: 'projectLevel', key: 'projectLevel', width: 130 },
    { title: 'کارشناس', dataIndex: 'engCurrentName', key: 'engCurrentName', width: 130 },
    { title: 'تاریخ تخصیص', dataIndex: 'solarDateDeliverEngineer', key: 'solarDateDeliverEngineer', width: 120 },
  ]
}
