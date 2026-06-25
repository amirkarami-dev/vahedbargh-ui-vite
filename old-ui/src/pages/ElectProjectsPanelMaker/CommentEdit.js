import React, { useState } from "react"
import {
  Table,
  Button,
  Modal,
} from "antd"
import { CommentColumns } from "./comment-columns"
const CommentEdit = ({ mainRowData, rowData, mainProps }) => {
  const [open, setOpen] = useState(false)

  // Function to handle edit button click


  const columnsWithSum = [
    ...CommentColumns({
      mainProps
        }),
  ]

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        نمایش
      </Button>

      <Modal
        title={"فرم شماره 3"}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={"70%"}
        footer={null}
      >

          <Table
            loading={mainProps.loading}
            size="small"
            pagination={true}
            scroll={{
              y: 670,
              x: 700,
            }}
            sticky
            columns={columnsWithSum}
            rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
            rowKey={record => record.id}
            dataSource={[...rowData].concat(
              (() => {
                let branchingCount = 0
                let ampere = 0
                let power = 0
                let powerSum = 0
                for (let row of rowData) {
                  branchingCount += row["branchingCount"]
                  ampere += row["ampere"]
                  power += row["power"]
                  powerSum += row["powerSum"]

                }
                return {
                  key: "total",
                  name: "Total (by Column)",
                  branchingCount,
                  ampere,
                  power,
                  powerSum
                }
              })()
            )}
          />

      </Modal>
    </>
  )
}
export default CommentEdit
