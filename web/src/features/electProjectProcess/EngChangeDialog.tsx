import { useState } from 'react'
import { Button, Form, Modal, Select, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getEngineers } from '@/features/engineers/api/engineersApi'
import { useEppEngChange } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { EppRow } from '@/features/electProjectProcess/types'

// old-ui ListEngineerDialog — reassign an EPP to another engineer.
export function EngChangeDialog({ row }: { row: EppRow }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const change = useEppEngChange()
  const { data, isFetching } = useQuery({
    queryKey: ['engineersAll'],
    queryFn: getEngineers,
    enabled: open,
  })

  const onOpen = () => {
    if (row.engineer?.id) form.setFieldsValue({ idEngineer: row.engineer.id })
    setOpen(true)
  }

  const onFinish = (values: { idEngineer: number | string }) => {
    change.mutate({ id: row.id, idEngineer: values.idEngineer }, { onSuccess: () => setOpen(false) })
  }

  return (
    <>
      <Button size="small" type={row.engineer?.id ? 'dashed' : 'primary'} onClick={onOpen}>
        تغییر کارشناس
      </Button>
      <Modal
        title={`انتخاب کارشناس: ${row.fileNumber}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="ذخیره"
        cancelText="انصراف"
        confirmLoading={change.isPending}
        width={620}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="idEngineer" label="کارشناس" rules={[{ required: true, message: 'کارشناس را انتخاب کنید' }]}>
            <Select
              showSearch
              loading={isFetching}
              optionFilterProp="label"
              options={(data ?? []).map(e => ({ value: e.id, label: e.fullName }))}
            />
          </Form.Item>
          {row.engineer?.fullName && (
            <Typography.Text type="secondary">کارشناس فعلی: {row.engineer.fullName}</Typography.Text>
          )}
        </Form>
      </Modal>
    </>
  )
}
