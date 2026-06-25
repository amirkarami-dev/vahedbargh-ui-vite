import { Card, Typography } from 'antd'
import ReactECharts from 'echarts-for-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

// Placeholder dashboard — proves antd + ECharts + motion all work together.
export function Dashboard() {
  const { t } = useTranslation()

  const option = {
    tooltip: {},
    grid: { left: 40, right: 16, top: 24, bottom: 32 },
    xAxis: {
      type: 'category',
      data: ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'],
    },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [12, 19, 8, 15, 22, 10], itemStyle: { color: '#004943' } }],
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={3}>{t('menu.dashboard')}</Typography.Title>
      <Card>
        <ReactECharts option={option} style={{ height: 320 }} />
      </Card>
    </motion.div>
  )
}
