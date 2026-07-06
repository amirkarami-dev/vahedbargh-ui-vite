import { useMemo, useState } from 'react'
import {
  App,
  Button,
  Image,
  Modal,
  Select,
  Space,
  Table,
  Upload,
  type TableColumnsType,
} from 'antd'
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { getApiUrlUserFiles } from '@/shared/lib/fileUrls'
import { getEnumByValue, getEnums } from '@/shared/lib/enums'
import { UserFileTypeEnum } from '@/shared/enums/userFileType'
import {
  useAddUserFile,
  useDeleteUserFile,
  useUserFiles,
} from '@/features/userFiles/api/useUserFiles'
import type { UserFile } from '@/features/userFiles/types'

type Props = {
  userId?: string
  fullName: string
}

// Manage an engineer's documents (old-ui user-files.js + GridUserFiles).
// MUI Dialog/FilePond -> antd Modal/Upload. Fetches files when opened.
export function UserFilesDialog({ userId, fullName }: Props) {
  const { message } = App.useApp()
  const [open, setOpen] = useState(false)
  const [fileTypeEnum, setFileTypeEnum] = useState(0)
  const [file, setFile] = useState<File | null>(null)

  const { data, isLoading } = useUserFiles(userId, open)
  const add = useAddUserFile(userId)
  const del = useDeleteUserFile(userId)
  const lst = useMemo(() => data ?? [], [data])

  // File types not yet uploaded (old-ui filtered the select the same way).
  const typeOptions = useMemo(
    () => getEnums(UserFileTypeEnum).filter(e => !lst.some(f => f.fileTypeEnum === e.value)),
    [lst],
  )

  const handleSave = () => {
    if (!file) {
      message.error('برای ذخیره ابتدا فایل را بارگذاری کنید')
      return
    }
    const meta = getEnumByValue(UserFileTypeEnum, fileTypeEnum)
    if (!meta || !userId) return
    const enumName = meta.enum // e.g. "F2"
    const ext = file.name.split('.').pop() ?? ''
    const baseName = file.name.substring(0, file.name.lastIndexOf('.'))

    const fd = new FormData()
    fd.append('file', file, `${enumName}-${baseName}.${ext}`)
    fd.append('name', enumName)
    fd.append('title', meta.label) // old-ui sent the F0 label (bug); use the chosen type label
    fd.append('des', `Upload with-${userId}`)
    fd.append('userFileTypeEnum', enumName)
    fd.append('FolderName', 'UserFiles')
    fd.append('FileName', `${enumName}.${ext}`)
    fd.append('userId', String(userId))
    fd.append('toUserId', String(userId))

    add.mutate(fd, {
      onSuccess: () => {
        setFile(null)
        setFileTypeEnum(0)
      },
    })
  }

  const columns: TableColumnsType<UserFile> = [
    {
      title: 'فایل',
      key: 'file',
      width: 100,
      render: (_, r) => (
        <Image width={72} height={72} src={getApiUrlUserFiles(`${r.folderName}/${r.fileName}`)} />
      ),
    },
    { title: 'نوع فایل', key: 'fileTypeName', dataIndex: 'fileTypeName' },
    {
      title: 'دانلود',
      key: 'download',
      render: (_, r) => (
        <Button
          icon={<DownloadOutlined />}
          href={getApiUrlUserFiles(`${r.folderName}/${r.fileName}`)}
          target="_blank"
        >
          دانلود
        </Button>
      ),
    },
    {
      title: 'حذف',
      key: 'delete',
      render: (_, r) => (
        <Button danger icon={<DeleteOutlined />} loading={del.isPending} onClick={() => del.mutate(r.id)}>
          حذف
        </Button>
      ),
    },
  ]

  return (
    <>
      <Button size="small" block onClick={() => setOpen(true)}>
        فایلها
      </Button>
      <Modal
        title={`مدیریت فایل ها: ${fullName}`}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={760}
        destroyOnClose
      >
        <Table<UserFile>
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
            placeholder="نوع فایل"
            value={fileTypeEnum || undefined}
            onChange={setFileTypeEnum}
            options={typeOptions}
          />
          {fileTypeEnum !== 0 && (
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
          )}
          <Button
            type="primary"
            disabled={fileTypeEnum === 0}
            loading={add.isPending}
            onClick={handleSave}
          >
            ذخیره
          </Button>
        </Space>
      </Modal>
    </>
  )
}
