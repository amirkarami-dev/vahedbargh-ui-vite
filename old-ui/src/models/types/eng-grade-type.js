'use strict'
/**
 * @enum EngineerGradeType
 */
let EngineerGradeType;
(function (engineerGradeType) {
  engineerGradeType.None = 0
  engineerGradeType[0] = 'None'
  engineerGradeType.SeniorDegree = 1
  engineerGradeType[1] = 'SeniorDegree'
  engineerGradeType.FirstBase = 2
  engineerGradeType[2] = 'FirstBase'  
  engineerGradeType.SecondBase = 3
  engineerGradeType[3] = 'SecondBase'
  engineerGradeType.ThirdBase = 4
  engineerGradeType[4] = 'ThirdBase'

})(EngineerGradeType || (EngineerGradeType = {}))

export { EngineerGradeType }
