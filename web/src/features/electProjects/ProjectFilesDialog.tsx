import { useMemo, useState } from 'react'
import { App, Button, Image, Modal, Select, Space, Table, Upload, type TableColumnsType } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getApiUrlElectProjectFiles } from '@/shared/lib/fileUrls'
import {
  fileElectProjectTypes,
  fileTypeByValue,
  fileTypeLabelByName,
} from '@/shared/enums/fileElectProjectType'
import { getCurrentUser, getRoles } from '@/shared/lib/auth'
import {
  useAddProjectFile,
  useProjectFiles,
} from '@/features/electProjects/api/useElectProjectActions'
import type { ElectProject, ProjectFile } from '@/features/electProjects/types'

// Project documents (old-ui ProjectFiles.js + GridFilesAnt). View/download + upload.
export function ProjectFilesDialog({ project }: { project: ElectProject }) {
  const { message } = App.useApp()
  const [open, setOpen] = useState(false)
  const [fileTypeEnum, setFileTypeEnum] = useState(2)
  const [file, setFile] = useState<File | null>(null)

  const { data, isLoading } = useProjectFiles(project.id, open)
  const add = useAddProjectFile(project.id)
  const lst = useMemo(() => data ?? [], [data])

  const roles = getRoles()
  const isAdminOrSection = roles.includes('Administrator') || roles.includes('Section')
  const canUpload = project.projectLevelEnum !== 2 || isAdminOrSection

  const handleSave = () => {
    if (!file) {
      message.error('برای ذخیره ابتدا فایل را بارگذاری کنید')
      return
    }
    const meta = fileTypeByValue(fileTypeEnum)
    const user = getCurrentUser()
    if (!meta || !user?.sid) return
    const name = meta.name
    const ext = file.name.split('.').pop() ?? ''
    const sid = String(user.sid)

    const fd = new FormData()
    fd.append('file', file, `${name}.${ext}`)
    fd.append('electProjectId', JSON.stringify([project.id]))
    fd.append('name', `electUnit-${name}`)
    fd.append('des', `Upload with-${sid}`)
    fd.append('fileTypeEnum', name)
    fd.append('FolderName', 'ElectProjects')
    fd.append('FileName', `${name}.${ext}`)
    fd.append('userId', sid)
    fd.append('toUserId', sid)

    add.mutate(fd, { onSuccess: () => setFile(null) })
  }

  const columns: TableColumnsType<ProjectFile> = [
    {
      title: 'فایل',
      key: 'file',
      width: 110,
      render: (_, r) =>
        r.fileName?.toLowerCase().endsWith('.pdf') ? (
          <a
            href={getApiUrlElectProjectFiles(`${r.folderName}/${r.fileName}`)}
            target="_blank"
            rel="noreferrer"
          >
            PDF
          </a>
        ) : (
          <Image
            width={72}
            height={72}
            src={getApiUrlElectProjectFiles(`${r.folderName}/${r.fileName}`)}
          />
        ),
    },
    { title: 'نوع فایل', key: 'type', render: (_, r) => fileTypeLabelByName(r.fileTypeName ?? '') },
    {
      title: 'دانلود',
      key: 'dl',
      render: (_, r) => (
        <a
          href={getApiUrlElectProjectFiles(`${r.folderName}/${r.fileName}`)}
          target="_blank"
          rel="noreferrer"
          download
        >
          دانلود
        </a>
      ),
    },
  ]

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        فایلها
      </Button>
      <Modal
        title={`مدیریت فایل های پرونده: ${project.fileNumber}`}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={720}
        destroyOnClose
      >
        <Table<ProjectFile>
          size="small"
          rowKey="id"
          loading={isLoading}
          columns={columns}
          dataSource={lst}
          pagination={false}
        />
        {canUpload && (
          <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
            <Select
              style={{ width: '100%' }}
              value={fileTypeEnum}
              onChange={setFileTypeEnum}
              options={fileElectProjectTypes.map(t => ({ value: t.value, label: t.label }))}
            />
            <Upload
              beforeUpload={f => {
                setFile(f)
                return false
              }}
              maxCount={1}
              accept=".png,.jpg,.jpeg,.pdf"
              onRemove={() => setFile(null)}
            >
              <Button icon={<UploadOutlined />}>انتخاب فایل</Button>
            </Upload>
            <Button type="primary" disabled={!isAdminOrSection} loading={add.isPending} onClick={handleSave}>
              ذخیره
            </Button>
          </Space>
        )}
      </Modal>
    </>
  )
}
