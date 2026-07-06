import { Card, Spin } from 'antd'

// The Stimulsoft viewer mount point (#viewer). One per page.
export function ReportViewer({ rendering }: { rendering: boolean }) {
  return (
    <Card size="small">
      {rendering && (
        <div style={{ textAlign: 'center', padding: 12 }}>
          <Spin />
        </div>
      )}
      <div id="viewer" style={{ maxWidth: 822, margin: '0 auto' }} />
    </Card>
  )
}
