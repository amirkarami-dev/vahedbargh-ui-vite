import { Spin } from 'antd'

// Shown while a lazily-loaded route chunk is downloading.
export function PageFallback() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
      <Spin size="large" />
    </div>
  )
}
