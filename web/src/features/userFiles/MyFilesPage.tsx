import { useMemo, useState } from 'react'
import {
  Alert,
  App,
  Button,
  Card,
  Col,
  Image,
  Row,
  Select,
  Table,
  Typography,
  Upload,
  type TableColumnsType,
} from 'antd'
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { getApiUrlUserFiles } from '@/shared/lib/fileUrls'
import { getEnumByValue, getEnums } from '@/shared/lib/enums'
import { UserFileTypeEnum } from '@/shared/enums/userFileType'
import { getCurrentUser } from '@/shared/lib/auth'
import {
  useAddUserFile,
  useDeleteUserFile,
  useUserFiles,
} from '@/features/userFiles/api/useUserFiles'
import type { UserFile } from '@/features/userFiles/types'

// Standalone "My files" page (old-ui UserFiles). Same upload/list flow as the
// engineer dialog, scoped to the logged-in user (userId = JWT sid).
export function MyFilesPage() {
  const { message } = App.useApp()
  const userId = getCurrentUser()?.sid as string | undefined
  const [fileTypeEnum, setFileTypeEnum] = useState(0)
  const [file, setFile] = useState<File | null>(null)

  const { data, isLoading } = useUserFiles(userId, true)
  const add = useAddUserFile(userId)
  const del = useDeleteUserFile(userId)
  const lst = useMemo(() => data ?? [], [data])

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
    const enumName = meta.enum
    const ext = file.name.split('.').pop() ?? ''
    const baseName = file.name.substring(0, file.name.lastIndexOf('.'))

    const fd = new FormData()
    fd.append('file', file, `${enumName}-${baseName}.${ext}`)
    fd.append('name', enumName)
    fd.append('title', meta.label)
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
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>فایل‌های من</Typography.Title>

      <Alert
        type="warning"
        showIcon
        style={{ marginBottom: 12 }}
        message="توجه فرمایید بعد از آپلود فایل، جهت آپلود مجدد در قسمت پشتیبانی درخواست دهید."
      />

      <Card size="small" styles={{ body: { padding: 16 } }} style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} align="bottom">
          <Col xs={24} md={8}>
            <Typography.Text type="secondary">نوع فایل</Typography.Text>
            <Select
              style={{ width: '100%' }}
              placeholder="نوع فایل"
              value={fileTypeEnum || undefined}
              onChange={setFileTypeEnum}
              options={typeOptions}
            />
          </Col>
          <Col xs={24} md={10}>
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
          </Col>
          <Col xs={24} md={6}>
            <Button type="primary" block disabled={fileTypeEnum === 0} loading={add.isPending} onClick={handleSave}>
              ذخیره
            </Button>
          </Col>
          <Col xs={24}>
            <Alert type="info" showIcon message="عکس پرسنلی از نوع jpg انتخاب شود." />
          </Col>
        </Row>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<UserFile>
          size="small"
          rowKey="id"
          loading={isLoading}
          columns={columns}
          dataSource={lst}
          pagination={{ pageSize: 8, showSizeChanger: true, pageSizeOptions: [8, 12, 50, 100] }}
        />
      </Card>
    </motion.div>
  )
}
