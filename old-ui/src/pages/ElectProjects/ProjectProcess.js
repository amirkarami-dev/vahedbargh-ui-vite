import React, { useState } from "react";
import { Button, Modal, Table, Card, Typography } from "antd";

export const ProjectProcess = ({ rowData, mainProps }) => {
  const [open, setOpen] = useState(false);

  // Define table columns
  const columns = [
    {
      title: "توضیحات کارشناس",
      dataIndex: "description",
      key: "description",
      align: "center",
      render: (_, record) => (
        <Button onClick={() => alert(record.description || "نوشته نشده")}>
          نظر کارشناس
        </Button>
      ),
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "engName",
      key: "engName",
      align: "center",
    },
    {
      title: "شماره موبایل",
      dataIndex: "cellPhone",
      key: "cellPhone",
      align: "center",
    },
    {
      title: "تاریخ تخصیص",
      dataIndex: "solarDateDeliverEngineer",
      key: "solarDateDeliverEngineer",
      align: "center",
    },
    {
      title: "تاریخ انجام",
      dataIndex: "solarDateDeliverOffice",
      key: "solarDateDeliverOffice",
      align: "center",
    },
    {
      title: "مرحله پرونده",
      dataIndex: "projectLevelName",
      key: "projectLevelName",
      align: "center",
    },
    {
      title: "وضعیت",
      dataIndex: "inspectionStatusName",
      key: "inspectionStatusName",
      align: "center",
    },
    {
      title: "نقص دارد",
      dataIndex: "defect",
      key: "defect",
      align: "center",
      render: (defect) => (defect ? "بله" : "خیر"),
    },
  ];

  return (
    <div>
      {/* Button to open the modal */}
      <Button
        type="primary"
        size="small"
        onClick={() => setOpen(true)}
        disabled={rowData.electProjectProcessViewModel.length === 0}
      >
        کارشناس
      </Button>

      {/* Modal for displaying the table */}
      <Modal
        title={`تخصیص مربوط به پرونده: ${rowData.fileNumber}`}
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        footer={null}
      >
        <Typography.Paragraph>لیست تخصیص ها</Typography.Paragraph>
        <Card>
          <Table
            dataSource={rowData.electProjectProcessViewModel}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </Modal>
    </div>
  );
};