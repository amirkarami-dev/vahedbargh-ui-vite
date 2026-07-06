import { useState } from 'react'
import { App, Button, Image, Modal, Select, Space, Table, Upload, type TableColumnsType } from 'antd'
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { getApiUrlSupportFiles } from '@/shared/lib/fileUrls'
import { getCurrentUser } from '@/shared/lib/auth'
import { getEnumByValue, getEnums } from '@/shared/lib/enums'
import { FileSupportTypeEnum } from '@/shared/enums/fileSupportType'
import {
  useAddSupportFile,
  useDeleteSupportFile,
  useSupportFiles,
} from '@/features/support/api/useSupport'
import type { SupportFile } from '@/features/support/types'

type Props = { supportId: string; fileNumber?: number | string }

// Files attached to a ticket (old-ui SupportFiles.js). List + upload + delete.
export function SupportFilesDialog({ supportId, fileNumber }: Props) {
  const { message } = App.useApp()
  const [open, setOpen] = useState(false)
  const [fileTypeEnum, setFileTypeEnum] = useState(2)
  const [file, setFile] = useState<File | null>(null)
  const { data: files, isLoading } = useSupportFiles(supportId, open)
  const add = useAddSupportFile(supportId)
  const del = useDeleteSupportFile(supportId)
  const lst = files ?? []

  const handleSave = () => {
    if (!file) {
      message.error('برای ذخیره ابتدا فایل را بارگذاری کنید')
      return
    }
    const meta = getEnumByValue(FileSupportTypeEnum, fileTypeEnum)
    if (!meta) return
    const name = meta.enum
    const ext = file.name.split('.').pop() ?? ''
    const sid = String(getCurrentUser()?.sid ?? '')
    const fd = new FormData()
    fd.append('file', file, `${name}.${ext}`)
    fd.append('supportId', supportId) // raw guid (old-ui JSON.stringify'd it — wrong for binding)
    fd.append('name', `support-${name}`)
    fd.append('des', `Upload with-${sid}`)
    fd.append('fileTypeEnum', name)
    fd.append('FolderName', 'Supports')
    fd.append('FileName', `${name}.${ext}`)
    fd.append('userId', sid)
    fd.append('toUserId', sid)
    add.mutate(fd, { onSuccess: () => setFile(null) })
  }

  const columns: TableColumnsType<SupportFile> = [
    {
      title: 'فایل',
      key: 'file',
      width: 90,
      render: (_, r) => (
        <Image width={64} height={64} src={getApiUrlSupportFiles(`${r.folderName}/${r.fileName}`)} />
      ),
    },
    { title: 'نوع', key: 'type', dataIndex: 'fileTypeName' },
    {
      title: 'دانلود',
      key: 'dl',
      render: (_, r) => (
        <Button
          icon={<DownloadOutlined />}
          href={getApiUrlSupportFiles(`${r.folderName}/${r.fileName}`)}
          target="_blank"
        >
          دانلود
        </Button>
      ),
    },
    {
      title: 'حذف',
      key: 'del',
      render: (_, r) => (
        <Button danger icon={<DeleteOutlined />} loading={del.isPending} onClick={() => del.mutate(r.id)} />
      ),
    },
  ]

  return (
    <>
      <Button size="small" type="primary" onClick={() => setOpen(true)}>
        فایلها
      </Button>
      <Modal
        title={`مدیریت فایل ها: ${fileNumber ?? ''}`}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Table<SupportFile>
          size="small"
          rowKey="id"
          loading={isLoading}
          columns={columns}
          dataSource={lst}
          pagination={false}
        />
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
          <Select
            style={{ width: '100%' }}
            value={fileTypeEnum}
            onChange={setFileTypeEnum}
            options={getEnums(FileSupportTypeEnum)}
            placeholder="نوع فایل"
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
          <Button type="primary" loading={add.isPending} onClick={handleSave}>
            ذخیره
          </Button>
        </Space>
      </Modal>
    </>
  )
}
