import { useMemo } from 'react'
import { Alert, Card, Descriptions, Spin, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { usePublicProjectInfo } from '@/features/public/api/usePublic'

// Public project info (old-ui ElectProjects/EP, route /ep). Looks up by `?e=`.
export function ProjectPublicPage() {
  const [params] = useSearchParams()
  const projectId = params.get('e') ?? ''
  const result = params.get('result')

  const { data, isFetching, error } = usePublicProjectInfo(result ? '' : projectId)

  const returnMessage = useMemo(() => {
    if (!result) return null
    if (result.includes('ok')) return `مبلغ به حساب کیف پول واحد برق واریز گردید - کد رهگیری: ${result.split('-')[1] ?? ''}`
    if (result.includes('error')) return 'واریز انجام نشد'
    return null
  }, [result])

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      {isFetching && <Spin size="large" style={{ width: '100%', marginBottom: 20 }} />}
      {!projectId && !result && <Alert type="error" showIcon message="مشکل در پارامترهای ارسالی" />}
      {error && <Alert type="error" showIcon message={String(error)} />}
      {returnMessage && <Alert type="info" showIcon message={returnMessage} />}

      {!result && data && (
        <Card title="واحد نظارت برق سازمان نظام مهندسی استان کردستان" style={{ marginTop: 20 }}>
          <Alert
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
            message="مالک گرامی، در صورت اطمینان از صحت اطلاعات زیر جهت پیگیری با واحد برق تماس بگیرید."
          />
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="شماره پرونده">{data.fileNumber}</Descriptions.Item>
            <Descriptions.Item label="شماره تقاضا">{data.electRequestNumber}</Descriptions.Item>
            <Descriptions.Item label="نام مالک">{data.landlordName}</Descriptions.Item>
            <Descriptions.Item label="کد ملی مالک">{data.naCode}</Descriptions.Item>
            <Descriptions.Item label="آدرس">{data.address}</Descriptions.Item>
            <Descriptions.Item label="ارتباط با واحد برق">۰۸۷-۳۳۵۶۴۸۷۴-۳۳۵۶۴۸۷۶ داخلی: ۱۲۳</Descriptions.Item>
            <Descriptions.Item label="موبایل پشتیبانی">
              <a href="tel:09372180164">۰۹۳۷۲۱۸۰۱۶۴</a>
            </Descriptions.Item>
          </Descriptions>
          <Typography.Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0 }}>
            بارگذاری مدارک از طریق پنل کاربری انجام می‌شود.
          </Typography.Paragraph>
        </Card>
      )}
    </div>
  )
}
