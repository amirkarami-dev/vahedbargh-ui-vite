import { DeleteOutline, GetAppOutlined } from "@mui/icons-material"
import { Button } from "@mui/material"
import { getApiUrlUserFiles } from "common/global"
import { downloadImage } from "helpers/service_helper"

export const renderFile = (params) => {
    return (
        <img
        height={100}
        width={100}
        src={`${getApiUrlUserFiles(
            params.row.folderName + "/" + params.row.fileName
        )}`}
      />
    )
  }
  export const renderFileDownload = (params) => {
    return (
        <Button             
        startIcon={<GetAppOutlined />}
        href={`${getApiUrlUserFiles(
            params.row.folderName + "/" + params.row.fileName
        )}`}
        variant="contained"
        onClick={(e) => downloadImage(e, params.row.fileName)}
        download
      >
        دانلود
      </Button>
    )
  }
  export const renderDeleteFile = (params,props) => {
    return (
        <Button             
        startIcon={<DeleteOutline />}
        variant="outlined"
        onClick={() => props.onDeleteUserFile(params.row.id)}
        download
      >
        حذف
      </Button>
    )
  }
export const columnsGrid = (props) => [
    {
        field: "fileTypeName",
        headerName: "نوع فایل",
        width: 100
      },
      {
        field: "file",
        headerName: "فایل",
        renderCell: (params)=> renderFile(params),
        width: 200
      },
      {
        field: "download",
        headerName: "دانلود",
        renderCell: (params)=> renderFileDownload(params),
        width: 200

      },
      {
        field: "title",
        headerName: "موضوع فایل",
        width: 200

      },
      // {
      //   field: "delete",
      //   headerName: "حذف",
      //   renderCell: (params)=> renderDeleteFile(params,props)
      // },
]