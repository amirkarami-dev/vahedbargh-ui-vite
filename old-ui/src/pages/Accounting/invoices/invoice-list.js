import React, { useState, useEffect, useRef, useReducer } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Box, LinearProgress } from "@mui/material"
import Container from "@mui/material/Container"
import { DataGrid, GridToolbar, faIR } from "@mui/x-data-grid"
import { getInvoices } from "store/actions"
import { columnsGrid } from "./columns"
const InvoiceList = props => {
  const { lstInvoices, translate, loading } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [pageSize, setPageSize] = React.useState(8)
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }, [errorMessage])
  useEffect(() => {
    setErrorMessage("فاکتور ها با موفقیت به روز شدند")
  }, [])
  useEffect(() => {
    props.onGetInvoices()
  }, [])
  return (
      <Box
        sx={{
          backgroundColor: "#fff",
          margin: 2,
          paddingInline: 2,
          borderRadius: 2,
          "& .even": {
            backgroundColor: "#D6FFFF",
          }
        }}
      >
        <DataGrid
          autoHeight={true}
          rows={lstInvoices}
          components={{ Toolbar: GridToolbar, LoadingOverlay: LinearProgress }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          getRowHeight={() => {
            return "auto"
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          columns={columnsGrid(translate)}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowsPerPageOptions={[8, 12, 50, 100]}
          pagination
          loading={loading}
          getRowClassName={params =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>
  )
}

InvoiceList.propTypes = {
  lstInvoices: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any,
  loading: PropTypes.any,
  onGetInvoices: PropTypes.func,
}

const mapStateToProps = ({ Accounting }) => ({
  lstInvoices: Accounting.lstInvoices,
  error: Accounting.error,
  success: Accounting.success,
  loading: Accounting.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetInvoices: () => dispatch(getInvoices()),
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList)
