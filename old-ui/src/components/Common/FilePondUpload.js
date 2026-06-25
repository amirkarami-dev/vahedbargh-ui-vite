import React, { useRef, useState } from "react"
import { FilePond, registerPlugin } from "react-filepond"
import "filepond/dist/filepond.min.css"
import { Button } from "@mui/material"
import servicesIcon1 from "../../assets/images/logo.png"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginFileMetadata from "filepond-plugin-file-metadata"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginFileMetadata,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
)

const FilePondUpload = props => {
  let pondUpload = useRef(null)
  const { setFiles,
    //setFileSignature,
    maxFileSize,
    allowMultiple,
    acceptedFileTypes,
    imagePreviewMaxHeight,
    maxFiles,
    labelText,
    waterMark
  } = props

  function prepareFile(file, output) {
   // setFiles(output)
   
   // console.log("output", output)
  }
  function updateFiles(data) {
    console.log("updateFiles", data)
    setFiles(data)
  }
  const metaData = {
    markup: [
      [
        "rect",
        {
          left: 0,
          right: 0,
          bottom: 0,
          height: "60px",
          backgroundColor: "rgba(0,0,0,.5)",
        },
      ],
      [
        "image",
        {
          right: "0px",
          bottom: "0px",
          width: "128px",
          height: "134px",
          src: servicesIcon1,
          fit: "contain",
        },
      ],
    ],
  }
  return (
    <div>
      <FilePond
        labelFileTypeNotAllowed="نوع فایل باید عکس یا pdf باشد"
        acceptedFileTypes={acceptedFileTypes}
        labelIdle={` ${labelText} یا:<span class="filepond--label-action"> انتخاب فایل </span>`}
        maxFileSize={maxFileSize}
        labelMaxFileSizeExceeded="حجم فایل باید کمتر از 2.5 مگابایت باشد"
        imagePreviewMaxHeight={imagePreviewMaxHeight}
        allowFileMetadata={waterMark}
        fileMetadataObject={metaData}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        onupdatefiles={updateFiles}
        onpreparefile={prepareFile}
      />
    </div>
  )
}

export default FilePondUpload
