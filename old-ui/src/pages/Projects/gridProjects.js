import { CityFromSection } from 'hooks/returnCityName'
import React, { useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { Card, CardBody,CardTitle  } from 'reactstrap'
const columns = [
  {
    dataField: "id",
    text: "ID",
    hidden: true,
  },
  {
    dataField: "fileNumber",
    text: "شماره پرونده",
    //formatter: linkRoomFormatter,
    headerStyle: () => {
      return { maxWidth: "10%" }
    },
    // classes: (cell, row, rowIndex, colIndex) => {
    //   if (rowIndex % 2 === 0) return "demo-row-even"
    //   return "demo-row-odd"
    // },
  },
  {
    dataField: "landlordName",
    text: "مالک",
    headerStyle: () => {
      return { maxWidth: "10%" }
    },
  },
  {
    dataField: "inspectionParameterType",
    text: "پارامتر بازرسی",
    headerStyle: () => {
      return { maxWidth: "10%" }
    },
  },
  {
    dataField: "section",
    text: "شهر",
    headerStyle: () => {
      return { maxWidth: "10%" }
    },
    formatter:  (cellContent, row, rowIndex) => {
      let returnValue = '-'
      if (row.idSection > 0) {
        returnValue =CityFromSection(row.idSection)
           
      }
      return returnValue
    
    },
  },
  {
    dataField: "ownershipType",
    text: "مالکیت",
    headerStyle: () => {
      return { maxWidth: "10%" }
    },
  },
  {
    dataField: "BuildingType",
    text: "نوع ساختمان",
    headerStyle: () => {
      return { maxWidth: "10%" }
    },
  },
  {
    dataField: "ProjectLevel",
    text: "مرحله پرونده",
    hidden: true,
    headerStyle: () => {
      return { maxWidth: "10%" }
    },
  },


  {
    dataField: "Edit",
    text: "Edit",
    formatter: (cellContent, row, rowIndex) => {
     // if (userProfile.role === "Administrator")
        return (
          <button
            className="btn-outline-gray"
            onClick={() => handleUpdate(row, rowIndex)}
          >
            <h3 className="mdi mdi-file-edit-outline" />
          </button>
        )
    },
  },
  {
    dataField: "id2",
    text: "Remove",
    editable: false,
    formatter: (cellContent, row) => {
      //if (userProfile.role === "Administrator")
        return (
          <button
            className="btn-outline-gray "
            onClick={() => setDeleteConfirm(row.id)}
          >
            <h3 className="mdi mdi-delete" />
          </button>
        )
    },
  },
]
const GridProjects = props => {
    const{paramsData} = props;
useEffect(()=>{
  console.log('Props in grid', paramsData.lstElectProjects);
},[paramsData])
  return (
    <Card>
    <CardBody>
      <CardTitle className="h4">List Projects </CardTitle>

       {paramsData.lstElectProjects&&
       <BootstrapTable
       wrapperClasses="table-responsive"
       keyField="id"
       data={paramsData.lstElectProjects}
       columns={columns}
     />
       } 
      
    </CardBody>
  </Card>
  )
}

export default GridProjects