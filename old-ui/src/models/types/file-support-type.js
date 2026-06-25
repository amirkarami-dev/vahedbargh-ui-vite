"use strict"

/**
 * @enum FileSupportType
 */
let FileSupportType
;(function (fileSupportType) {
  fileSupportType.ForAnnouncement = 20
  fileSupportType[20] = "ForAnnouncement"
  fileSupportType.Notice = 22
  fileSupportType[22] = "Notice"
  fileSupportType.ForUpperCapacity = 24
  fileSupportType[24] = "ForUpperCapacity"
  fileSupportType.Other = 21
  fileSupportType[21] = "Other"
  fileSupportType.IdCard = 1
  fileSupportType[1] = "IdCard"
  fileSupportType.ElectPlan = 2
  fileSupportType[2] = "ElectPlan"
  fileSupportType.RelatedPermit = 3
  fileSupportType[3] = "RelatedPermit"
  fileSupportType.ErtMap = 4
  fileSupportType[4] = "ErtMap"
  fileSupportType.CheckListBoard = 5
  fileSupportType[5] = "CheckListBoard"

  fileSupportType.Crooky = 6
  fileSupportType[6] = "Crooky"

  fileSupportType.ElectNetwork = 7
  fileSupportType[7] = "ElectNetwork"

  fileSupportType.TestAndDelivery = 8
  fileSupportType[8] = "TestAndDelivery"

  fileSupportType.CrookyOfElectrode = 14
  fileSupportType[14] = "CrookyOfElectrode"

  fileSupportType.SupervisorApproveForm = 15
  fileSupportType[15] = "SupervisorApproveForm"

  fileSupportType.ExpertDocument = 16
  fileSupportType[16] = "ExpertDocument"

  fileSupportType.ErtDocument = 17
  fileSupportType[17] = "ErtDocument"

  fileSupportType.TestAndDeliveryDocument = 18
  fileSupportType[18] = "TestAndDeliveryDocument"

  fileSupportType.SupervisionDocument = 19
  fileSupportType[19] = "SupervisionDocument"

  fileSupportType.AzbuiltMap = 23
  fileSupportType[23] = "AzbuiltMap"



})(FileSupportType || (FileSupportType = {}))

export { FileSupportType }
