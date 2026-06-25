import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
const encode = str => Buffer.from(str, "binary").toString("base64")

import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Media,
  Button,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import Breadcrumb from "../../components/Common/Breadcrumb"
import {
  deleteChannel,
  getChannels,
  getUSERs,
  insertChannel,
  resetChannelFlag,
  updateChannel,
  updateChannelAuction,
} from "../../store/actions"
import { filterItems } from "helpers/api_helper"

// ---------------------------Auctions ----------------------
const Auctions = props => {
  const { lstUSERs, lstChannels, userState } = props
  const [userProfile, setUserProfile] = useState({ ...userState })
  const [lstUSER, setLstUSER] = useState()
  if(lstChannels){
      console.log("channel",lstChannels);
      //setLstChannel({ ...lstChannels })
  }
  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "linkRoom",
      text: "Link Auction",
      formatter: linkRoomFormatter,
      headerStyle: () => {
        return { maxWidth: "10%" }
      },
      // classes: (cell, row, rowIndex, colIndex) => {
      //   if (rowIndex % 2 === 0) return "demo-row-even"
      //   return "demo-row-odd"
      // },
    },
    {
      dataField: "title",
      text: "Title",
      headerStyle: () => {
        return { maxWidth: "10%" }
      },
    },
    {
      dataField: "status",
      text: "status",
      headerStyle: () => {
        return { maxWidth: "10%" }
      },
    },
    {
      dataField: "sessionDuration",
      text: "Duration",
      headerStyle: () => {
        return { maxWidth: "10%" }
      },
    },
    {
        dataField: "winnerName",
        text: "Winner",
        formatter:getWinnerName,
        headerStyle: () => {
          return { maxWidth: "10%" }
        },
      },
  ]

  //#region  --------------------------- Function ----------------------

  function getWinnerName (cell,row,rowIndex)
  {
   // setLstUSER(lstUSERs)
      const findWinner = filterItems(lstUSERs,"id",row.winner)
      console.log("findWinner",lstUSER);
      return (
          <>
          <dic>
              {findWinner[0]&&findWinner[0].nickName}
          </dic>
          </>
      )
  }

//#endregion
  //#region --------------------------- useEffect ----------------------

  useEffect(() => {
    const { onGetChannels, onGetUSERs } = props
    onGetUSERs()
    onGetChannels()
    
  }, [])
  useEffect(() => {
    setUserProfile({ ...userState })
    
  }, [userState])
  useEffect(() => {
    setLstUSER({...lstUSERs})
    
  }, [lstUSERs])
  //#endregion

 

  // ---------------------------Auctions Dom ----------------------
  //#region Dom

  return(
    <React.Fragment>
    <div className="page-content">
      <MetaTags>
        <title>Auction | electUnit </title>
      </MetaTags>
      <Container fluid>
        {/* Render Breadcrumb */}
        <Breadcrumb title="electUnit" breadcrumbItem="Join Auction" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">List Auction </CardTitle>

                {userProfile.name && (
                  <BootstrapTable
                    wrapperClasses="table-responsive"
                    keyField="id"
                    data={lstChannels.filter(x=>x.channelType ===1)}
                    columns={columns}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
  )

  //#endregion
}

//#region -------------------------Data & Saga------------------
Auctions.propTypes = {
    lstChannels: PropTypes.any,
    lstUSERs: PropTypes.any,
    onGetChannels: PropTypes.func,
    onGetUSERs: PropTypes.func,
    onInsertChannel: PropTypes.func,

    onUpdateChannel: PropTypes.func,
  
    onDeleteChannel: PropTypes.func,
    onResetChannelFlag: PropTypes.func,
    error: PropTypes.any,
    success: PropTypes.any,
    userState: PropTypes.any
  }
const mapStateToProps = ({ channels, USERs, Login }) => ({
  lstChannels: channels.lstChannels,
  lstUSERs: USERs.lstUSERs,
  error: channels.error,
  success: channels.success,
  userState: Login.userState,
})
const mapDispatchToProps = dispatch => ({
  onGetChannels: () => dispatch(getChannels()),
  onGetUSERs: () => dispatch(getUSERs()),
  onDeleteChannel: channel => dispatch(deleteChannel(channel)),
  onUpdateChannel: channel => dispatch(updateChannel(channel)),
  onInsertChannel: channel => dispatch(insertChannel(channel)),
  onResetChannelFlag: () => dispatch(resetChannelFlag()),
})

//#endregion
export default connect(mapStateToProps, mapDispatchToProps)(Auctions)
