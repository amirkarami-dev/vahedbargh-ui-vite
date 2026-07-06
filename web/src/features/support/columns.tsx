import { Badge, Space, Tag, Tooltip, Typography, type TableColumnsType } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { SupportFilesDialog } from '@/features/support/SupportFilesDialog'
import type { SupportTicket } from '@/features/support/types'

// Ported from old-ui Support/columns.js. from/to is hidden for the Engineer role.
export function supportColumns(role: string): TableColumnsType<SupportTicket> {
  const cols: TableColumnsType<SupportTicket> = [
    {
      title: 'وضعیت',
      key: 'closed',
      align: 'center',
      width: 90,
      render: (_, r) => (
        <Space direction="vertical" size={4}>
          <Tag color={r.closed ? 'red' : 'green'}>{r.closed ? 'بسته' : 'باز'}</Tag>
          <Tag color={r.isRead ? 'green' : 'red'}>{r.isRead ? 'خوانده شده' : 'خوانده نشده'}</Tag>
        </Space>
      ),
    },
    {
      title: 'فایل',
      key: 'fileNumber',
      align: 'center',
      width: 120,
      render: (_, r) => (
        <Space direction="vertical" size={4} align="center">
          <SupportFilesDialog supportId={r.id} fileNumber={r.fileNumber} />
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {r.fileNumber || '-'}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'تیکت',
      key: 'ticketNumber',
      width: 120,
      render: (_, r) => {
        const link = (
          <Link to={`/support/${r.id}`} style={{ whiteSpace: 'nowrap' }}>
            <Space size={4}>
              <EyeOutlined /> {r.ticketNumber}
            </Space>
          </Link>
        )
        return (
          <Space direction="vertical" size={2}>
            {Number(r.unreadMessageCount) > 0 ? (
              <Badge count={r.unreadMessageCount} size="small" offset={[6, 0]}>
                {link}
              </Badge>
            ) : (
              link
            )}
            {r.solarCreate && (
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {r.solarCreate}
              </Typography.Text>
            )}
          </Space>
        )
      },
    },
  ]

  if (role !== 'Engineer') {
    cols.push({
      title: 'از طرف / به',
      key: 'fromTo',
      width: 160,
      render: (_, r) => (
        <Space direction="vertical" size={2}>
          <Tooltip title={`از طرف: ${r.name || '-'}`}>
            <Typography.Text style={{ color: '#1677ff' }} ellipsis>
              {r.name || '-'}
            </Typography.Text>
          </Tooltip>
          <Tooltip title={`به: ${r.toName || '-'}`}>
            <Typography.Text style={{ color: '#52c41a' }} ellipsis>
              {r.toName || '-'}
            </Typography.Text>
          </Tooltip>
        </Space>
      ),
    })
  }

  cols.push({
    title: 'موضوع',
    key: 'title',
    width: 300,
    render: (_, r) => (
      <Tooltip title={r.title}>
        <Typography.Text strong={!r.isRead} ellipsis>
          {r.title}
        </Typography.Text>
      </Tooltip>
    ),
  })

  return cols
}
