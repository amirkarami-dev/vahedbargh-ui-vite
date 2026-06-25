"use strict"

/**
 * @enum FileElectProjectType
 */
let FileElectProjectType
;(function (fileElectProjectType) {
  fileElectProjectType.None = 0
  fileElectProjectType[0] = "None"
  fileElectProjectType.IdCard = 1
  fileElectProjectType[1] = "IdCard"
  fileElectProjectType.ElectPlan = 2
  fileElectProjectType[2] = "ElectPlan"
  fileElectProjectType.RelatedPermit = 3
  fileElectProjectType[3] = "RelatedPermit"
  fileElectProjectType.ErtMap = 4
  fileElectProjectType[4] = "ErtMap"
  fileElectProjectType.CheckListBoard = 5
  fileElectProjectType[5] = "CheckListBoard"

  fileElectProjectType.Crooky = 6
  fileElectProjectType[6] = "Crooky"

  fileElectProjectType.ElectNetwork = 7
  fileElectProjectType[7] = "ElectNetwork"

  fileElectProjectType.TestAndDelivery = 8
  fileElectProjectType[8] = "TestAndDelivery"

  fileElectProjectType.CrookyOfElectrode = 14
  fileElectProjectType[14] = "CrookyOfElectrode"

  fileElectProjectType.SupervisorApproveForm = 15
  fileElectProjectType[15] = "SupervisorApproveForm"

  fileElectProjectType.ExpertDocument = 16
  fileElectProjectType[16] = "ExpertDocument"

  fileElectProjectType.ErtDocument = 17
  fileElectProjectType[17] = "ErtDocument"

  fileElectProjectType.TestAndDeliveryDocument = 18
  fileElectProjectType[18] = "TestAndDeliveryDocument"

  fileElectProjectType.SupervisionDocument = 19
  fileElectProjectType[19] = "SupervisionDocument"

  fileElectProjectType.AzbuiltMap = 23
  fileElectProjectType[23] = "AzbuiltMap"

})(FileElectProjectType || (FileElectProjectType = {}))

export { FileElectProjectType }
