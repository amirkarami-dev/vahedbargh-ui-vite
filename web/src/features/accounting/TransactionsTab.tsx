import { useMemo, useState } from 'react'
import {
  App,
  Button,
  Checkbox,
  Col,
  Divider,
  Empty,
  Input,
  Radio,
  Row,
  Table,
} from 'antd'
import { FileExcelOutlined, SearchOutlined } from '@ant-design/icons'
import {
  Locations,
  PersianDatePicker,
  type DataAddress,
  type PersianDateValue,
} from '@/shared/components'
import { CityFromSection } from '@/shared/geo/cityName'
import { useTransactions } from '@/features/accounting/api/useAccounting'
import { getTransactions } from '@/features/accounting/api/accountingApi'
import { transactionColumns } from '@/features/accounting/transactionColumns'
import type { Transaction, TransactionFilter } from '@/features/accounting/types'

const baseFilter: TransactionFilter = {
  transactionStatusEnum: 0,
  page: 1,
  pageSize: 10,
  idCity: 0,
  fileNumber: 0,
  solarCreated: '',
}

// Transactions list (old-ui Accounting/transactions/transaction-list.js) with Excel export.
export function TransactionsTab() {
  const { message } = App.useApp()
  const [status, setStatus] = useState(0)
  const [date, setDate] = useState<PersianDateValue | null>(null)
  const [filterCity, setFilterCity] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const [fileNumber, setFileNumber] = useState('')
  const [applied, setApplied] = useState<TransactionFilter>(baseFilter)
  const [exporting, setExporting] = useState(false)

  const { data, isFetching } = useTransactions(applied)
  const rows = data?.data ?? []
  const total = data?.totalItems ?? 0

  const buildFilter = (page: number, pageSize: number): TransactionFilter => ({
    transactionStatusEnum: status,
    page,
    pageSize,
    idCity: filterCity ? Number(dataAddress.cityId ?? 0) : 0,
    fileNumber: fileNumber ? Number(fileNumber) : 0,
    solarCreated: date?.persian ?? '',
  })

  const onSearch = () => setApplied(buildFilter(1, applied.pageSize))

  const onExcel = async () => {
    setExporting(true)
    try {
      const XLSX = await import('xlsx') // load the heavy lib only on export
      const all = await getTransactions(buildFilter(1, total || 1000))
      const out = all.data.map((x, i) => ({
        ردیف: i + 1,
        'نوع تراکنش': x.gatewayTypeName,
        شهر: CityFromSection(x.idSection ?? 0),
        تاریخ: x.solarCreated?.substring(0, 10),
        مبلغ: x.amount,
        'نوع پرداختی': x.transactionStatusName,
        'مربوط به پرونده': x.fileNumber,
        توضیحات: x.des,
      }))
      const ws = XLSX.utils.json_to_sheet(out)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'تراکنش‌ها')
      XLSX.writeFile(wb, 'transactions.xlsx')
    } catch (e) {
      message.error(String(e))
    } finally {
      setExporting(false)
    }
  }

  const columns = useMemo(
    () => transactionColumns(applied.page, applied.pageSize),
    [applied.page, applied.pageSize],
  )

  return (
    <div>
      <Row gutter={[12, 12]} align="middle">
        <Col>
          <Radio.Group value={status} onChange={e => setStatus(e.target.value)}>
            <Radio value={0}>واریز</Radio>
            <Radio value={1}>برداشت</Radio>
            <Radio value={2}>واریز+برداشت</Radio>
          </Radio.Group>
        </Col>
        <Col>
          <PersianDatePicker setDefault={false} setPersianDate={setDate} />
        </Col>
        <Col>
          <Checkbox checked={filterCity} onChange={e => setFilterCity(e.target.checked)}>
            فیلتر شهر
          </Checkbox>
        </Col>
        {filterCity && (
          <Col xs={24} lg={10}>
            <Locations setDataAddress={setDataAddress} isAccessCity />
          </Col>
        )}
        <Col>
          <Input
            style={{ width: 150 }}
            inputMode="numeric"
            value={fileNumber}
            onChange={e => setFileNumber(e.target.value)}
            placeholder="شماره پرونده"
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
            جستجو
          </Button>
        </Col>
        <Col>
          <Button icon={<FileExcelOutlined />} loading={exporting} onClick={onExcel}>
            خروجی اکسل
          </Button>
        </Col>
      </Row>
      <Divider />
      <Table<Transaction>
        size="small"
        rowKey="id"
        loading={isFetching}
        columns={columns}
        dataSource={rows}
        scroll={{ x: 800 }}
        locale={{ emptyText: <Empty /> }}
        pagination={{
          current: applied.page,
          pageSize: applied.pageSize,
          total,
          showSizeChanger: true,
          showTotal: t => `تعداد کل: ${t}`,
          onChange: (page, pageSize) => setApplied(prev => ({ ...prev, page, pageSize })),
        }}
      />
    </div>
  )
}
